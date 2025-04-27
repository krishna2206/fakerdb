import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const bearTemplate: TemplateData = {
  id: "template_bear",
  name: "Bear",
  category: "Animal",
  description: "Generates bear names and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Bear Species",
      type: "Category",
      description: "Generates a random bear species",
      contextHint: "Generate a random bear species name",
      exampleValues: [
        "Polar Bear", 
        "Brown Bear", 
        "Grizzly Bear", 
        "American Black Bear",
        "Asiatic Black Bear"
      ]
    }
  ]
};


export const birdTemplate: TemplateData = {
  id: "template_bird",
  name: "Bird",
  category: "Animal",
  description: "Generates bird names and species",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Bird Species",
      type: "Category",
      description: "Generates a random bird species",
      contextHint: "Generate a random bird species name",
      exampleValues: [
        "Robin", 
        "Eagle", 
        "Sparrow", 
        "Cardinal",
        "Blue Jay"
      ]
    }
  ]
};


export const catTemplate: TemplateData = {
  id: "template_cat",
  name: "Cat",
  category: "Animal",
  description: "Generates cat breeds and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Cat Breed",
      type: "Category",
      description: "Generates a random cat breed",
      contextHint: "Generate a random cat breed name",
      exampleValues: [
        "Siamese", 
        "Persian", 
        "Maine Coon", 
        "Bengal",
        "Scottish Fold"
      ]
    }
  ]
};


export const cetaceanTemplate: TemplateData = {
  id: "template_cetacean",
  name: "Cetacean",
  category: "Animal",
  description: "Generates cetacean species (whales, dolphins, etc.)",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Cetacean Species",
      type: "Category",
      description: "Generates a random cetacean species",
      contextHint: "Generate a random cetacean species name (whales, dolphins, porpoises)",
      exampleValues: [
        "Blue Whale", 
        "Bottlenose Dolphin", 
        "Orca", 
        "Narwhal",
        "Beluga Whale"
      ]
    }
  ]
};


export const cowTemplate: TemplateData = {
  id: "template_cow",
  name: "Cow",
  category: "Animal",
  description: "Generates cow breeds and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Cow Breed",
      type: "Category",
      description: "Generates a random cow breed",
      contextHint: "Generate a random cow breed name",
      exampleValues: [
        "Holstein", 
        "Angus", 
        "Hereford", 
        "Jersey",
        "Simmental"
      ]
    }
  ]
};


export const crocodiliaTemplate: TemplateData = {
  id: "template_crocodilia",
  name: "Crocodilia",
  category: "Animal",
  description: "Generates crocodilian species (crocodiles, alligators, etc.)",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Crocodilia Species",
      type: "Category",
      description: "Generates a random crocodilian species",
      contextHint: "Generate a random crocodilian species name",
      exampleValues: [
        "American Alligator", 
        "Nile Crocodile", 
        "Saltwater Crocodile", 
        "Gharial",
        "Caiman"
      ]
    }
  ]
};


export const dogTemplate: TemplateData = {
  id: "template_dog",
  name: "Dog",
  category: "Animal",
  description: "Generates dog breeds and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Dog Breed",
      type: "Category",
      description: "Generates a random dog breed",
      contextHint: "Generate a random dog breed name",
      exampleValues: [
        "Labrador Retriever", 
        "German Shepherd", 
        "Golden Retriever", 
        "Bulldog",
        "Poodle"
      ]
    }
  ]
};


export const fishTemplate: TemplateData = {
  id: "template_fish",
  name: "Fish",
  category: "Animal",
  description: "Generates fish species and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Fish Species",
      type: "Category",
      description: "Generates a random fish species",
      contextHint: "Generate a random fish species name",
      exampleValues: [
        "Salmon", 
        "Tuna", 
        "Trout", 
        "Bass",
        "Clownfish"
      ]
    }
  ]
};


export const horseTemplate: TemplateData = {
  id: "template_horse",
  name: "Horse",
  category: "Animal",
  description: "Generates horse breeds and types",
  fieldType: "VARCHAR", 
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Horse Breed",
      type: "Category",
      description: "Generates a random horse breed",
      contextHint: "Generate a random horse breed name",
      exampleValues: [
        "Arabian", 
        "Thoroughbred", 
        "Quarter Horse", 
        "Appaloosa",
        "Clydesdale"
      ]
    }
  ]
};


export const insectTemplate: TemplateData = {
  id: "template_insect",
  name: "Insect",
  category: "Animal",
  description: "Generates insect species and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Insect Species",
      type: "Category",
      description: "Generates a random insect species",
      contextHint: "Generate a random insect species name",
      exampleValues: [
        "Butterfly", 
        "Beetle", 
        "Ant", 
        "Dragonfly",
        "Grasshopper"
      ]
    }
  ]
};


