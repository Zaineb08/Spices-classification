# Rapport sur les notebooks de modèles (CNN Custom, MobileNetV3, ResNet-50, EfficientNet-B3)

Ce document résume et explique le contenu des principaux notebooks de modèles utilisés dans le projet de classification d'épices marocaines :

1. `02_model_cnn_custom.ipynb`
2. `mobilenetv3_training.ipynb`
3. `03_model_resnet.ipynb`
4. `04_model_efficientnet.ipynb`

Pour chaque notebook, on décrit : l'objectif, la préparation des données, l'architecture, la stratégie d'entraînement, les résultats et les points à retenir.

---

## 1. Notebook MobileNetV3 — `mobilenetv3_training.ipynb`

### 1.1 Objectif du notebook

Ce notebook entraîne un modèle **MobileNetV3-Large** sur le dataset des 11 épices marocaines. L'idée est de tester un modèle **très léger et rapide**, adapté aux appareils contraints (CPU, mobile) tout en conservant une bonne précision.

### 1.2 Préparation des données

- Utilisation des dossiers `dataset/splits/train`, `dataset/splits/val`, `dataset/splits/test`.
- 11 classes d'épices, ~200 images par classe (2 200 images au total), avec un split 70/15/15.
- Transformations appliquées :
  - redimensionnement des images en **224×224** pixels ;
  - conversion en tenseurs ;
  - **normalisation** avec les moyennes / écarts-types calculés sur le dataset (ou ceux d'ImageNet selon la version du notebook) ;
  - augmentations de données sur `train` (rotations légères, flips, variations de couleur) pour la robustesse.

Le notebook définit une classe `SpiceDataset` qui lit les images à partir de la structure de dossiers et applique les transformations correspondantes.

### 1.3 Architecture MobileNetV3-Large

- Modèle : `torchvision.models.mobilenet_v3_large`, initialisé avec des **poids ImageNet**.
- La dernière couche linéaire est remplacée par une couche avec **11 neurones** (une par épice).
- MobileNetV3-Large est composé de :
  - **convolutions depthwise separable** (très légères) ;
  - **blocs MBConv (inverted residuals)** ;
  - **Squeeze-and-Excitation** optimisés.

L'objectif de cette architecture est de **réduire le nombre de paramètres** et de FLOPs tout en gardant des représentations expressives.

### 1.4 Stratégie d'entraînement

- Optimiseur : **Adam**.
- Perte : `CrossEntropyLoss`.
- Scheduler : **ReduceLROnPlateau** (diminue le learning rate lorsque la validation stagne).
- Dispositif : GPU si disponible, sinon CPU.

Le notebook utilise une logique de **fine-tuning** :

- au début, le **backbone est gelé** (`freeze_backbone = True`) ;
- seules les dernières couches (tête de classification) sont entraînées ;
- ensuite, certaines couches peuvent être dégelées pour affiner davantage.

Chaque époque effectue :

- une boucle d'entraînement sur `train_loader` (calcul de la loss et de l'accuracy) ;
- une évaluation sur `val_loader` ;
- mise à jour du scheduler ;
- suivi de la meilleure accuracy de validation et sauvegarde des meilleurs poids.

Un mécanisme d'**early stopping** est utilisé pour arrêter l'entraînement si la validation ne s'améliore plus après un certain nombre d'époques.

### 1.5 Résultats et métriques

Le notebook calcule notamment :

- **accuracy d'entraînement, de validation et de test** ;
- **rapport de classification** (précision, rappel, F1-score par classe) ;
- **matrice de confusion** ;
- un tableau récapitulatif des performances par classe (meilleures et pires classes) ;
- le **nombre total de paramètres** et le **nombre de paramètres entraînables**.

Les principaux résultats obtenus pour MobileNetV3-Large sont :

- **Meilleure validation accuracy** : **95,15 %** ;
- **Test accuracy** : **94,85 %** (sur 330 images de test) ;
- **F1-score moyen (macro)** sur le test : **0,9424** ;
- **Nombre total de paramètres** : **4 216 123** (tous entraînables dans la configuration actuelle).

Au niveau par classe (exemples à partir du rapport de classification) :

- Meilleures classes (F1-score) :
  - `carvi` : **1,0000** ;
  - `cubebe` : **0,9836** ;
  - `gingembre` : **0,9831**.
- Classes les plus difficiles :
  - `poivre noir` : **F1 ≈ 0,8814** ;
  - `cumin` : **F1 ≈ 0,8852** ;
  - `curcuma` : **F1 ≈ 0,9000**.

Les résultats montrent que MobileNetV3 atteint une **bonne précision globale (~94 %)**, mais légèrement inférieure à EfficientNet-B3 et ResNet-50. En revanche, il est **nettement plus rapide par époque** grâce à son architecture légère.

