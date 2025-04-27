import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const adjectiveTemplate: TemplateData = {
  id: uuidv4(),
  name: "adjective",
  category: "Food",
  description: "Adjectives to describe food items",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common food adjectives",
      contextHint: "Generate adjectives for describing food",
      exampleValues: [
        "Delicious",
        "Savory",
        "Fresh",
        "Crispy",
        "Juicy",
        "Tender",
        "Creamy",
        "Spicy"
      ]
    },
    {
      id: uuidv4(),
      name: "Texture",
      type: "Category",
      description: "Texture-related food adjectives",
      contextHint: "Generate texture-related food adjectives",
      exampleValues: [
        "Crunchy",
        "Crispy",
        "Smooth",
        "Creamy",
        "Tender",
        "Fluffy",
        "Flaky",
        "Chewy"
      ]
    },
    {
      id: uuidv4(),
      name: "Taste",
      type: "Category",
      description: "Taste-related food adjectives",
      contextHint: "Generate taste-related food adjectives",
      exampleValues: [
        "Sweet",
        "Savory",
        "Spicy",
        "Tangy",
        "Bitter",
        "Sour",
        "Salty",
        "Umami"
      ]
    },
    {
      id: uuidv4(),
      name: "Quality",
      type: "Quality",
      description: "Quality-related food adjectives",
      contextHint: "Generate quality-related food adjectives",
      exampleValues: [
        "Gourmet",
        "Artisanal",
        "Organic",
        "Free-range",
        "Grass-fed",
        "Premium",
        "Handcrafted",
        "Farm-to-table"
      ]
    }
  ]
};

export const descriptionTemplate: TemplateData = {
  id: uuidv4(),
  name: "description",
  category: "Food",
  description: "Food item or dish descriptions",
  fieldType: "TEXT",
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard food descriptions",
      contextHint: "Generate descriptions for food items or dishes",
      exampleValues: [
        "A rich and creamy pasta dish with garlic, parmesan cheese, and freshly ground black pepper.",
        "Tender grilled chicken served with a zesty lemon herb sauce and seasonal vegetables.",
        "Freshly baked bread with a crispy crust and soft, chewy interior.",
        "A vibrant salad featuring mixed greens, cherry tomatoes, cucumber, and balsamic vinaigrette."
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Format",
      description: "Brief food descriptions",
      contextHint: "Generate brief food descriptions (1 sentence)",
      exampleValues: [
        "Spicy grilled chicken with tangy mango salsa.",
        "Creamy risotto with wild mushrooms and parmesan.",
        "Chocolate lava cake with a molten center and vanilla ice cream.",
        "Fresh Mediterranean salad with feta and olives."
      ]
    },
    {
      id: uuidv4(),
      name: "Detailed",
      type: "Format",
      description: "Comprehensive food descriptions",
      contextHint: "Generate detailed food descriptions (3+ sentences)",
      exampleValues: [
        "Our signature chocolate cake features three layers of moist devil's food cake made with premium Dutch cocoa. Each layer is filled with silky chocolate ganache and frosted with rich chocolate buttercream. Topped with chocolate shavings and a drizzle of salted caramel for an unforgettable dessert experience.",
        "This authentic Italian risotto is prepared using Carnaroli rice slowly cooked to perfection with white wine and homemade vegetable stock. Wild porcini and cremini mushrooms are sautéed with shallots and garlic, then folded into the creamy rice. Finished with aged Parmigiano-Reggiano, fresh thyme, and a drizzle of white truffle oil.",
        "Our house burger starts with a half-pound of prime ground chuck that's seasoned and grilled to order. It's topped with aged cheddar, caramelized onions, and crisp bacon on a toasted brioche bun. Served with garlic aioli, fresh lettuce, tomato, and house-made pickles, accompanied by hand-cut fries tossed in rosemary salt.",
        "This refreshing summer salad combines organic mixed greens, ripe heirloom tomatoes, and Persian cucumbers from local farms. Topped with crumbled goat cheese, candied walnuts, and thinly sliced red onions. Dressed with a honey-balsamic vinaigrette made with cold-pressed olive oil and aged balsamic vinegar."
      ]
    },
    {
      id: uuidv4(),
      name: "Menu",
      type: "Style",
      description: "Restaurant menu descriptions",
      contextHint: "Generate restaurant menu-style food descriptions",
      exampleValues: [
        "Pan-seared Atlantic salmon with lemon-dill sauce, served with roasted fingerling potatoes and seasonal vegetables.",
        "Hand-rolled gnocchi in a brown butter sage sauce, topped with shaved Parmesan and toasted pine nuts.",
        "Grass-fed beef tenderloin with red wine reduction, accompanied by truffle mashed potatoes and glazed baby carrots.",
        "House-made tiramisu featuring espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa powder."
      ]
    }
  ]
};

