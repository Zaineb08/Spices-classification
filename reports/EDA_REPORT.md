# Rapport EDA — Reconnaissance des Epices Marocaines

## 1. Portee et sources analysees

Ce rapport synth et detaille l'analyse exploratoire (EDA) a partir des fichiers exportes dans `eda_results/` et des visualisations deja generees dans `eda_results/images/`. L'objectif est de documenter la structure du dataset, la qualite des images, les caracteristiques de couleur et de luminosite, ainsi que les points de vigilance avant entrainement.

### Fichiers utilises

- `eda_results/eda_summary.json`
- `eda_results/image_counts.csv`
- `eda_results/color_analysis.csv`
- `eda_results/color_distance_matrix.csv`
- `eda_results/normalization_stats.json`
- `eda_results/class_statistics.json`

### Figures integrees

- `eda_results/images/01_image_distribution_train.png`
- `eda_results/images/02_split_distribution.png`
- `eda_results/images/03_average_colors.png`
- `eda_results/images/04_rgb_components.png`
- `eda_results/images/05_color_distance_heatmap.png`
- `eda_results/images/06_luminosity_distribution.png`
- `eda_results/images/07_color_histogram_safran.png`

---

## 2. Structure globale du dataset

D'apres `eda_summary.json`, le dataset contient 11 classes d'epices et un total de 2200 images. La repartition par splits respecte un schema 70/15/15 avec des volumes identiques entre classes.

### 2.1 Repartition globale

| Split      |   Images | Pourcentage |
| ---------- | -------: | ----------: |
| Train      |     1540 |         70% |
| Validation |      330 |         15% |
| Test       |      330 |         15% |
| **Total**  | **2200** |    **100%** |

### 2.2 Repartition par classe (extrait du comptage)

| Classe       | Train | Val | Test | Total |
| ------------ | ----: | --: | ---: | ----: |
| anis         |   140 |  30 |   30 |   200 |
| cannelle     |   140 |  30 |   30 |   200 |
| carvi        |   140 |  30 |   30 |   200 |
| clou_girofle |   140 |  30 |   30 |   200 |
| cubebe       |   140 |  30 |   30 |   200 |
| cumin        |   140 |  30 |   30 |   200 |
| curcuma      |   140 |  30 |   30 |   200 |
| gingembre    |   140 |  30 |   30 |   200 |
| paprika      |   140 |  30 |   30 |   200 |
| poivre noir  |   140 |  30 |   30 |   200 |
| safran       |   140 |  30 |   30 |   200 |

### 2.3 Illustration

![Distribution train](/eda_results/images/01_image_distribution_train.png)
![Repartition splits](/eda_results/images/02_split_distribution.png)

**Interpretation.** Le dataset est parfaitement equilibre en nombre d'images par classe dans le split train (min = max = 140). Cette balance reduit le risque de biais d'apprentissage et facilite l'interpretation des metriques par classe.

---

## 3. Qualite des images et dimensions

Les dimensions sont heterogenes mais toutes les images sont en mode RGB.

- Largeur min/max: 384 / 4000 px
- Hauteur min/max: 384 / 4000 px
- Largeur moyenne: 610.19 px
- Hauteur moyenne: 700.98 px
- Modes detectes: RGB uniquement

**Pourquoi c'est important.** Un modele CNN exige une taille d'entree uniforme. L'etendue 384–4000 px indique la presence d'images tres grandes et tres petites, ce qui peut introduire des distorsions lors du redimensionnement. Il est recommande d'appliquer un resizing standard (ex. 224x224 ou 299x299) et une normalisation des canaux.

---

## 4. Analyse de la couleur (RGB)

L'analyse de couleur est basee sur la moyenne des canaux RGB par classe. La couleur moyenne d'une image est definie par:

$$
\mu_R = \frac{1}{HW}\sum_{i=1}^{H}\sum_{j=1}^{W} R_{ij},\quad
\mu_G = \frac{1}{HW}\sum_{i=1}^{H}\sum_{j=1}^{W} G_{ij},\quad
\mu_B = \frac{1}{HW}\sum_{i=1}^{H}\sum_{j=1}^{W} B_{ij}
$$

### 4.1 Moyennes RGB par classe

| Classe       |     R |     G |     B |
| ------------ | ----: | ----: | ----: |
| anis         | 148.1 | 145.0 | 143.4 |
| cannelle     | 173.7 | 161.5 | 155.6 |
| carvi        | 159.4 | 144.8 | 130.2 |
| clou_girofle | 197.3 | 191.2 | 188.8 |
| cubebe       | 147.9 | 136.1 | 129.4 |
| cumin        | 139.6 | 124.9 | 112.7 |
| curcuma      | 135.9 | 113.6 |  87.9 |
| gingembre    | 131.6 | 125.3 | 114.8 |
| paprika      | 150.1 | 120.5 | 109.3 |
| poivre noir  | 202.6 | 199.0 | 192.5 |
| safran       | 154.7 | 148.5 | 134.3 |

### 4.2 Visualisations

![Couleurs moyennes](/eda_results/images/03_average_colors.png)
![Composantes RGB](/eda_results/images/04_rgb_components.png)

