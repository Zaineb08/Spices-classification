"""
Flask application for Moroccan Spice Classification
Deploys the best EfficientNet-B3 model as a web service
"""

import torch
import torch.nn as nn
from PIL import Image
import numpy as np
from pathlib import Path
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from datetime import datetime

# Try to import EfficientNet
try:
    from efficientnet_pytorch import EfficientNet
except ImportError:
    import subprocess
    subprocess.check_call(['pip', 'install', 'efficientnet_pytorch'])
    from efficientnet_pytorch import EfficientNet

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Class names
CLASS_NAMES = ['anis', 'cannelle', 'carvi', 'clou_girofle', 'cubebe', 'cumin', 
               'curcuma', 'gingembre', 'paprika', 'poivre noir', 'safran']

# Load model
def load_model():
    """Load the trained EfficientNet-B3 model"""
    model = EfficientNet.from_pretrained('efficientnet-b3', num_classes=11)
    model = model.to(device)
    
    # Load weights
    model_path = Path('models/model_efficientnet_best.pth')
    if model_path.exists():
        checkpoint = torch.load(model_path, map_location=device)
        model.load_state_dict(checkpoint['model_state_dict'])
        print(f"✅ Model loaded from {model_path}")
    else:
        print(f"⚠️  Model file not found at {model_path}")
    
    model.eval()
    return model

# Load model on startup
try:
    model = load_model()
    model_loaded = True
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model_loaded = False

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocess image for model input"""
    from torchvision import transforms
    
    transform = transforms.Compose([
        transforms.Resize((300, 300)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    image = Image.open(image_path).convert('RGB')
    return transform(image).unsqueeze(0).to(device)

def predict(image_path):
    """Predict spice class from image"""
    if not model_loaded:
        return None, "Model not loaded", None
    
    try:
        # Preprocess image
        image_tensor = preprocess_image(image_path)
        
        # Predict
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
        
        predicted_class = CLASS_NAMES[predicted_idx.item()]
        confidence_score = confidence.item() * 100
        
        # Get top 3 predictions
        top_3_probs, top_3_indices = torch.topk(probabilities[0], 3)
        top_3 = [
            {
                'class': CLASS_NAMES[idx.item()],
                'probability': prob.item() * 100
            }
            for prob, idx in zip(top_3_probs, top_3_indices)
        ]
        
        return predicted_class, confidence_score, top_3
    
    except Exception as e:
        return None, f"Prediction error: {str(e)}", None

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html', 
                         device=device, 
                         model_loaded=model_loaded,
                         classes=CLASS_NAMES)

@app.route('/predict', methods=['POST'])
def predict_api():
    """API endpoint for prediction"""
    if not model_loaded:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        }), 500
    
    # Check if image is in request
    if 'image' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No image provided'
        }), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({
            'success': False,
            'error': 'No selected file'
        }), 400
    
    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'error': 'File type not allowed. Use: jpg, jpeg, png, gif'
        }), 400
    
    try:
        # Save file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], timestamp + filename)
        file.save(filepath)
        
        # Predict
        predicted_class, confidence, top_3 = predict(filepath)
        
        if predicted_class is None:
            return jsonify({
                'success': False,
                'error': confidence
            }), 500
        
        return jsonify({
            'success': True,
            'predicted_class': predicted_class,
            'confidence': round(confidence, 2),
            'top_3_predictions': top_3,
            'image_path': filepath
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_loaded,
        'device': str(device),
        'classes': CLASS_NAMES
    }), 200

@app.route('/favicon.ico')
def favicon():
    """Return favicon"""
    return '', 204

@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error"""
    return jsonify({
        'success': False,
        'error': 'File too large. Maximum size is 10MB'
    }), 413

@app.errorhandler(404)
def not_found(error):
    """Handle 404 error"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def server_error(error):
    """Handle 500 error"""
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    print(f"\n{'='*60}")
    print("🌶️  Moroccan Spice Classification - Web Application")
    print(f"{'='*60}")
    print(f"🖥️  Device: {device}")
    print(f"✅ Model Loaded: {model_loaded}")
    print(f"📁 Upload Folder: {os.path.abspath(UPLOAD_FOLDER)}")
    print(f"{'='*60}\n")
    
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug, host='0.0.0.0', port=port)