export const dishTemplate: TemplateData = {
  id: uuidv4(),
  name: "dish",
  category: "Food",
  description: "Names of various dishes and prepared foods",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common dish names from various cuisines",
      contextHint: "Generate names of dishes from various cuisines",
      exampleValues: [
        "Spaghetti Carbonara",
        "Chicken Tikka Masala",
        "Caesar Salad",
        "Beef Stroganoff",
        "Pad Thai",
        "Fish and Chips"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian",
      type: "Category",
      description: "Italian dishes",
      contextHint: "Generate names of Italian dishes",
      exampleValues: [
        "Margherita Pizza",
        "Lasagna Bolognese",
        "Risotto ai Funghi",
        "Fettuccine Alfredo",
        "Tiramisu",
        "Osso Buco"
      ]
    },
    {
      id: uuidv4(),
      name: "Asian",
      type: "Category",
      description: "Asian dishes",
      contextHint: "Generate names of Asian dishes",
      exampleValues: [
        "Kung Pao Chicken",
        "Sushi Platter",
        "Beef Pho",
        "Pad Thai",
        "Butter Chicken",
        "Bibimbap"
      ]
    },
    {
      id: uuidv4(),
      name: "Dessert",
      type: "Category",
      description: "Dessert dishes",
      contextHint: "Generate names of dessert dishes",
      exampleValues: [
        "Chocolate Mousse",
        "Apple Pie",
        "Crème Brûlée",
        "Cheesecake",
        "Tiramisu",
        "Baklava"
      ]
    },
    {
      id: uuidv4(),
      name: "Breakfast",
      type: "Category",
      description: "Breakfast dishes",
      contextHint: "Generate names of breakfast dishes",
      exampleValues: [
        "Belgian Waffles",
        "Eggs Benedict",
        "Breakfast Burrito",
        "French Toast",
        "Avocado Toast",
        "Frittata"
      ]
    }
  ]
};

export const ethnicCategoryTemplate: TemplateData = {
  id: uuidv4(),
  name: "ethnicCategory",
  category: "Food",
  description: "Categories of ethnic or regional cuisines",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common ethnic cuisine categories",
      contextHint: "Generate names of ethnic cuisine categories",
      exampleValues: [
        "Italian",
        "Mexican",
        "Chinese",
        "Indian",
        "Japanese",
        "French",
        "Thai",
        "Mediterranean"
      ]
    },
    {
      id: uuidv4(),
      name: "Asian",
      type: "Category",
      description: "Asian cuisine categories",
      contextHint: "Generate names of Asian cuisine categories",
      exampleValues: [
        "Chinese",
        "Japanese",
        "Thai",
        "Vietnamese",
        "Korean",
        "Indian",
        "Malaysian",
        "Filipino"
      ]
    },
    {
      id: uuidv4(),
      name: "European",
      type: "Category",
      description: "European cuisine categories",
      contextHint: "Generate names of European cuisine categories",
      exampleValues: [
        "Italian",
        "French",
        "Spanish",
        "Greek",
        "German",
        "British",
        "Portuguese",
        "Swedish"
      ]
    },
    {
      id: uuidv4(),
      name: "American",
      type: "Category",
      description: "American regional cuisine categories",
      contextHint: "Generate names of American regional cuisine categories",
      exampleValues: [
        "Southern",
        "Cajun",
        "Tex-Mex",
        "New England",
        "Californian",
        "Midwestern",
        "Hawaiian",
        "Creole"
      ]
    }
  ]
};

