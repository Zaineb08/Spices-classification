export interface Recipe {
  id: string;
  name: string;
  nameArabic: string;
  spices: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  cookTime: string;
  serves: string;
  description: string;
  ingredients: string[];
  briefInstructions: string;
}

export const RECIPES_BY_SPICE: Record<string, Recipe[]> = {
  safran: [
    {
      id: 'couscous-royal',
      name: 'Royal Couscous',
      nameArabic: 'الكسكس الملكي',
      spices: ['safran', 'gingembre', 'curcuma', 'poivre_noir'],
      difficulty: 'Hard',
      prepTime: '45 minutes',
      cookTime: '2 hours',
      serves: '8-10 people',
      description: 'A luxurious Moroccan feast featuring saffron-infused couscous with seven vegetables and tender meats.',
      ingredients: ['Couscous 1kg', 'Lamb 500g', 'Chicken 500g', 'Saffron threads 1/2 tsp', 'Carrots, turnips, zucchini, cabbage', 'Chickpeas 400g', 'Onions 3', 'Tomatoes 4', 'Smen 3 tbsp'],
      briefInstructions: 'Steam couscous three times while slow-cooking meats and vegetables with saffron in traditional couscoussier. Arrange on large platter.',
    },
    {
      id: 'lamb-tagine-saffron',
      name: 'Saffron Lamb Tagine',
      nameArabic: 'طاجين لحم الغنم بالزعفران',
      spices: ['safran', 'gingembre', 'cannelle', 'poivre_noir'],
      difficulty: 'Medium',
      prepTime: '20 minutes',
      cookTime: '2 hours',
      serves: '4-6 people',
      description: 'Tender lamb slow-cooked with saffron, creating a golden, aromatic dish.',
      ingredients: ['Lamb shoulder 1kg', 'Saffron threads 1/4 tsp', 'Onions 2', 'Garlic 4 cloves', 'Olive oil 1/4 cup', 'Fresh cilantro and parsley', 'Preserved lemon'],
      briefInstructions: 'Brown lamb with onions, add saffron-infused broth and spices, slow cook until tender. Add preserved lemon before serving.',
    },
  ],
  
  cumin: [
    {
      id: 'kefta-tagine',
      name: 'Kefta Tagine',
      nameArabic: 'طاجين الكفتة',
      spices: ['cumin', 'paprika', 'cannelle', 'poivre_noir'],
      difficulty: 'Medium',
      prepTime: '30 minutes',
      cookTime: '45 minutes',
      serves: '4 people',
      description: 'Moroccan meatballs in a rich tomato sauce, topped with eggs.',
      ingredients: ['Ground beef 500g', 'Cumin 2 tsp', 'Tomatoes 6', 'Eggs 4', 'Fresh parsley and cilantro', 'Onions 2', 'Garlic 3 cloves', 'Paprika 1 tsp'],
      briefInstructions: 'Form spiced meatballs, simmer in tomato sauce for 30 minutes, crack eggs on top and cook until set.',
    },
    {
      id: 'chermoula-fish',
      name: 'Fish with Chermoula',
      nameArabic: 'السمك بالشرمولة',
      spices: ['cumin', 'paprika', 'carvi'],
      difficulty: 'Easy',
      prepTime: '15 minutes + 30 min marinating',
      cookTime: '20 minutes',
      serves: '4 people',
      description: 'Grilled fish marinated in traditional Moroccan chermoula sauce.',
      ingredients: ['White fish 600g', 'Cumin 2 tsp', 'Fresh cilantro 1 bunch', 'Paprika 1 tsp', 'Garlic 4 cloves', 'Lemon juice 1/4 cup', 'Olive oil 1/3 cup'],
      briefInstructions: 'Blend chermoula ingredients, marinate fish 30 minutes, grill or bake at 200°C for 15-20 minutes.',
    },
    {
      id: 'bissara',
      name: 'Bissara (Fava Bean Soup)',
      nameArabic: 'البصارة',
      spices: ['cumin', 'paprika', 'poivre_noir'],
      difficulty: 'Easy',
      prepTime: '10 minutes',
      cookTime: '40 minutes',
      serves: '6 people',
      description: 'Creamy split fava bean soup, a Moroccan breakfast staple.',
      ingredients: ['Dried split fava beans 500g', 'Garlic 6 cloves', 'Cumin 2 tsp', 'Paprika for garnish', 'Olive oil', 'Salt'],
      briefInstructions: 'Boil fava beans with garlic until very soft, blend until smooth, season with cumin. Drizzle with olive oil and paprika.',
    },
  ],
  
  cannelle: [
    {
      id: 'pastilla',
      name: 'Chicken Pastilla',
      nameArabic: 'البسطيلة',
      spices: ['cannelle', 'gingembre', 'safran'],
      difficulty: 'Hard',
      prepTime: '1 hour',
      cookTime: '1 hour',
      serves: '8 people',
      description: 'Iconic sweet and savory Moroccan pie with layers of phyllo, spiced chicken, and cinnamon-dusted almonds.',
      ingredients: ['Phyllo dough 450g', 'Chicken 1kg', 'Almonds 300g', 'Cinnamon 2 tsp + for dusting', 'Eggs 6', 'Butter 200g', 'Powdered sugar', 'Onions 2'],
      briefInstructions: 'Cook chicken with spices, shred. Toast almonds with cinnamon and sugar. Layer phyllo with chicken, almond mixture, and egg. Bake, dust with cinnamon sugar.',
    },
    {
      id: 'mrouzia',
      name: 'Mrouzia (Sweet Lamb Tagine)',
      nameArabic: 'المروزية',
      spices: ['cannelle', 'gingembre', 'safran', 'poivre_noir'],
      difficulty: 'Medium',
      prepTime: '30 minutes',
      cookTime: '2 hours',
      serves: '6 people',
      description: 'Traditional festive dish with lamb, honey, raisins, and warming spices.',
      ingredients: ['Lamb 1kg', 'Honey 1/2 cup', 'Raisins 200g', 'Almonds 150g', 'Cinnamon 2 sticks', 'Onions 2', 'Smen 3 tbsp', 'Saffron pinch'],
      briefInstructions: 'Brown lamb with smen and spices, slow cook 1.5 hours. Add honey and raisins, cook 30 more minutes. Top with toasted almonds.',
    },
    {
      id: 'cinnamon-tea',
      name: 'Moroccan Cinnamon Tea',
      nameArabic: 'شاي القرفة',
      spices: ['cannelle'],
      difficulty: 'Easy',
      prepTime: '5 minutes',
      cookTime: '10 minutes',
      serves: '4 people',
      description: 'Warming spiced tea with cinnamon sticks, perfect for cold evenings.',
      ingredients: ['Cinnamon sticks 4', 'Water 1 liter', 'Sugar to taste', 'Optional: green tea, fresh mint'],
      briefInstructions: 'Boil water with cinnamon sticks for 10 minutes. Add sugar to taste. Can add green tea or mint for variation.',
    },
  ],
  
  curcuma: [
    {
      id: 'vegetable-tagine',
      name: 'Seven Vegetable Tagine',
      nameArabic: 'طاجين الخضر',
      spices: ['curcuma', 'cumin', 'gingembre', 'paprika'],
      difficulty: 'Easy',
      prepTime: '20 minutes',
      cookTime: '45 minutes',
      serves: '6 people',
      description: 'Colorful vegetarian tagine with turmeric-spiced vegetables.',
      ingredients: ['Carrots, turnips, zucchini, potatoes, tomatoes, pumpkin, cabbage', 'Turmeric 1 tsp', 'Chickpeas 400g', 'Olive oil 1/4 cup', 'Preserved lemon', 'Fresh herbs'],
      briefInstructions: 'Layer vegetables in tagine with turmeric and spices, add water, slow cook 45 minutes until tender. Finish with preserved lemon.',
    },
    {
      id: 'moroccan-rice',
      name: 'Moroccan Turmeric Rice',
      nameArabic: 'الأرز المغربي',
      spices: ['curcuma', 'cumin', 'cannelle'],
      difficulty: 'Easy',
      prepTime: '10 minutes',
      cookTime: '25 minutes',
      serves: '6 people',
      description: 'Fragrant yellow rice with vermicelli and warming spices.',
      ingredients: ['Long grain rice 500g', 'Turmeric 1 tsp', 'Vermicelli 100g', 'Butter 3 tbsp', 'Chicken stock 750ml', 'Cinnamon stick 1', 'Raisins 50g'],
      briefInstructions: 'Toast vermicelli in butter, add rice and turmeric, pour stock, add cinnamon. Simmer 20 minutes. Fluff with raisins.',
    },
  ],
  
  gingembre: [
    {
      id: 'chicken-tagine-lemon',
      name: 'Chicken Tagine with Lemon',
      nameArabic: 'طاجين الدجاج بالليمون',
      spices: ['gingembre', 'safran', 'cumin', 'poivre_noir'],
      difficulty: 'Medium',
      prepTime: '20 minutes',
      cookTime: '1 hour',
      serves: '4 people',
      description: 'Classic Moroccan dish with chicken, preserved lemons, and olives.',
      ingredients: ['Chicken 1.5kg', 'Preserved lemons 2', 'Green olives 1 cup', 'Fresh ginger 2 tbsp grated', 'Saffron pinch', 'Onions 2', 'Olive oil 1/4 cup'],
      briefInstructions: 'Brown chicken with onions and ginger, add saffron and water, slow cook 45 minutes. Add preserved lemons and olives, cook 15 more minutes.',
    },
    {
      id: 'ginger-tea',
      name: 'Moroccan Ginger Tea',
      nameArabic: 'شاي الزنجبيل',
      spices: ['gingembre', 'cannelle'],
      difficulty: 'Easy',
      prepTime: '5 minutes',
      cookTime: '15 minutes',
      serves: '4 people',
      description: 'Soothing ginger tea with cinnamon and honey, aids digestion.',
      ingredients: ['Fresh ginger 50g sliced', 'Cinnamon stick 1', 'Honey to taste', 'Water 1 liter', 'Optional: lemon juice'],
      briefInstructions: 'Boil water with ginger and cinnamon for 15 minutes. Strain, sweeten with honey. Add lemon if desired.',
    },
  ],
  
  paprika: [
    {
      id: 'zaalouk',
      name: 'Zaalouk (Eggplant Salad)',
      nameArabic: 'الزعلوك',
      spices: ['paprika', 'cumin', 'carvi'],
      difficulty: 'Easy',
      prepTime: '15 minutes',
      cookTime: '30 minutes',
      serves: '4 people',
      description: 'Smoky eggplant and tomato salad seasoned with paprika and cumin.',
      ingredients: ['Eggplants 3 large', 'Tomatoes 4', 'Paprika 2 tsp', 'Cumin 1 tsp', 'Garlic 4 cloves', 'Olive oil 1/4 cup', 'Fresh cilantro'],
      briefInstructions: 'Roast eggplants until charred, peel. Cook tomatoes with spices and garlic, add eggplant, mash until chunky. Serve with bread.',
    },
    {
      id: 'taktouka',
      name: 'Taktouka (Pepper Salad)',
      nameArabic: 'التكتوكة',
      spices: ['paprika', 'cumin', 'poivre_noir'],
      difficulty: 'Easy',
      prepTime: '15 minutes',
      cookTime: '30 minutes',
      serves: '4 people',
      description: 'Roasted pepper and tomato salad with garlic and spices.',
      ingredients: ['Red bell peppers 4', 'Tomatoes 4', 'Paprika 2 tsp', 'Cumin 1 tsp', 'Garlic 5 cloves', 'Olive oil', 'Fresh parsley'],
      briefInstructions: 'Roast peppers and tomatoes, peel and chop. Cook with garlic, paprika, and cumin until thickened. Serve warm or cold.',
    },
  ],
  
  carvi: [
    {
      id: 'harira',
      name: 'Harira Soup',
      nameArabic: 'الحريرة',
      spices: ['carvi', 'gingembre', 'curcuma', 'cannelle'],
      difficulty: 'Medium',
      prepTime: '20 minutes',
      cookTime: '1.5 hours',
      serves: '8 people',
      description: 'Traditional Moroccan soup served during Ramadan, rich with lentils, chickpeas, and meat.',
      ingredients: ['Lamb 300g diced', 'Brown lentils 200g', 'Chickpeas 400g', 'Tomatoes 500g', 'Caraway 1 tsp', 'Fresh cilantro and parsley', 'Flour 3 tbsp', 'Vermicelli 100g'],
      briefInstructions: 'Simmer meat, legumes, and spices 1 hour. Add tomatoes and herbs. Thicken with flour mixture. Add vermicelli, cook 10 minutes. Garnish with lemon and dates.',
    },
    {
      id: 'lamb-tagine-caraway',
      name: 'Lamb Tagine with Caraway',
      nameArabic: 'طاجين لحم الغنم بالكراوية',
      spices: ['carvi', 'cumin', 'gingembre', 'paprika'],
      difficulty: 'Medium',
      prepTime: '25 minutes',
      cookTime: '2 hours',
      serves: '6 people',
      description: 'Hearty lamb tagine with aromatic caraway seeds and root vegetables.',
      ingredients: ['Lamb shoulder 1kg', 'Caraway seeds 2 tsp', 'Carrots 4', 'Turnips 3', 'Potatoes 4', 'Onions 2', 'Tomatoes 3', 'Olive oil 1/4 cup', 'Fresh herbs'],
      briefInstructions: 'Brown lamb with onions and caraway. Add vegetables, tomatoes, and spices. Slow cook 2 hours until meat is tender and vegetables are soft.',
    },
  ],
  
  clou_girofle: [
    {
      id: 'ras-el-hanout-blend',
      name: 'Ras el Hanout Spice Blend',
      nameArabic: 'رأس الحانوت',
      spices: ['clou_girofle', 'cannelle', 'cumin', 'gingembre', 'cubebe', 'poivre_noir'],
      difficulty: 'Easy',
      prepTime: '15 minutes',
      cookTime: '5 minutes',
      serves: 'Makes 1 cup',
      description: 'The legendary Moroccan spice blend meaning "head of the shop" - the best spices a merchant has.',
      ingredients: ['Cloves 2 tsp', 'Cinnamon 3 tsp', 'Cumin 4 tsp', 'Coriander 3 tsp', 'Ginger 2 tsp', 'Black pepper 2 tsp', 'Turmeric 2 tsp', 'Paprika 3 tsp', 'Cardamom 1 tsp', 'Nutmeg 1 tsp'],
      briefInstructions: 'Lightly toast whole spices in dry pan for 2-3 minutes until fragrant. Cool completely, then grind to fine powder. Store in airtight container up to 6 months.',
    },
    {
      id: 'lamb-tagine-prunes',
      name: 'Lamb Tagine with Prunes',
      nameArabic: 'طاجين الخروف بالبرقوق',
      spices: ['clou_girofle', 'cannelle', 'gingembre', 'safran'],
      difficulty: 'Medium',
      prepTime: '25 minutes',
      cookTime: '2 hours',
      serves: '6 people',
      description: 'Sweet and savory tagine with lamb, prunes, and aromatic cloves.',
      ingredients: ['Lamb shoulder 1kg', 'Prunes 300g', 'Cloves 6 whole', 'Cinnamon stick 1', 'Onions 2', 'Honey 3 tbsp', 'Almonds 100g', 'Sesame seeds'],
      briefInstructions: 'Brown lamb with onions and whole cloves, add cinnamon and water, simmer 1.5 hours. Add prunes and honey, cook 30 minutes. Garnish with toasted almonds and sesame.',
    },
  ],
  
  poivre_noir: [
    {
      id: 'lamb-kebabs',
      name: 'Moroccan Lamb Kebabs',
      nameArabic: 'أسياخ اللحم',
      spices: ['poivre_noir', 'cumin', 'paprika', 'gingembre'],
      difficulty: 'Easy',
      prepTime: '30 minutes + 2 hours marinating',
      cookTime: '15 minutes',
      serves: '4 people',
      description: 'Grilled lamb skewers marinated in aromatic Moroccan spices.',
      ingredients: ['Lamb 800g cubed', 'Black pepper 2 tsp', 'Cumin 2 tsp', 'Paprika 1 tsp', 'Onion 1 grated', 'Fresh parsley and cilantro', 'Lemon juice 2 tbsp', 'Olive oil 3 tbsp'],
      briefInstructions: 'Mix spices with grated onion, herbs, lemon, and oil. Marinate lamb 2+ hours. Thread on skewers, grill over high heat 12-15 minutes, turning often.',
    },
    {
      id: 'mechoui',
      name: 'Mechoui (Slow-Roasted Lamb)',
      nameArabic: 'المشوي',
      spices: ['poivre_noir', 'cumin', 'paprika'],
      difficulty: 'Hard',
      prepTime: '30 minutes',
      cookTime: '4-6 hours',
      serves: '10-12 people',
      description: 'Traditional whole lamb or shoulder slow-roasted until falling off the bone.',
      ingredients: ['Lamb shoulder 3kg', 'Black pepper 3 tbsp', 'Cumin 3 tbsp', 'Paprika 2 tbsp', 'Garlic 1 head', 'Butter 200g', 'Salt'],
      briefInstructions: 'Rub lamb with butter, garlic, and spices. Roast at 160°C for 4-6 hours, basting every hour. Serve with cumin salt for dipping.',
    },
  ],
  
  anis: [
    {
      id: 'fekkas',
      name: 'Fekkas (Anise Biscotti)',
      nameArabic: 'الفكاس',
      spices: ['anis', 'cannelle'],
      difficulty: 'Medium',
      prepTime: '30 minutes',
      cookTime: '1 hour',
      serves: 'Makes 40 pieces',
      description: 'Twice-baked Moroccan cookies flavored with anise, perfect with mint tea.',
      ingredients: ['Flour 500g', 'Anise seeds 3 tbsp', 'Sesame seeds 100g', 'Almonds 150g', 'Eggs 3', 'Butter 100g', 'Sugar 150g', 'Baking powder 2 tsp'],
      briefInstructions: 'Mix all ingredients into dough, shape into logs 3cm wide. Bake at 180°C for 30 minutes. Cool, slice diagonally 1cm thick, bake again at 150°C for 30 minutes until golden.',
    },
    {
      id: 'anise-tea',
      name: 'Moroccan Anise Tea',
      nameArabic: 'شاي اليانسون',
      spices: ['anis'],
      difficulty: 'Easy',
      prepTime: '5 minutes',
      cookTime: '10 minutes',
      serves: '4 people',
      description: 'Soothing anise tea, traditionally served after meals to aid digestion.',
      ingredients: ['Anise seeds 2 tbsp', 'Water 1 liter', 'Honey to taste', 'Optional: fresh mint leaves'],
      briefInstructions: 'Boil water with anise seeds for 10 minutes. Strain into cups, sweeten with honey. Add mint if desired.',
    },
  ],
  
  cubebe: [
    {
      id: 'game-tagine',
      name: 'Wild Game Tagine',
      nameArabic: 'طاجين الصيد',
      spices: ['cubebe', 'clou_girofle', 'cannelle', 'poivre_noir', 'gingembre'],
      difficulty: 'Hard',
      prepTime: '30 minutes + overnight marinating',
      cookTime: '2.5 hours',
      serves: '6 people',
      description: 'Traditional tagine for wild game such as rabbit, quail, or venison, featuring cubeb pepper and a balance of sweet dried fruits.',
      ingredients: ['Game meat 1.5kg (rabbit/quail/venison)', 'Cubeb pepper 1 tsp ground', 'Ground cloves 1/2 tsp', 'Cinnamon stick 1', 'Fresh ginger 2 tbsp grated', 'Onions 3', 'Dried apricots 200g', 'Prunes 150g', 'Almonds 100g', 'Honey 3 tbsp', 'Olive oil 1/4 cup', 'Smen 2 tbsp'],
      briefInstructions: 'Marinate meat overnight with cubeb, cloves, and ginger. Brown in oil and smen, add onions and spices, slow cook 2 hours. Add dried fruits and honey, cook 30 minutes. Garnish with toasted almonds.',
    },
    {
      id: 'merguez',
      name: 'Merguez Sausage',
      nameArabic: 'المرقاز',
      spices: ['cubebe', 'cumin', 'paprika', 'poivre_noir'],
      difficulty: 'Hard',
      prepTime: '45 minutes + chilling',
      cookTime: '15 minutes',
      serves: '8 people',
      description: 'Spicy North African lamb sausages with cubeb pepper and harissa.',
      ingredients: ['Lamb 1kg ground', 'Lamb fat 200g', 'Cubeb pepper 1 tsp', 'Cumin 2 tbsp', 'Paprika 3 tbsp', 'Harissa 3 tbsp', 'Garlic 6 cloves', 'Natural casings'],
      briefInstructions: 'Mix all spices with ground meat and fat. Chill 2 hours. Stuff into casings, twist into links. Grill or pan-fry 12-15 minutes.',
    },
  ],
};

export function getRecipesBySpice(spiceId: string): Recipe[] {
  return RECIPES_BY_SPICE[spiceId] || [];
}

export function getAllRecipes(): Recipe[] {
  return Object.values(RECIPES_BY_SPICE).flat();
}

export function getRecipeById(recipeId: string): Recipe | null {
  const allRecipes = getAllRecipes();
  return allRecipes.find(recipe => recipe.id === recipeId) || null;
}