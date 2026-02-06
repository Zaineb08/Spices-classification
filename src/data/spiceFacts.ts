export const SPICE_FACTS = [
  "Saffron is the world's most expensive spice, requiring 75,000 flowers to produce just one pound!",
  "Morocco is one of the world's top producers of cumin, exporting tons annually.",
  "Ras el hanout can contain anywhere from 12 to 100 different spices!",
  "Cinnamon was once more valuable than gold in ancient trade routes.",
  "The distinct flavor of Moroccan cuisine comes from the careful balance of sweet and savory spices.",
  "Black pepper was so valuable in ancient times it was used as currency.",
  "Turmeric has been used in Moroccan traditional medicine for over 4,000 years.",
  "Ginger is mentioned in the Quran and has been used in Morocco for centuries.",
  "Moroccan spice merchants traditionally guard their ras el hanout recipes as family secrets.",
  "Anise seeds were found in ancient Egyptian tombs and have been prized in Morocco since antiquity.",
  "Caraway has been cultivated in Morocco since the Middle Ages.",
  "Cloves were once worth their weight in gold during the spice trade era.",
  "Paprika was introduced to Morocco after the discovery of the New World.",
  "Traditional Moroccan spice blends are said to have medicinal as well as culinary properties.",
  "The best saffron in Morocco is harvested in the Taliouine region.",
  "Moroccan cuisine uses over 50 different spices in various combinations.",
  "Cumin seeds can be traced back 5,000 years to ancient Egypt.",
  "The word 'cubeb' comes from the Arabic word 'kababa'.",
  "In Morocco, spices are traditionally sold by weight in beautiful cone-shaped displays.",
  "Fresh ginger is preferred in Moroccan tagines, while dried ginger is used in pastries.",
  "Moroccan mint tea is often enhanced with a touch of cinnamon or anise.",
  "The color of turmeric comes from curcumin, a powerful natural antioxidant.",
  "Traditional Moroccan kitchens always have at least 10 essential spices on hand.",
  "Preserved lemons and olives are considered honorary 'spices' in Moroccan cooking.",
  "The aroma of Moroccan spice markets is said to be unforgettable and unique in the world.",
  "Cubeb pepper was used in medieval European cuisine before black pepper became common.",
  "Harira soup traditionally breaks the fast during Ramadan and contains at least 7 spices.",
  "Moroccan spice souks have existed for over 1,000 years in cities like Fez and Marrakech.",
  "The spice trade routes connecting Morocco to Asia date back to the Roman Empire.",
  "Anise is traditionally given to new mothers in Morocco to promote milk production.",
  "Caraway tea is a popular digestive remedy in Moroccan households after heavy meals.",
  "Moroccan pastilla combines over 12 spices in a single dish.",
  "Saffron threads must be hand-picked at dawn for the best quality.",
  "In traditional Moroccan medicine, each spice is believed to have hot or cold properties.",
  "The iconic red color of many Moroccan dishes comes from paprika, not chili.",
];

export function getRandomSpiceFact(): string {
  return SPICE_FACTS[Math.floor(Math.random() * SPICE_FACTS.length)];
}

export function getMultipleSpiceFacts(count: number): string[] {
  const shuffled = [...SPICE_FACTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, SPICE_FACTS.length));
}

export function getSpiceSpecificFacts(spiceId: string): string[] {
  const spiceFacts: Record<string, string[]> = {
    safran: [
      "Saffron is the world's most expensive spice, requiring 75,000 flowers to produce just one pound!",
      "The best saffron in Morocco is harvested in the Taliouine region.",
      "Saffron threads must be hand-picked at dawn for the best quality.",
    ],
    cumin: [
      "Morocco is one of the world's top producers of cumin, exporting tons annually.",
      "Cumin seeds can be traced back 5,000 years to ancient Egypt.",
    ],
    cannelle: [
      "Cinnamon was once more valuable than gold in ancient trade routes.",
      "Moroccan mint tea is often enhanced with a touch of cinnamon or anise.",
    ],
    cubebe: [
      "The word 'cubeb' comes from the Arabic word 'kababa'.",
      "Cubeb pepper was used in medieval European cuisine before black pepper became common.",
    ],
    anis: [
      "Anise seeds were found in ancient Egyptian tombs and have been prized in Morocco since antiquity.",
      "Anise is traditionally given to new mothers in Morocco to promote milk production.",
    ],
    carvi: [
      "Caraway has been cultivated in Morocco since the Middle Ages.",
      "Caraway tea is a popular digestive remedy in Moroccan households after heavy meals.",
    ],
    curcuma: [
      "Turmeric has been used in Moroccan traditional medicine for over 4,000 years.",
      "The color of turmeric comes from curcumin, a powerful natural antioxidant.",
    ],
    gingembre: [
      "Ginger is mentioned in the Quran and has been used in Morocco for centuries.",
      "Fresh ginger is preferred in Moroccan tagines, while dried ginger is used in pastries.",
    ],
    paprika: [
      "Paprika was introduced to Morocco after the discovery of the New World.",
      "The iconic red color of many Moroccan dishes comes from paprika, not chili.",
    ],
    poivre_noir: [
      "Black pepper was so valuable in ancient times it was used as currency.",
    ],
    clou_girofle: [
      "Cloves were once worth their weight in gold during the spice trade era.",
    ],
  };
  
  return spiceFacts[spiceId] || [];
}