export const fruitTemplate: TemplateData = {
  id: uuidv4(),
  name: "fruit",
  category: "Food",
  description: "Names of fruits",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common fruit names",
      contextHint: "Generate names of common fruits",
      exampleValues: [
        "Apple",
        "Banana",
        "Orange",
        "Strawberry",
        "Grape",
        "Watermelon",
        "Pineapple",
        "Mango"
      ]
    },
    {
      id: uuidv4(),
      name: "Tropical",
      type: "Category",
      description: "Tropical fruit names",
      contextHint: "Generate names of tropical fruits",
      exampleValues: [
        "Mango",
        "Pineapple",
        "Papaya",
        "Passion Fruit",
        "Guava",
        "Lychee",
        "Dragon Fruit",
        "Jackfruit"
      ]
    },
    {
      id: uuidv4(),
      name: "Berries",
      type: "Category",
      description: "Berry names",
      contextHint: "Generate names of berries",
      exampleValues: [
        "Strawberry",
        "Blueberry",
        "Raspberry",
        "Blackberry",
        "Cranberry",
        "Gooseberry",
        "Elderberry",
        "Boysenberry"
      ]
    },
    {
      id: uuidv4(),
      name: "Citrus",
      type: "Category",
      description: "Citrus fruit names",
      contextHint: "Generate names of citrus fruits",
      exampleValues: [
        "Orange",
        "Lemon",
        "Lime",
        "Grapefruit",
        "Tangerine",
        "Mandarin",
        "Kumquat",
        "Pomelo"
      ]
    }
  ]
};

export const ingredientTemplate: TemplateData = {
  id: uuidv4(),
  name: "ingredient",
  category: "Food",
  description: "Food ingredients used in cooking",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common cooking ingredients",
      contextHint: "Generate names of common cooking ingredients",
      exampleValues: [
        "Olive Oil",
        "Garlic",
        "Salt",
        "Onion",
        "Flour",
        "Butter",
        "Egg",
        "Milk"
      ]
    },
    {
      id: uuidv4(),
      name: "Baking",
      type: "Category",
      description: "Baking ingredients",
      contextHint: "Generate names of baking ingredients",
      exampleValues: [
        "Flour",
        "Sugar",
        "Baking Powder",
        "Butter",
        "Eggs",
        "Vanilla Extract",
        "Cocoa Powder",
        "Cinnamon"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian",
      type: "Category",
      description: "Italian cooking ingredients",
      contextHint: "Generate names of Italian cooking ingredients",
      exampleValues: [
        "Olive Oil",
        "Garlic",
        "Basil",
        "Parmesan Cheese",
        "Tomatoes",
        "Pine Nuts",
        "Balsamic Vinegar",
        "Pancetta"
      ]
    },
    {
      id: uuidv4(),
      name: "Asian",
      type: "Category",
      description: "Asian cooking ingredients",
      contextHint: "Generate names of Asian cooking ingredients",
      exampleValues: [
        "Soy Sauce",
        "Ginger",
        "Sesame Oil",
        "Rice Vinegar",
        "Fish Sauce",
        "Lemongrass",
        "Coconut Milk",
        "Miso Paste"
      ]
    }
  ]
};

export const meatTemplate: TemplateData = {
  id: uuidv4(),
  name: "meat",
  category: "Food",
  description: "Types of meat used in cooking",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common types of meat",
      contextHint: "Generate names of common meat types",
      exampleValues: [
        "Chicken",
        "Beef",
        "Pork",
        "Lamb",
        "Turkey",
        "Duck",
        "Veal",
        "Fish"
      ]
    },
    {
      id: uuidv4(),
      name: "Beef",
      type: "Category",
      description: "Beef cuts and products",
      contextHint: "Generate names of beef cuts and products",
      exampleValues: [
        "Ribeye",
        "Sirloin",
        "Filet Mignon",
        "Brisket",
        "Ground Beef",
        "Short Rib",
        "Flank Steak",
        "Chuck Roast"
      ]
    },
    {
      id: uuidv4(),
      name: "Poultry",
      type: "Category",
      description: "Poultry types and cuts",
      contextHint: "Generate names of poultry types and cuts",
      exampleValues: [
        "Chicken Breast",
        "Chicken Thigh",
        "Turkey Breast",
        "Duck Leg",
        "Chicken Wings",
        "Turkey Drumstick",
        "Quail",
        "Pheasant"
      ]
    },
    {
      id: uuidv4(),
      name: "Seafood",
      type: "Category",
      description: "Seafood varieties",
      contextHint: "Generate names of seafood varieties",
      exampleValues: [
        "Salmon",
        "Tuna",
        "Shrimp",
        "Cod",
        "Crab",
        "Lobster",
        "Scallops",
        "Mussels"
      ]
    },
    {
      id: uuidv4(),
      name: "Processed",
      type: "Category",
      description: "Processed meat products",
      contextHint: "Generate names of processed meat products",
      exampleValues: [
        "Bacon",
        "Salami",
        "Ham",
        "Sausage",
        "Pepperoni",
        "Prosciutto",
        "Chorizo",
        "Pastrami"
      ]
    }
  ]
};