#### 1.5.1 Visuels principaux (MobileNetV3)

Les figures suivantes sont générées par le notebook et stockées dans le dossier `mobilenet_results` :

- Courbes d'entraînement (loss et accuracy) :

  ![Courbes d'entraînement MobileNetV3](mobilenet_results/training_curves.png)

- Matrice de confusion sur le jeu de test :

  ![Matrice de confusion MobileNetV3](mobilenet_results/confusion_matrix.png)

- F1-score par classe :

  ![F1-score par classe MobileNetV3](mobilenet_results/per_class_metrics.png)

### 1.6 Pourquoi MobileNetV3 est plus rapide

Dans ce projet, MobileNetV3 est plus rapide que ResNet-50 et EfficientNet-B3 pour plusieurs raisons :

- **Moins de paramètres** (~4,2 M contre 10,7 M pour EfficientNet-B3 et 24,6 M pour ResNet-50) ;
- **Convolutions depthwise separable** et blocs MBConv qui réduisent fortement le nombre de FLOPs ;
- **Taille d'entrée plus petite** (224×224 vs 300×300 pour EfficientNet-B3) → moins de pixels à traiter ;
- **Backbone gelé au début**, donc moins de poids mis à jour au début de l'entraînement.

En résumé, MobileNetV3 est un excellent compromis **vitesse / légèreté**, même si ce n'est pas le modèle le plus précis du projet.

---

## 2. Notebook ResNet-50 — `03_model_resnet.ipynb`

### 2.1 Objectif du notebook

Ce notebook entraîne un modèle **ResNet-50** sur le même dataset d'épices, dans une approche de **transfer learning classique**. L'objectif est de disposer d'un modèle de référence puissant et bien connu pour comparer ensuite MobileNetV3 et EfficientNet-B3.

### 2.2 Préparation des données

La préparation suit la même logique que pour les autres modèles :

- lecture des images depuis `dataset/splits/train`, `val`, `test` ;
- 11 classes équilibrées, ~200 images par classe ;
- transformations typiques pour ResNet :
  - redimensionnement / recadrage (par ex. 224×224 ou proche) ;
  - conversion en tenseurs ;
  - **normalisation ImageNet** (`mean = [0.485, 0.456, 0.406]`, `std = [0.229, 0.224, 0.225]`) ;
  - augmentations sur le train (rotations, flips, jitter de couleur, etc.).

Comme pour les autres notebooks, des `DataLoader` sont définis pour les jeux d'entraînement, validation et test.

### 2.3 Architecture ResNet-50

- Modèle : `torchvision.models.resnet50`, pré-entraîné sur ImageNet.
- La dernière couche fully connected est remplacée par une couche linéaire de sortie avec **11 neurones**.
- ResNet-50 est un réseau profond (~24,56 M de paramètres) avec des **blocs résiduels** qui facilitent l'entraînement de réseaux très profonds.

### 2.4 Stratégie d'entraînement

La stratégie générale est semblable à celle d' EfficientNet-B3 :

- gel initial d'une partie du backbone (au moins les couches basses),
- entraînement de la tête de classification,
- puis dégel progressif de certaines couches pour un **fine-tuning** plus fin.

En pratique :

- Optimiseur typique : **Adam** ou **SGD** avec momentum ;
- Perte : `CrossEntropyLoss` ;
- Scheduler de learning rate (par exemple `StepLR` ou `ReduceLROnPlateau`) ;
- Early stopping / sauvegarde du meilleur modèle sur la base de la validation.

À chaque époque, on suit :

- la **loss** et l'**accuracy** sur `train` et `val` ;
- l'évolution du learning rate ;
- la sélection du meilleur checkpoint.

### 2.5 Résultats et interprétation

D'après le fichier de comparaison des modèles (`models/model_comparison_report.json`) :

- **ResNet-50** atteint :
  - **Val Accuracy ≈ 98,48 %** ;
  - **Test Accuracy ≈ 97,58 %** ;
  - **Paramètres ≈ 24,56 M**.

Le notebook génère :

- une **matrice de confusion** sur le jeu de test ;
- un **rapport de classification** détaillé ;
- des **courbes d'entraînement** (loss et accuracy train/val) ;
- parfois des visualisations de quelques prédictions correctes / erronées.

On observe que ResNet-50 offre déjà une **très bonne précision**, mais avec :

- un **coût mémoire** plus élevé ;
- des **temps d'entraînement** plus longs que MobileNetV3 ;
- une efficacité globale inférieure à EfficientNet-B3 pour ce dataset.

#### 2.5.1 Visuels principaux (ResNet-50)

Les figures suivantes sont générées par le notebook et stockées dans le dossier `resnet_results` :

- Courbes d'entraînement (loss et accuracy) :

  ![Courbes d'entraînement ResNet-50](resnet_results/loss%20accuracy.png)

- Matrice de confusion sur le jeu de test :

  ![Matrice de confusion ResNet-50](resnet_results/matrice%20confusion.png)

- Exemple de Grad-CAM (épice "anis") :

  ![Grad-CAM ResNet-50 sur anis](resnet_results/grad%20cam%20anis.png)

### 2.6 Rôle de ResNet-50 dans le projet

ResNet-50 sert de **baseline puissante** :

- il montre jusqu'où on peut aller en précision avec un grand modèle standard ;
- il permet de mettre en valeur le **meilleur compromis** offert ensuite par EfficientNet-B3 : presque meilleure précision, mais avec beaucoup moins de paramètres ;
- il se compare aussi à MobileNetV3, qui est plus léger mais un peu moins précis.

---

## 3. Notebook EfficientNet-B3 — `04_model_efficientnet.ipynb`

### 3.1 Objectif du notebook

Ce notebook entraîne et évalue un modèle **EfficientNet-B3** sur les 11 classes d'épices, avec pour but de trouver un **modèle "production"** offrant le meilleur compromis précision / taille / efficacité.

C'est ce modèle qui a finalement été retenu et déployé dans l'API Flask et le front-end.

### 3.2 Préparation des données

- Dataset : même structure `dataset/splits/train`, `val`, `test`, 11 classes, ~2 200 images au total.
- Transformations :
  - redimensionnement / recadrage en **300×300** (taille adaptée à EfficientNet-B3) ;
  - conversion en tenseurs ;
  - **normalisation ImageNet** ;
  - augmentations de données sur le train (rotations, flips, modifications de luminosité/couleur, etc.).

Deux `Compose` différents sont définis :

- `train_transform` : avec augmentations ;
- `val_transform` / `test_transform` : uniquement resize + normalisation (pas d'augmentations).

Une classe `SpiceDataset` gère la lecture des images, l'association image/label, et l'application des transforms.

### 3.3 Architecture EfficientNet-B3

- Modèle : `EfficientNet-B3` (via la librairie `efficientnet_pytorch`), **pré-entraîné sur ImageNet**.
- La dernière couche de classification est remplacée par une couche linéaire à **11 sorties**.
- Nombre de paramètres ≈ **10,71 M**, soit :
  - beaucoup moins que ResNet-50 (24,56 M),
  - mais plus que MobileNetV3 (~3 M).

EfficientNet repose sur :

- une mise à l'échelle conjointe **profondeur / largeur / résolution** ;
- des blocs MBConv avec Squeeze-and-Excitation ;
- une architecture optimisée pour maximiser la précision sous contrainte de FLOPs.

### 3.4 Stratégie de fine-tuning

Le notebook suit une stratégie de **transfer learning en deux temps** :

1. **Warm-up** :
   - la majorité du backbone est gelée ;
   - seule la tête de classification nouvellement ajoutée est entraînée ;
   - objectif : adapter rapidement la dernière couche aux 11 classes.

2. **Fine-tuning partiel** :
   - certaines couches profondes du backbone sont dégelées ;
   - on utilise un **learning rate plus faible** pour ces couches ;
   - on affûte les filtres pour mieux capturer les textures / couleurs des épices.

- Optimiseur : **AdamW** ;
- Scheduler : décroissance du learning rate (par exemple de type cosinus) ou `ReduceLROnPlateau` selon la version ;
- Early stopping : conservation du **meilleur checkpoint** sur la base de la validation.

### 3.5 Entraînement et suivi

À chaque époque, le notebook :

- entraîne sur `train_loader` (loss + accuracy) ;
- valide sur `val_loader` ;
- met à jour le scheduler ;
- logue les métriques dans un dictionnaire `history` (pour tracer les courbes) ;
- sauvegarde les **meilleurs poids** (`model_efficientnet_best.pth`).

Les courbes loss / accuracy montrent une convergence stable, avec peu d'écart entre train et val, signe d'un **overfitting limité**.

### 3.6 Résultats sur le jeu de test

D'après le rapport de comparaison (`models/model_comparison_report.json`) et le notebook :

- **EfficientNet-B3** atteint :
  - **Val Accuracy ≈ 98,79 %** ;
  - **Test Accuracy ≈ 98,79 %** ;
  - **Paramètres ≈ 10,71 M**.

Le notebook calcule et affiche :

- la **matrice de confusion** sur le jeu de test ;
- un **rapport de classification** détaillé (precision, recall, F1 par classe) ;
- des **courbes d'entraînement** (loss / accuracy) ;
- des statistiques par classe (meilleures / pires classes).

Les erreurs restantes concernent essentiellement des classes **visuellement très proches** (couleur / texture similaires), ce qui est cohérent avec la difficulté du problème.

#### 3.6.1 Visuels principaux (EfficientNet-B3)

Les figures suivantes sont générées par le notebook et stockées dans le dossier `efficientnet_results` :

- Courbes d'entraînement (loss et accuracy) :

  ![Courbes d'entraînement EfficientNet-B3](efficientnet_results/loss%20and%20accuracy.png)

- Matrice de confusion sur le jeu de test :

  ![Matrice de confusion EfficientNet-B3](efficientnet_results/matrice%20confusion.png)

- Exemple de Grad-CAM (épice "cannelle") :

  ![Grad-CAM EfficientNet-B3 sur cannelle](efficientnet_results/gradcam%20cannelle.png)

### 3.7 Grad-CAM et interprétabilité

Le notebook intègre une implémentation de **Grad-CAM** :

- un module `GradCAM` accroche des hooks sur la dernière couche convolutionnelle d'EfficientNet-B3 ;
- pour une image donnée, on calcule les gradients de la classe prédite par rapport à ces cartes d'activation ;
- ces gradients sont combinés pour produire une **heatmap** (carte de chaleur) qui met en évidence les régions les plus importantes pour la prédiction.

Une fonction de visualisation permet :

- de sélectionner une image de test (par épice / index) ;
- d'afficher l'image originale, la prédiction et la heatmap Grad-CAM superposée.

Les visualisations montrent que le modèle se concentre bien sur la **zone de l'épice** (et non sur le fond), ce qui renforce la confiance dans les décisions.

### 3.8 Rôle d'EfficientNet-B3 dans le projet

EfficientNet-B3 est finalement le **modèle principal retenu** car il offre :

- la **meilleure précision** sur le test (~98,79 %) ;
- un **nombre de paramètres modéré** (≈ 10,7 M), deux fois moins que ResNet-50 ;
- une bonne efficacité globale (meilleur score d'efficacité dans `model_comparison_report.json`).

Il représente donc le **meilleur compromis** :

- plus précis que MobileNetV3 ;
- plus léger et plus efficace que ResNet-50 ;
- suffisamment rapide pour une API en production.

C'est ce modèle qui est chargé dans `app.py` et utilisé par le front-end React pour la classification d'images d'épices.

---

## 4. Notebook CNN Custom — `02_model_cnn_custom.ipynb`

### 4.1 Objectif du notebook

Ce notebook entraine un modele **CNN Custom** (4 blocs convolutionnels) avec une pipeline complete : preparation des donnees, entrainement, evaluation, et **Grad-CAM** pour l'explicabilite. L'objectif est d'avoir une base personnalisable et interpretable.

### 4.2 Preparation des donnees

- Dataset organise en dossiers par classe (11 epices).
- Transformations : resize 224x224, augmentation (rotations, flips, jitter), puis normalisation ImageNet.
- Creation de `DataLoader` pour train/val/test avec `num_workers=0` sur Windows.

### 4.3 Architecture CNN Custom

- 4 blocs convolutionnels (3→64→128→256→512 canaux).
- BatchNorm + ReLU + MaxPool a chaque bloc.
- Global Average Pooling puis MLP avec dropout.
- Nombre total de parametres : **4 823 371**.

### 4.4 Strategie d'entrainement

- Optimiseur : Adam ; Scheduler : ReduceLROnPlateau.
- Training en mixed precision si GPU disponible.
- Sauvegarde du meilleur checkpoint sur validation.

### 4.5 Resultats et metriques

Les principaux resultats obtenus pour CNN Custom sont :

- **Meilleure validation accuracy** : **76,06 %** ;
- **Test accuracy** : **85,45 %** ;
- **Nombre total de parametres** : **4,82 M**.

Le notebook genere aussi :

- courbes d'entrainement (loss et accuracy) ;
- matrice de confusion ;
- visualisations **Grad-CAM** sur des images du test.

#### 4.5.1 Visuels principaux (CNN Custom)

Les figures suivantes sont generees par le notebook et stockees dans le dossier `cnn_results` :

- Courbes d'entrainement (loss et accuracy) :

  ![Courbes d'entrainement CNN Custom](cnn_results/training_curves_cnn_custom.png)

- Matrice de confusion sur le jeu de test :

  ![Matrice de confusion CNN Custom](cnn_results/confusion_matrix_cnn_custom.png)

- Exemple Grad-CAM (image du test) :

  ![Grad-CAM CNN Custom](cnn_results/gradcam%20cnn.png)