**Interpretation.** Les classes clou_girofle et poivre noir presentent des valeurs RGB elevees, suggérant des images globalement claires. A l'inverse, curcuma et cumin ont des valeurs plus faibles, indiquant une dominante sombre ou plus saturee en teintes chaudes. Ces differences peuvent aider le modele, mais elles peuvent aussi provoquer un sur-apprentissage sur la couleur si l'eclairage varie fortement.

---

## 5. Similarite de couleur entre classes

La distance de couleur entre deux classes est calculee via la distance euclidienne:

$$d(\mathbf{x},\mathbf{y}) = \sqrt{(R_x - R_y)^2 + (G_x - G_y)^2 + (B_x - B_y)^2}$$

### 5.1 Paires les plus proches (faible distance)

- carvi ↔ safran: 7.23
- cumin ↔ gingembre: 8.19
- clou_girofle ↔ poivre noir: 10.14
- anis ↔ safran: 11.81
- cumin ↔ paprika: 11.92

### 5.2 Heatmap

![Distance de couleur](/eda_results/images/05_color_distance_heatmap.png)

**Interpretation.** Plusieurs classes partagent des signatures colorimetriques proches, ce qui peut expliquer des confusions potentielles en classification si le modele depend trop des couleurs. Dans ces cas, les textures, la granularite ou la forme des fragments deviennent critiques.

---

## 6. Luminosite

La luminosite par image est estimee comme la moyenne en niveaux de gris:

$$L = \frac{1}{HW}\sum_{i=1}^{H}\sum_{j=1}^{W} I_{ij}$$

### 6.1 Statistiques globales

- Moyenne globale: 148.79
- Ecart-type: 42.01
- Minimum: 34.64
- Maximum: 254.23
- Classe la plus claire: poivre noir (moy. 199.34)
- Classe la plus sombre: curcuma (moy. 117.33)

### 6.2 Luminosite moyenne par classe

| Classe       | Luminosite moyenne |
| ------------ | -----------------: |
| anis         |             145.75 |
| cannelle     |             164.50 |
| carvi        |             147.48 |
| clou_girofle |             192.75 |
| cubebe       |             138.87 |
| cumin        |             127.87 |
| curcuma      |             117.33 |
| gingembre    |             125.99 |
| paprika      |             128.09 |
| poivre noir  |             199.34 |
| safran       |             148.72 |

### 6.3 Distribution

![Luminosite](/eda_results/images/06_luminosity_distribution.png)

**Interpretation.** Les ecarts importants entre classes (ex. poivre noir vs curcuma) suggerent que la luminosite est un facteur discriminant fort. Cela peut etre utile mais peut aussi reduire la robustesse si les conditions d'eclairage varient. Il est recommande d'inclure des augmentations (brightness, contrast, color jitter).

---

## 7. Histogramme RGB (exemple classe)

Le fichier `07_color_histogram_safran.png` illustre la distribution des intensites de couleur pour la classe safran.

![Histogramme safran](/eda_results/images/07_color_histogram_safran.png)

**Interpretation.** Une distribution resserree indique une couleur dominante stable. Une distribution etalee signale une variance d'eclairage plus forte, ce qui peut induire des erreurs si la normalisation n'est pas appliquee correctement.

---

## 8. Duplicats et integrite

Le rapport detecte 113 groupes de doublons (perceptual hash). Cela indique la presence d'images tres similaires ou identiques.

**Impact potentiel.**

- Risque de surapprentissage si des doublons existent dans train/val/test.
- Risque d'inflation artificielle des performances.

**Recommandations.**

- Verifier la fuite de donnees entre splits (hash exact et perceptuel).
- Filtrer les doublons ou les regrouper avant de resplitter.

---

## 9. Statistiques de normalisation

Les statistiques de normalisation (canaux RGB) sont:

- Moyennes (r, g, b): (0.6029, 0.5535, 0.5049)
- Ecarts-types (r, g, b): (0.1871, 0.2081, 0.2310)

**Usage.** Ces valeurs sont appliquees pour standardiser les images:

$$I_{norm} = \frac{I - \mu}{\sigma}$$

Cela stabilise l'entrainement et accelere la convergence.

---

## 10. Points cles et implications modeles

1. **Dataset equilibre**: pas de re-pondération necessaire a priori.
2. **Variabilite de tailles**: normalisation et resizing obligatoires.
3. **Couleur discriminante**: utile mais risque de sur-apprentissage si l'eclairage varie.
4. **Luminosite contrastée**: facteur fort de separation entre classes.
5. **Doublons**: a auditer avant entrainement final.

---

## 11. Limites et prochaines etapes

- **Audit de fuites**: confirmer qu'aucun doublon n'est present entre splits.
- **Augmentations**: appliquer rotations, contrast, brightness, color jitter.
- **Robustesse**: tester sur images prises par smartphone sous differentes lumieres.
- **Evaluation**: ajouter courbes de confusion et analyse des erreurs par classe.

---

## Annexes: Figures additionnelles

Deux fichiers supplementaires sont disponibles dans `eda_results/images/`:

- `image_properties.png`
- `pixel_statistics.png`

Ils peuvent etre ajoutes si besoin pour un rapport plus avance (proprietes d'images et statistiques de pixels).