export const spiceTemplate: TemplateData = {
  id: uuidv4(),
  name: "spice",
  category: "Food",
  description: "Spices used in cooking",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common cooking spices",
      contextHint: "Generate names of common cooking spices",
      exampleValues: [
        "Black Pepper",
        "Cinnamon",
        "Cumin",
        "Paprika",
        "Oregano",
        "Thyme",
        "Basil",
        "Garlic Powder"
      ]
    },
    {
      id: uuidv4(),
      name: "Indian",
      type: "Category",
      description: "Indian spices",
      contextHint: "Generate names of Indian spices",
      exampleValues: [
        "Turmeric",
        "Cumin",
        "Coriander",
        "Cardamom",
        "Garam Masala",
        "Fenugreek",
        "Mustard Seeds",
        "Asafoetida"
      ]
    },
    {
      id: uuidv4(),
      name: "Mediterranean",
      type: "Category",
      description: "Mediterranean spices",
      contextHint: "Generate names of Mediterranean spices",
      exampleValues: [
        "Oregano",
        "Basil",
        "Rosemary",
        "Thyme",
        "Sage",
        "Marjoram",
        "Bay Leaf",
        "Fennel Seeds"
      ]
    },
    {
      id: uuidv4(),
      name: "Hot",
      type: "Category",
      description: "Hot and spicy spices",
      contextHint: "Generate names of hot and spicy spices",
      exampleValues: [
        "Cayenne Pepper",
        "Chili Powder",
        "Red Pepper Flakes",
        "Habanero Powder",
        "Ghost Pepper",
        "Smoked Paprika",
        "Black Pepper",
        "Wasabi"
      ]
    }
  ]
};

export const vegetableTemplate: TemplateData = {
  id: uuidv4(),
  name: "vegetable",
  category: "Food",
  description: "Vegetables used in cooking",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common vegetables",
      contextHint: "Generate names of common vegetables",
      exampleValues: [
        "Carrot",
        "Broccoli",
        "Onion",
        "Potato",
        "Tomato",
        "Cucumber",
        "Bell Pepper",
        "Lettuce"
      ]
    },
    {
      id: uuidv4(),
      name: "Root",
      type: "Category",
      description: "Root vegetables",
      contextHint: "Generate names of root vegetables",
      exampleValues: [
        "Potato",
        "Carrot",
        "Onion",
        "Radish",
        "Sweet Potato",
        "Turnip",
        "Beet",
        "Garlic"
      ]
    },
    {
      id: uuidv4(),
      name: "Leafy",
      type: "Category",
      description: "Leafy green vegetables",
      contextHint: "Generate names of leafy green vegetables",
      exampleValues: [
        "Spinach",
        "Kale",
        "Lettuce",
        "Swiss Chard",
        "Cabbage",
        "Arugula",
        "Collard Greens",
        "Bok Choy"
      ]
    },
    {
      id: uuidv4(),
      name: "Cruciferous",
      type: "Category",
      description: "Cruciferous vegetables",
      contextHint: "Generate names of cruciferous vegetables",
      exampleValues: [
        "Broccoli",
        "Cauliflower",
        "Brussels Sprouts",
        "Cabbage",
        "Kale",
        "Radish",
        "Bok Choy",
        "Kohlrabi"
      ]
    },
    {
      id: uuidv4(),
      name: "Exotic",
      type: "Category",
      description: "Exotic or uncommon vegetables",
      contextHint: "Generate names of exotic or uncommon vegetables",
      exampleValues: [
        "Romanesco",
        "Fiddlehead Fern",
        "Sunchoke",
        "Lotus Root",
        "Jicama",
        "Kohlrabi",
        "Purple Yam",
        "Celeriac"
      ]
    }
  ]
};