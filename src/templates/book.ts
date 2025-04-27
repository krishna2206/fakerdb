import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const authorTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Author",
  category: "Book",
  description: "Generates realistic book author names",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard book author names",
      contextHint: "Generate realistic author names for books",
      exampleValues: [
        "J.K. Rowling",
        "Stephen King",
        "James Patterson",
        "Margaret Atwood",
        "Neil Gaiman"
      ]
    },
    {
      id: uuidv4(),
      name: "Classic Literature",
      type: "Genre",
      description: "Authors of classic literature",
      contextHint: "Generate names of classic literature authors",
      exampleValues: [
        "Charles Dickens",
        "Jane Austen",
        "Leo Tolstoy",
        "Victor Hugo",
        "F. Scott Fitzgerald"
      ]
    },
    {
      id: uuidv4(),
      name: "Science Fiction",
      type: "Genre",
      description: "Science fiction authors",
      contextHint: "Generate names of science fiction authors",
      exampleValues: [
        "Isaac Asimov",
        "Arthur C. Clarke",
        "Ursula K. Le Guin",
        "Philip K. Dick",
        "Octavia Butler"
      ]
    }
  ]
};


export const formatTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Format",
  category: "Book",
  description: "Generates book format types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common book formats",
      contextHint: "Generate book format types",
      exampleValues: [
        "Hardcover",
        "Paperback",
        "eBook",
        "Audiobook",
        "Large Print"
      ]
    },
    {
      id: uuidv4(),
      name: "Physical",
      type: "Format",
      description: "Physical book formats with details",
      contextHint: "Generate physical book format types with specifications",
      exampleValues: [
        "Hardcover (6.5\" x 9.5\")",
        "Trade Paperback (5.5\" x 8.5\")",
        "Mass Market Paperback (4.25\" x 6.75\")",
        "Library Binding",
        "Spiral-bound"
      ]
    },
    {
      id: uuidv4(),
      name: "Digital",
      type: "Format",
      description: "Digital book formats",
      contextHint: "Generate digital book format types",
      exampleValues: [
        "EPUB",
        "MOBI",
        "PDF",
        "AZW (Kindle)",
        "Digital Audiobook (MP3)"
      ]
    }
  ]
};


export const genreTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Genre",
  category: "Book",
  description: "Generates book genres",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common book genres",
      contextHint: "Generate common book genres",
      exampleValues: [
        "Mystery",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Thriller"
      ]
    },
    {
      id: uuidv4(),
      name: "Fiction",
      type: "Category",
      description: "Fiction book genres",
      contextHint: "Generate fiction book genres",
      exampleValues: [
        "Literary Fiction",
        "Historical Fiction",
        "Dystopian",
        "Coming-of-age",
        "Magical Realism"
      ]
    },
    {
      id: uuidv4(),
      name: "Non-fiction",
      type: "Category",
      description: "Non-fiction book genres",
      contextHint: "Generate non-fiction book genres",
      exampleValues: [
        "Biography",
        "Memoir",
        "Self-help",
        "True Crime",
        "History"
      ]
    }
  ]
};


export const publisherTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Publisher",
  category: "Book",
  description: "Generates book publisher names",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common book publishers",
      contextHint: "Generate book publisher names",
      exampleValues: [
        "Penguin Random House",
        "HarperCollins",
        "Simon & Schuster",
        "Macmillan Publishers",
        "Hachette Book Group"
      ]
    },
    {
      id: uuidv4(),
      name: "Academic",
      type: "Category",
      description: "Academic publishers",
      contextHint: "Generate academic publisher names",
      exampleValues: [
        "Oxford University Press",
        "Cambridge University Press",
        "MIT Press",
        "Princeton University Press",
        "Elsevier"
      ]
    },
    {
      id: uuidv4(),
      name: "Independent",
      type: "Category",
      description: "Independent publishers",
      contextHint: "Generate independent publisher names",
      exampleValues: [
        "Graywolf Press",
        "Copper Canyon Press",
        "Coffee House Press",
        "McSweeney's",
        "Akashic Books"
      ]
    }
  ]
};


export const seriesTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Series",
  category: "Book",
  description: "Generates book series names",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Popular book series",
      contextHint: "Generate book series names",
      exampleValues: [
        "Harry Potter",
        "A Song of Ice and Fire",
        "The Lord of the Rings",
        "Discworld",
        "The Hunger Games"
      ]
    },
    {
      id: uuidv4(),
      name: "Fantasy",
      type: "Genre",
      description: "Fantasy book series",
      contextHint: "Generate fantasy book series names",
      exampleValues: [
        "The Wheel of Time",
        "The Chronicles of Narnia",
        "Earthsea",
        "The Kingkiller Chronicle",
        "Mistborn"
      ]
    },
    {
      id: uuidv4(),
      name: "Mystery",
      type: "Genre",
      description: "Mystery book series",
      contextHint: "Generate mystery book series names",
      exampleValues: [
        "Sherlock Holmes",
        "Jack Reacher",
        "Inspector Morse",
        "Alex Cross",
        "Millennium"
      ]
    }
  ]
};


export const titleTemplate: TemplateData = {
  id: uuidv4(),
  name: "Book Title",
  category: "Book",
  description: "Generates book titles",
  fieldType: "VARCHAR",
  defaultLength: 150,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic book titles",
      contextHint: "Generate realistic book titles",
      exampleValues: [
        "The Silent Observer",
        "Beyond the Horizon",
        "Whispers in the Dark",
        "The Last Journey",
        "Echoes of Tomorrow"
      ]
    },
    {
      id: uuidv4(),
      name: "Fantasy",
      type: "Genre",
      description: "Fantasy book titles",
      contextHint: "Generate fantasy book titles",
      exampleValues: [
        "The Crown of Eternal Flame",
        "Shadows of the Ancient Kingdom",
        "The Lost Spellbook",
        "Dragon's Blood Legacy",
        "The Enchanted Throne"
      ]
    },
    {
      id: uuidv4(),
      name: "Romance",
      type: "Genre",
      description: "Romance book titles",
      contextHint: "Generate romance book titles",
      exampleValues: [
        "Love Under the Starlit Sky",
        "Heart's Desire",
        "The Unexpected Match",
        "Summer of Second Chances",
        "When We First Met"
      ]
    },
    {
      id: uuidv4(),
      name: "Science Fiction",
      type: "Genre",
      description: "Science fiction book titles",
      contextHint: "Generate science fiction book titles",
      exampleValues: [
        "The Quantum Paradox",
        "Echoes from the Void",
        "The Last Colony",
        "Synthetic Dreams",
        "Beyond the Event Horizon"
      ]
    }
  ]
};