# Classification des Épices Marocaines

Ce projet vise à classifier des images de 11 épices marocaines différentes à l'aide de modèles de deep learning. Les modèles sont entraînés sur un jeu de données personnalisé d'images d'épices.

## Structure du Projet

```
spices-5-2/
├── src/
│   └── ...
├── dataset/
│   ├── splits/
│   │   ├── train/
│   │   ├── test/
│   │   └── val/
├── eda_results/
│   ├── images/
│   └── *.json, *.csv
├── models/
│   ├── *.pth
│   └── *.json
├── notebooks/
│   ├── 01_EDA_Epices_Marocaines oum.ipynb
│   ├── 02_model_cnn_custom.ipynb
│   ├── 03_model_resnet.ipynb
│   ├── 04_model_efficientnet.ipynb
│   ├── mobilenetv3_training.ipynb
│   └── 05_model_comparison.ipynb
├── scripts/
│   ├── balance_dataset.py
│   └── preprocess_phone_images.py
└── requirements.txt
```

- **dataset/splits/**: Contient les ensembles d'images d'entraînement, de validation et de test, organisés par classe d'épice.
- **eda_results/**: Stocke les résultats de l'Analyse Exploratoire des Données (EDA), y compris les graphiques et les statistiques.
- **models/**: Poids des modèles sauvegardés (`.pth`) et métriques de performance (`.json`).
- **notebooks/**: Notebooks Jupyter pour les différentes étapes du projet.
- **scripts/**: Scripts Python pour le prétraitement et l'équilibrage des données.
- **src/**: Application web frontend (React + TypeScript + Vite, composants UI, i18n, intégration avec l'API Flask).
- **requirements.txt**: Une liste des paquets Python requis pour exécuter ce projet.

## Jeu de Données

Le jeu de données est constitué d'images de 11 types d'épices marocaines :

- anis
- cannelle
- carvi
- clou_girofle
- cubebe
- cumin
- curcuma
- gingembre
- paprika
- poivre noir
- safran

Les données sont réparties en ensembles `train`, `val`, et `test`.

## Installation

1.  **Clonez le dépôt :**

    ```bash
    git clone <https://github.com/Zaineb08/Spices-classification.git>
    ```

2.  **Créez un environnement virtuel (recommandé) :**

    ```bash
    python -m venv venv
    source venv/bin/activate  # Sous Windows, utilisez `venv\Scripts\activate`
    ```

3.  **Installez les dépendances :**
    ```bash
    pip install -r requirements.txt
    ```

## 🚀 Quick Start - Comment Démarrer l'Application

L'application web dispose d'un **backend Flask** (port 5000) et d'un **frontend React** (port 5173). Vous devez démarrer les deux serveurs.

### Backend (Flask - Modèle ML)

**Terminal 1:**

```bash
conda activate spices    # Ou votre environnement Python
python app.py
```

L'API sera accessible à: `http://localhost:5000`

### Frontend (React - Interface Web)

**Terminal 2:**

```bash
cd src
npm install              # (première fois seulement)
npm run dev
```

L'interface sera accessible à: `http://localhost:5173`

### Utilisation Complète

1. Ouvrez `http://localhost:5173` dans votre navigateur
2. Téléchargez une image d'épice
3. Attendez la classification
4. Consultez les résultats avec les confiances (top 3)

### Arrêt des Serveurs

- Appuyez sur `Ctrl + C` dans chaque terminal

---

## Utilisation

Le projet est organisé en plusieurs notebooks Jupyter. Il est recommandé de les exécuter dans l'ordre suivant :

### 1. Analyse Exploratoire des Données (EDA)

- **Notebook**: [notebooks/01_EDA_Epices_Marocaines.ipynb](notebooks/01_EDA_Epices_Marocaines.ipynb)
- **Description**: Ce notebook effectue une analyse détaillée du jeu de données, en explorant la distribution des classes, les profils de couleur et les propriétés des images. Les résultats sont sauvegardés dans le répertoire `eda_results`.

### 2. Entraînement des Modèles

Vous pouvez entraîner quatre modèles différents :

#### a. CNN Personnalisé

- **Notebook**: [notebooks/02_model_cnn_custom.ipynb](notebooks/02_model_cnn_custom.ipynb)
- **Description**: Entraîne un réseau de neurones convolutif simple à partir de zéro.

#### b. ResNet-50 (Apprentissage par Transfert)

- **Notebook**: [notebooks/03_model_resnet.ipynb](notebooks/03_model_resnet.ipynb)
- **Description**: Utilise un modèle ResNet-50 pré-entraîné et l'affine sur le jeu de données d'épices.

#### c. EfficientNet-B3 (Apprentissage par Transfert)

- **Notebook**: [notebooks/04_model_efficientnet.ipynb](notebooks/04_model_efficientnet.ipynb)
- **Description**: Utilise un modèle EfficientNet-B3 pré-entraîné, qui offre un bon équilibre entre performance et coût de calcul.

#### d. MobileNetV3-Large (Apprentissage par Transfert)

- **Notebook**: [notebooks/mobilenetv3_training.ipynb](notebooks/mobilenetv3_training.ipynb)
- **Description**: Modèle léger et rapide, destiné aux environnements à ressources limitées (CPU/mobile).

### 3. Comparaison des Modèles

- **Notebook**: [notebooks/05_model_comparison.ipynb](notebooks/05_model_comparison.ipynb)
- **Description**: Ce notebook compare les performances des trois modèles entraînés en se basant sur leur précision sur l'ensemble de test et d'autres métriques.

## Résultats

La performance de chaque modèle est sauvegardée dans le répertoire `models` dans un fichier `.json` correspondant. Le notebook de comparaison fournit un résumé des résultats.

D'après l'analyse, **EfficientNet-B3** a obtenu les meilleures performances sur l'ensemble de test.

| Modèle            | Précision Validation | Précision Test | Paramètres |
| :---------------- | :------------------: | :------------: | :--------: |
| ResNet-50         |        98.48%        |     97.58%     |   24.56M   |
| EfficientNet-B3   |        98.79%        |     98.79%     |   10.71M   |
| MobileNetV3-Large |        94.85%        |     94.24%     |   4.22M    |

### Détails des Modèles

#### ResNet-50 (Apprentissage par Transfert)

- **Précision de validation**: 98.48%
- **Précision sur l'ensemble test**: 97.58%
- **Paramètres totaux**: 24,562,763
- **Paramètres entraînables**: 16,019,467
- **Approche**: Transfer learning avec deux phases - entraînement du classifier seul, puis fine-tuning des dernières couches.

#### EfficientNet-B3 (Apprentissage par Transfert)

- **Précision de validation**: 98.79%
- **Précision sur l'ensemble test**: 98.79%
- **Paramètres totaux**: 10,713,139
- **Approche**: Transfer learning avec EfficientNet-B3 pré-entraîné, optimisé avec AdamW et planificateur CosineAnnealingLR.

#### MobileNetV3-Large (Apprentissage par Transfert)

- **Approche**: Transfer learning avec MobileNetV3-Large, conçu pour un usage léger et rapide (CPU/mobile).
- **Précision de validation**: 94.85%
- **Précision sur l'ensemble test**: 94.24%
- **Paramètres totaux**: 4,216,123 (~4.22M)
- **Approche**: Transfer learning avec MobileNetV3-Large, conçu pour un usage léger et rapide (CPU/mobile).

### Analyse Comparative

**EfficientNet-B3** surpasse **ResNet-50** en termes de:

- ✅ Précision sur l'ensemble test (98.79% vs 97.58%)
- ✅ Efficacité du modèle (10.71M vs 24.56M paramètres)
- ✅ Cohérence entre validation et test (0% de décalage vs 0.9%)

## Scripts

- `scripts/preprocess_phone_images.py`: Contient des fonctions pour traiter et augmenter les images capturées par téléphone.
- `scripts/balance_dataset.py`: Un script pour équilibrer le jeu de données si nécessaire.

## 🌐 Déploiement - Application Web

### Aperçu

L'application web basée sur Flask permet de classifier des images d'épices via une interface web intuitive. Le meilleur modèle (EfficientNet-B3) a été déployé comme service web.

### Démarrage Rapide

#### Installation locale

1. Installez les dépendances:

```bash
pip install -r requirements_web.txt
```

2. Lancez l'application:

```bash
python app.py
```

3. Accédez à l'application: `http://localhost:5000`

### Fonctionnalités de l'Application

- 📸 **Téléchargement d'images** : Glissez-déposez ou sélectionnez des images
- 🤖 **Prédictions en temps réel** : Classification instantanée des épices
- 📊 **Scores de confiance** : Affiche la confiance et les top 3 prédictions
- 🎨 **Interface responsive** : Fonctionne sur desktop, tablette et mobile
- 📡 **API REST** : Endpoints pour l'intégration tierce

### Structure de l'Application Web

```
app.py                    # Application Flask
templates/
  └── index.html         # Interface utilisateur
static/
  ├── style.css          # Styles
  └── script.js          # Logique client
requirements.txt     # Dépendances Python
```

### API Endpoints

#### POST /predict

Fait une prédiction sur une image

**Requête:**

```bash
curl -X POST -F "image=@image.jpg" http://localhost:5000/predict
```

**Réponse:**

```json
{
  "success": true,
  "predicted_class": "safran",
  "confidence": 98.79,
  "top_3_predictions": [
    { "class": "safran", "probability": 98.79 },
    { "class": "paprika", "probability": 1.15 },
    { "class": "cumin", "probability": 0.06 }
  ]
}
```

#### GET /health

Vérifie l'état de l'application

**Réponse:**

```json
{
    "status": "healthy",
    "model_loaded": true,
    "device": "cuda",
    "classes": ["anis", "cannelle", ...]
}
```

## Pistes d'Amélioration

- Expérimenter avec d'autres modèles pré-entraînés.
- Collecter plus de données pour améliorer la généralisation du modèle.
- Implémenter le caching des résultats de prédiction.
- Explorer des techniques d'augmentation de données avancées.
