export interface SpiceInfo {
  id: string;
  name: string;
  nameArabic: string;
  nameFrench: string;
  description: string;
  origin: string;
  traditionalUses: string[];
  healthBenefits: string[];
  storageTips: string[];
  pairsWith: string[];
  color: string;
  flavor: string;
  commonDishes: string[];
}

export const SPICE_DATABASE: Record<string, SpiceInfo> = {
  anis: {
    id: 'anis',
    name: 'Anise',
    nameArabic: 'حبة حلاوة',
    nameFrench: 'Anis',
    description: 'Anise is a flowering plant native to the Mediterranean and Southwest Asia. Its seeds have a distinct licorice-like flavor.',
    origin: 'Mediterranean region',
    traditionalUses: [
      'Used in traditional Moroccan bread and pastries',
      'Brewed as a soothing herbal tea',
      'Added to tagines for depth of flavor',
      'Essential in Moroccan sweet dishes',
    ],
    healthBenefits: [
      'Aids digestion and reduces bloating',
      'Helps relieve coughs and respiratory issues',
      'Natural antimicrobial properties',
      'May help regulate blood sugar',
    ],
    storageTips: [
      'Store whole seeds in an airtight container',
      'Keep in a cool, dark place',
      'Ground anise loses potency quickly',
      'Shelf life: 2-3 years for whole seeds',
    ],
    pairsWith: ['cinnamon', 'ginger', 'cardamom', 'mint'],
    color: '#8b7355',
    flavor: 'Sweet, licorice-like',
    commonDishes: ['M\'hanncha', 'Kaab el ghazal', 'Fekkas', 'Anise tea'],
  },
  
  cannelle: {
    id: 'cannelle',
    name: 'Cinnamon',
    nameArabic: 'القرفة',
    nameFrench: 'Cannelle',
    description: 'Cinnamon is obtained from the inner bark of cinnamon trees. It\'s one of the oldest and most beloved spices in Moroccan cuisine.',
    origin: 'Sri Lanka and Southern India',
    traditionalUses: [
      'Essential in pastilla (sweet and savory pie)',
      'Key ingredient in ras el hanout spice blend',
      'Added to Moroccan mint tea for warmth',
      'Used in mrouzia (sweet lamb tagine)',
    ],
    healthBenefits: [
      'Powerful anti-inflammatory properties',
      'Helps regulate blood sugar levels',
      'Rich in antioxidants',
      'Supports heart health',
    ],
    storageTips: [
      'Store sticks in airtight containers',
      'Keep away from direct sunlight',
      'Ground cinnamon best used within 6 months',
      'Cinnamon sticks last up to 4 years',
    ],
    pairsWith: ['cumin', 'ginger', 'cloves', 'cardamom', 'saffron'],
    color: '#c75b39',
    flavor: 'Sweet, warm, woody',
    commonDishes: ['Pastilla', 'Mrouzia', 'Cinnamon tea', 'Royal couscous'],
  },
  
  carvi: {
    id: 'carvi',
    name: 'Caraway',
    nameArabic: 'الكروية',
    nameFrench: 'Carvi',
    description: 'Caraway seeds have been used for thousands of years in North African cuisine, prized for their distinctive earthy flavor.',
    origin: 'Western Asia, Europe, and North Africa',
    traditionalUses: [
      'Flavoring for Moroccan bread',
      'Added to harira (traditional soup)',
      'Used in meat tagines',
      'Brewed as digestive tea',
    ],
    healthBenefits: [
      'Excellent for digestive health',
      'Relieves gas and bloating',
      'Contains vitamins and minerals',
      'Anti-inflammatory properties',
    ],
    storageTips: [
      'Store in sealed containers',
      'Best kept whole until use',
      'Toast lightly before grinding',
      'Lasts 2-3 years when stored properly',
    ],
    pairsWith: ['cumin', 'coriander', 'fennel', 'paprika'],
    color: '#8b7355',
    flavor: 'Earthy, slightly bitter',
    commonDishes: ['Harira soup', 'Lamb tagines', 'Meat stews'],
  },
  
  clou_girofle: {
    id: 'clou_girofle',
    name: 'Clove',
    nameArabic: 'القرنفل',
    nameFrench: 'Clou de Girofle',
    description: 'Cloves are aromatic flower buds with an intense, warm flavor. They\'re a cornerstone of Moroccan spice blends.',
    origin: 'Maluku Islands, Indonesia',
    traditionalUses: [
      'Essential in ras el hanout blend',
      'Used in preserved lemons',
      'Added to slow-cooked tagines',
      'Flavors Moroccan pastries',
    ],
    healthBenefits: [
      'Strong antimicrobial properties',
      'Natural pain reliever',
      'Supports liver health',
      'High in antioxidants',
    ],
    storageTips: [
      'Store whole cloves in glass jars',
      'Keep in cool, dark place',
      'Grind just before use for maximum flavor',
      'Whole cloves last 3-4 years',
    ],
    pairsWith: ['cinnamon', 'cardamom', 'nutmeg', 'ginger', 'black pepper'],
    color: '#6b4423',
    flavor: 'Intensely aromatic, sweet, slightly bitter',
    commonDishes: ['Ras el hanout', 'Lamb tagine', 'Rice dishes'],
  },
  
  cubebe: {
    id: 'cubebe',
    name: 'Cubeb Pepper',
    nameArabic: 'كبابة',
    nameFrench: 'Cubèbe',
    description: 'Cubeb pepper, also called tailed pepper, has a unique aromatic quality distinct from black pepper.',
    origin: 'Java, Indonesia',
    traditionalUses: [
      'Traditional ingredient in ras el hanout',
      'Used in game meat preparations',
      'Added to Moroccan sausages (merguez)',
      'Flavors special occasion dishes',
    ],
    healthBenefits: [
      'Supports respiratory health',
      'Natural antiseptic properties',
      'Aids digestion',
      'May help with urinary tract health',
    ],
    storageTips: [
      'Store in airtight containers',
      'Keep away from moisture',
      'Best purchased whole',
      'Grind fresh for optimal flavor',
    ],
    pairsWith: ['black pepper', 'cardamom', 'cinnamon', 'ginger'],
    color: '#5a4a3a',
    flavor: 'Peppery, slightly bitter, aromatic',
    commonDishes: ['Ras el hanout', 'Merguez', 'Game tagines'],
  },
  
  cumin: {
    id: 'cumin',
    name: 'Cumin',
    nameArabic: 'الكمون',
    nameFrench: 'Cumin',
    description: 'Cumin is perhaps the most widely used spice in Moroccan cooking, providing earthy warmth to countless dishes.',
    origin: 'Eastern Mediterranean and South Asia',
    traditionalUses: [
      'Base spice for most tagines',
      'Essential in kefta (meatballs)',
      'Used in vegetable dishes',
      'Key ingredient in chermoula marinade',
    ],
    healthBenefits: [
      'Aids digestion and metabolism',
      'Rich in iron and antioxidants',
      'May help with blood sugar control',
      'Anti-inflammatory properties',
    ],
    storageTips: [
      'Buy whole seeds and grind as needed',
      'Store in cool, dark place',
      'Toast before grinding for enhanced flavor',
      'Ground cumin stays fresh for 6 months',
    ],
    pairsWith: ['coriander', 'paprika', 'turmeric', 'ginger', 'cinnamon'],
    color: '#a67c52',
    flavor: 'Earthy, warm, slightly bitter',
    commonDishes: ['Tagines', 'Kefta', 'Harira', 'Chermoula', 'Bissara'],
  },
  
  curcuma: {
    id: 'curcuma',
    name: 'Turmeric',
    nameArabic: 'الكركم',
    nameFrench: 'Curcuma',
    description: 'Turmeric, known for its vibrant golden color, is a staple in Moroccan cuisine and traditional medicine.',
    origin: 'South Asia',
    traditionalUses: [
      'Colors and flavors couscous dishes',
      'Essential in vegetable tagines',
      'Used in rice preparations',
      'Traditional medicinal uses',
    ],
    healthBenefits: [
      'Powerful anti-inflammatory compound (curcumin)',
      'Strong antioxidant properties',
      'Supports brain and heart health',
      'May help prevent chronic diseases',
    ],
    storageTips: [
      'Store in airtight, opaque containers',
      'Keep away from light to preserve color',
      'Best used within one year',
      'Pairs well with black pepper for absorption',
    ],
    pairsWith: ['ginger', 'cumin', 'coriander', 'black pepper', 'cinnamon'],
    color: '#e8b86d',
    flavor: 'Earthy, slightly bitter, warm',
    commonDishes: ['Vegetable tagine', 'Couscous', 'Rice', 'Harira'],
  },
  
  gingembre: {
    id: 'gingembre',
    name: 'Ginger',
    nameArabic: 'الزنجبيل',
    nameFrench: 'Gingembre',
    description: 'Fresh and dried ginger add warmth and zing to Moroccan dishes, from savory tagines to sweet pastries.',
    origin: 'Southeast Asia',
    traditionalUses: [
      'Essential in ras el hanout',
      'Used in meat and chicken tagines',
      'Flavors Moroccan tea blends',
      'Added to pastries and sweets',
    ],
    healthBenefits: [
      'Excellent for nausea and digestion',
      'Anti-inflammatory and antioxidant',
      'Supports immune system',
      'May help with pain relief',
    ],
    storageTips: [
      'Fresh ginger: refrigerate wrapped in paper towel',
      'Dried ginger: store in airtight container',
      'Ground ginger best used within 6 months',
      'Can be frozen for longer storage',
    ],
    pairsWith: ['cinnamon', 'cumin', 'turmeric', 'cloves', 'cardamom'],
    color: '#d4a574',
    flavor: 'Spicy, warm, slightly sweet',
    commonDishes: ['Chicken tagine', 'Ginger tea', 'Pastries', 'Ras el hanout'],
  },
  
  paprika: {
    id: 'paprika',
    name: 'Paprika',
    nameArabic: 'الفلفل الحلو',
    nameFrench: 'Paprika',
    description: 'Paprika adds vibrant color and mild heat to Moroccan dishes, ranging from sweet to hot varieties.',
    origin: 'Central America (via Spain)',
    traditionalUses: [
      'Colors and flavors tagines',
      'Essential in chermoula marinade',
      'Used in grilled meat preparations',
      'Garnish for presentation',
    ],
    healthBenefits: [
      'Rich in vitamins A and E',
      'Contains capsaicin (anti-inflammatory)',
      'Supports eye health',
      'May boost metabolism',
    ],
    storageTips: [
      'Store in refrigerator to maintain color',
      'Keep in dark container',
      'Use within 6 months for best flavor',
      'Avoid moisture exposure',
    ],
    pairsWith: ['cumin', 'coriander', 'garlic', 'lemon', 'olive oil'],
    color: '#c1272d',
    flavor: 'Sweet to hot, fruity, earthy',
    commonDishes: ['Chermoula', 'Kefta', 'Zaalouk', 'Taktouka'],
  },
  
  poivre_noir: {
    id: 'poivre_noir',
    name: 'Black Pepper',
    nameArabic: 'الفلفل الأسود',
    nameFrench: 'Poivre Noir',
    description: 'Black pepper is the king of spices, adding heat and depth to Moroccan cuisine.',
    origin: 'Southern India',
    traditionalUses: [
      'Used in virtually all savory dishes',
      'Essential in ras el hanout',
      'Seasons meats and vegetables',
      'Added to preserved preparations',
    ],
    healthBenefits: [
      'Enhances nutrient absorption',
      'Contains piperine (anti-inflammatory)',
      'Supports digestive health',
      'May improve brain function',
    ],
    storageTips: [
      'Buy whole peppercorns',
      'Grind fresh for maximum flavor',
      'Store in cool, dry place',
      'Whole peppercorns last several years',
    ],
    pairsWith: ['All spices', 'especially turmeric', 'cumin', 'coriander'],
    color: '#2c1810',
    flavor: 'Sharp, pungent, woody',
    commonDishes: ['All savory dishes', 'Ras el hanout', 'Mechoui'],
  },
  
  safran: {
    id: 'safran',
    name: 'Saffron',
    nameArabic: 'الزعفران',
    nameFrench: 'Safran',
    description: 'Saffron is the world\'s most expensive spice, prized in Moroccan cuisine for its golden color and subtle flavor.',
    origin: 'Iran and Mediterranean',
    traditionalUses: [
      'Colors and flavors royal couscous',
      'Essential in special occasion tagines',
      'Used in traditional pastilla',
      'Flavors Moroccan rice dishes',
    ],
    healthBenefits: [
      'Rich in antioxidants',
      'May improve mood and depression',
      'Supports eye health',
      'Potential anti-cancer properties',
    ],
    storageTips: [
      'Store threads in airtight container',
      'Keep in cool, dark place',
      'Avoid plastic containers',
      'Can last 2-3 years if stored properly',
    ],
    pairsWith: ['cinnamon', 'ginger', 'cardamom', 'rosewater'],
    color: '#f4c430',
    flavor: 'Floral, honey-like, earthy',
    commonDishes: ['Royal couscous', 'Pastilla', 'Lamb tagine', 'Rice dishes'],
  },
};

export function getSpiceInfo(spiceId: string): SpiceInfo | null {
  return SPICE_DATABASE[spiceId] || null;
}

export function getAllSpices(): SpiceInfo[] {
  return Object.values(SPICE_DATABASE);
}