export const lionTemplate: TemplateData = {
  id: "template_lion",
  name: "Lion",
  category: "Animal",
  description: "Generates lion types and subspecies",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Lion Type",
      type: "Category",
      description: "Generates a random lion type or description",
      contextHint: "Generate a random lion subspecies or description",
      exampleValues: [
        "African Lion", 
        "Asiatic Lion", 
        "Barbary Lion", 
        "White Lion",
        "Transvaal Lion"
      ]
    }
  ]
};


export const petNameTemplate: TemplateData = {
  id: "template_pet_name",
  name: "Pet Name",
  category: "Animal",
  description: "Generates popular pet names",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Dog Name",
      type: "Category",
      description: "Generates a popular dog name",
      contextHint: "Generate a popular pet dog name",
      exampleValues: [
        "Max", 
        "Bella", 
        "Charlie", 
        "Luna",
        "Cooper"
      ]
    },
    {
      id: uuidv4(),
      name: "Cat Name",
      type: "Category",
      description: "Generates a popular cat name",
      contextHint: "Generate a popular pet cat name",
      exampleValues: [
        "Oliver", 
        "Luna", 
        "Leo", 
        "Bella",
        "Milo"
      ]
    },
    {
      id: uuidv4(),
      name: "Exotic Pet Name",
      type: "Category",
      description: "Generates a name for an exotic pet",
      contextHint: "Generate a name for an exotic pet like a bird, reptile, or small mammal",
      exampleValues: [
        "Spike", 
        "Rio", 
        "Nibbles", 
        "Zeus",
        "Coco"
      ]
    }
  ]
};


export const rabbitTemplate: TemplateData = {
  id: "template_rabbit",
  name: "Rabbit",
  category: "Animal",
  description: "Generates rabbit breeds and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Rabbit Breed",
      type: "Category",
      description: "Generates a random rabbit breed",
      contextHint: "Generate a random rabbit breed name",
      exampleValues: [
        "Holland Lop", 
        "Dutch", 
        "Mini Rex", 
        "Angora",
        "Flemish Giant"
      ]
    }
  ]
};


export const rodentTemplate: TemplateData = {
  id: "template_rodent",
  name: "Rodent",
  category: "Animal",
  description: "Generates rodent species and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Rodent Species",
      type: "Category",
      description: "Generates a random rodent species",
      contextHint: "Generate a random rodent species name",
      exampleValues: [
        "Mouse", 
        "Rat", 
        "Hamster", 
        "Guinea Pig",
        "Chinchilla"
      ]
    }
  ]
};


export const snakeTemplate: TemplateData = {
  id: "template_snake",
  name: "Snake",
  category: "Animal",
  description: "Generates snake species and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Snake Species",
      type: "Category",
      description: "Generates a random snake species",
      contextHint: "Generate a random snake species name",
      exampleValues: [
        "Ball Python", 
        "Corn Snake", 
        "King Cobra", 
        "Rattlesnake",
        "Boa Constrictor"
      ]
    }
  ]
};


export const animalTypeTemplate: TemplateData = {
  id: "template_animal_type",
  name: "Animal Type",
  category: "Animal",
  description: "Generates general animal types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "General Type",
      type: "Category",
      description: "Generates a general animal type",
      contextHint: "Generate a random animal type or class",
      exampleValues: [
        "Mammal", 
        "Bird", 
        "Reptile", 
        "Amphibian",
        "Fish"
      ]
    },
    {
      id: uuidv4(),
      name: "Farm Animal",
      type: "Category",
      description: "Generates a farm animal type",
      contextHint: "Generate a random farm animal type",
      exampleValues: [
        "Cow", 
        "Pig", 
        "Chicken", 
        "Horse",
        "Sheep"
      ]
    },
    {
      id: uuidv4(),
      name: "Wild Animal",
      type: "Category",
      description: "Generates a wild animal type",
      contextHint: "Generate a random wild animal type",
      exampleValues: [
        "Lion", 
        "Tiger", 
        "Elephant", 
        "Wolf",
        "Giraffe"
      ]
    },
    {
      id: uuidv4(),
      name: "Pet Type",
      type: "Category",
      description: "Generates a common pet type",
      contextHint: "Generate a random common pet type",
      exampleValues: [
        "Dog", 
        "Cat", 
        "Rabbit", 
        "Hamster",
        "Fish"
      ]
    }
  ]
};