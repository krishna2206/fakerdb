import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const linesTemplate: TemplateData = {
  id: uuidv4(),
  name: "Lines",
  category: "Lorem",
  description: "Generate multiple lines of Lorem Ipsum text",
  fieldType: "TEXT",
  defaultLength: 500,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum lines",
      contextHint: "Generate realistic Lorem Ipsum lines of text",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui.",
        "Suspendisse potenti. Sed eget risus ac dolor blandit posuere.",
        "Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec."
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Length",
      description: "Shorter Lorem Ipsum lines",
      contextHint: "Generate short Lorem Ipsum lines",
      exampleValues: [
        "Lorem ipsum dolor sit amet.",
        "Nullam fringilla purus non.",
        "Suspendisse potenti sed.",
        "Vivamus vulputate eros."
      ]
    },
    {
      id: uuidv4(),
      name: "Long",
      type: "Length",
      description: "Longer Lorem Ipsum lines",
      contextHint: "Generate long Lorem Ipsum lines",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ]
    }
  ]
};

export const paragraphTemplate: TemplateData = {
  id: uuidv4(),
  name: "Paragraph",
  category: "Lorem",
  description: "Generate a single paragraph of Lorem Ipsum text",
  fieldType: "TEXT",
  defaultLength: 500,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum paragraph",
      contextHint: "Generate a realistic Lorem Ipsum paragraph",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus. Suspendisse potenti. Sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec. Cras iaculis leo in lacus placerat, ut pharetra ipsum aliquet.",
        "Fusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi. Duis et nulla ut nisi faucibus consequat ac sed neque. Nulla vitae sapien sed nunc commodo consequat. Morbi quis ex et lorem vehicula iaculis.",
        "Phasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum. Donec pretium ex vel nulla pretium, vitae pellentesque diam finibus. Morbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget."
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Length",
      description: "Shorter Lorem Ipsum paragraph",
      contextHint: "Generate a short Lorem Ipsum paragraph",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui.",
        "Fusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin.",
        "Phasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum."
      ]
    },
    {
      id: uuidv4(),
      name: "Long",
      type: "Length",
      description: "Longer Lorem Ipsum paragraph",
      contextHint: "Generate a long Lorem Ipsum paragraph",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus. Suspendisse potenti. Sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec. Cras iaculis leo in lacus placerat, ut pharetra ipsum aliquet. Ut volutpat sed dolor ut lobortis. Vestibulum maximus magna eu facilisis cursus. Integer id nulla vel risus ultrices convallis. Suspendisse sit amet enim urna. Sed consectetur lacinia odio, ac commodo sapien sodales blandit.",
        "Fusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi. Duis et nulla ut nisi faucibus consequat ac sed neque. Nulla vitae sapien sed nunc commodo consequat. Morbi quis ex et lorem vehicula iaculis. Etiam blandit pulvinar quam, nec vestibulum mi pulvinar a. Donec pretium, lacus in volutpat imperdiet, nisl justo bibendum tellus, vel vulputate odio lacus eu tellus. Integer facilisis hendrerit purus, et rhoncus quam lacinia quis.",
        "Phasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum. Donec pretium ex vel nulla pretium, vitae pellentesque diam finibus. Morbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget. Praesent fringilla justo eget turpis varius, sit amet elementum dolor malesuada. Praesent rhoncus facilisis molestie. Pellentesque et scelerisque tortor, eu tempor urna. Sed a condimentum odio. Etiam placerat augue odio, id viverra eros dapibus ac."
      ]
    }
  ]
};

export const paragraphsTemplate: TemplateData = {
  id: uuidv4(),
  name: "Paragraphs",
  category: "Lorem",
  description: "Generate multiple paragraphs of Lorem Ipsum text",
  fieldType: "TEXT",
  defaultLength: 1000,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum paragraphs",
      contextHint: "Generate multiple realistic Lorem Ipsum paragraphs",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus. Suspendisse potenti. Sed eget risus ac dolor blandit posuere.\n\nFusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi.\n\nPhasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum. Donec pretium ex vel nulla pretium, vitae pellentesque diam finibus.",
        "Morbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget. Praesent fringilla justo eget turpis varius, sit amet elementum dolor malesuada.\n\nPraesent rhoncus facilisis molestie. Pellentesque et scelerisque tortor, eu tempor urna. Sed a condimentum odio. Etiam placerat augue odio, id viverra eros dapibus ac.\n\nProin non dui purus. Aliquam erat volutpat. Vivamus scelerisque auctor enim, nec imperdiet nibh. Mauris semper augue et aliquet elementum."
      ]
    },
    {
      id: uuidv4(),
      name: "Few",
      type: "Quantity",
      description: "Fewer Lorem Ipsum paragraphs (2-3)",
      contextHint: "Generate 2-3 Lorem Ipsum paragraphs",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus.\n\nFusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi.",
        "Phasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum.\n\nMorbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget."
      ]
    },
    {
      id: uuidv4(),
      name: "Many",
      type: "Quantity",
      description: "More Lorem Ipsum paragraphs (4-6)",
      contextHint: "Generate 4-6 Lorem Ipsum paragraphs",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus.\n\nFusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi.\n\nPhasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum.\n\nMorbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget. Praesent fringilla justo eget turpis varius, sit amet elementum dolor malesuada.\n\nPraesent rhoncus facilisis molestie. Pellentesque et scelerisque tortor, eu tempor urna. Sed a condimentum odio."
      ]
    }
  ]
};

export const sentenceTemplate: TemplateData = {
  id: uuidv4(),
  name: "Sentence",
  category: "Lorem",
  description: "Generate a single sentence of Lorem Ipsum text",
  fieldType: "TEXT",
  defaultLength: 150,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum sentence",
      contextHint: "Generate a realistic Lorem Ipsum sentence",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui.",
        "Suspendisse potenti sed eget risus ac dolor blandit posuere.",
        "Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec."
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Length",
      description: "Shorter Lorem Ipsum sentence",
      contextHint: "Generate a short Lorem Ipsum sentence",
      exampleValues: [
        "Lorem ipsum dolor sit amet.",
        "Nullam fringilla purus non.",
        "Suspendisse potenti sed.",
        "Vivamus vulputate eros."
      ]
    },
    {
      id: uuidv4(),
      name: "Long",
      type: "Length",
      description: "Longer Lorem Ipsum sentence",
      contextHint: "Generate a long Lorem Ipsum sentence",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ]
    }
  ]
};

export const sentencesTemplate: TemplateData = {
  id: uuidv4(),
  name: "Sentences",
  category: "Lorem",
  description: "Generate multiple sentences of Lorem Ipsum text",
  fieldType: "TEXT",
  defaultLength: 400,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum sentences",
      contextHint: "Generate multiple realistic Lorem Ipsum sentences",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui. Suspendisse potenti sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec.",
        "Cras iaculis leo in lacus placerat. Ut volutpat sed dolor ut lobortis. Vestibulum maximus magna eu facilisis cursus. Integer id nulla vel risus ultrices convallis."
      ]
    },
    {
      id: uuidv4(),
      name: "Few",
      type: "Quantity",
      description: "Fewer Lorem Ipsum sentences (2-3)",
      contextHint: "Generate 2-3 Lorem Ipsum sentences",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui.",
        "Suspendisse potenti sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus."
      ]
    },
    {
      id: uuidv4(),
      name: "Many",
      type: "Quantity",
      description: "More Lorem Ipsum sentences (5-8)",
      contextHint: "Generate 5-8 Lorem Ipsum sentences",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui. Suspendisse potenti sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec. Cras iaculis leo in lacus placerat. Ut volutpat sed dolor ut lobortis. Vestibulum maximus magna eu facilisis cursus.",
        "Integer id nulla vel risus ultrices convallis. Suspendisse sit amet enim urna. Sed consectetur lacinia odio, ac commodo sapien sodales blandit. Fusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin."
      ]
    }
  ]
};

export const slugTemplate: TemplateData = {
  id: uuidv4(),
  name: "Slug",
  category: "Lorem",
  description: "Generate a URL-friendly slug from Lorem Ipsum text",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum slug",
      contextHint: "Generate a Lorem Ipsum based URL slug",
      exampleValues: [
        "lorem-ipsum-dolor",
        "consectetur-adipiscing",
        "nullam-fringilla",
        "suspendisse-potenti"
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Length",
      description: "Shorter Lorem Ipsum slug (1-2 words)",
      contextHint: "Generate a short Lorem Ipsum slug",
      exampleValues: [
        "lorem",
        "ipsum",
        "dolor",
        "consectetur"
      ]
    },
    {
      id: uuidv4(),
      name: "Long",
      type: "Length",
      description: "Longer Lorem Ipsum slug (4+ words)",
      contextHint: "Generate a long Lorem Ipsum slug",
      exampleValues: [
        "lorem-ipsum-dolor-sit-amet",
        "consectetur-adipiscing-elit-nullam",
        "nullam-fringilla-purus-non-condimentum",
        "suspendisse-potenti-sed-eget-risus"
      ]
    }
  ]
};

export const textTemplate: TemplateData = {
  id: uuidv4(),
  name: "Text",
  category: "Lorem",
  description: "Generate Lorem Ipsum text of varying length",
  fieldType: "TEXT",
  defaultLength: 500,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum text",
      contextHint: "Generate Lorem Ipsum text of medium length",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus. Suspendisse potenti. Sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec.",
        "Cras iaculis leo in lacus placerat, ut pharetra ipsum aliquet. Ut volutpat sed dolor ut lobortis. Vestibulum maximus magna eu facilisis cursus. Integer id nulla vel risus ultrices convallis. Suspendisse sit amet enim urna."
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Length",
      description: "Shorter Lorem Ipsum text",
      contextHint: "Generate short Lorem Ipsum text",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui.",
        "Suspendisse potenti. Sed eget risus ac dolor blandit posuere."
      ]
    },
    {
      id: uuidv4(),
      name: "Long",
      type: "Length",
      description: "Longer Lorem Ipsum text",
      contextHint: "Generate long Lorem Ipsum text",
      exampleValues: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, purus non condimentum varius, nulla nisi venenatis dui, vel tincidunt felis nulla sit amet metus. Suspendisse potenti. Sed eget risus ac dolor blandit posuere. Vivamus vulputate eros lacus, vel tincidunt turpis tincidunt nec. Cras iaculis leo in lacus placerat, ut pharetra ipsum aliquet. Ut volutpat sed dolor ut lobortis. Vestibulum maximus magna eu facilisis cursus. Integer id nulla vel risus ultrices convallis. Suspendisse sit amet enim urna. Sed consectetur lacinia odio, ac commodo sapien sodales blandit. Fusce auctor urna et diam sagittis, ac euismod sem varius. Curabitur a porta velit. Donec efficitur, ipsum quis rhoncus sollicitudin, mi nibh laoreet eros, at placerat nulla quam ac nisi.",
        "Duis et nulla ut nisi faucibus consequat ac sed neque. Nulla vitae sapien sed nunc commodo consequat. Morbi quis ex et lorem vehicula iaculis. Etiam blandit pulvinar quam, nec vestibulum mi pulvinar a. Donec pretium, lacus in volutpat imperdiet, nisl justo bibendum tellus, vel vulputate odio lacus eu tellus. Integer facilisis hendrerit purus, et rhoncus quam lacinia quis. Phasellus sit amet fermentum enim. Aenean eleifend risus eget massa placerat, nec semper mauris condimentum. Donec pretium ex vel nulla pretium, vitae pellentesque diam finibus. Morbi condimentum risus sed elit dictum elementum. Curabitur posuere fringilla ante, nec molestie sapien consectetur eget. Praesent fringilla justo eget turpis varius, sit amet elementum dolor malesuada."
      ]
    }
  ]
};

export const wordTemplate: TemplateData = {
  id: uuidv4(),
  name: "Word",
  category: "Lorem",
  description: "Generate a single Lorem Ipsum word",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum word",
      contextHint: "Generate a single Lorem Ipsum word",
      exampleValues: [
        "Lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing"
      ]
    }
  ]
};

export const wordsTemplate: TemplateData = {
  id: uuidv4(),
  name: "Words",
  category: "Lorem",
  description: "Generate multiple Lorem Ipsum words",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Lorem Ipsum words",
      contextHint: "Generate multiple Lorem Ipsum words",
      exampleValues: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "nullam fringilla purus non",
        "suspendisse potenti sed eget"
      ]
    },
    {
      id: uuidv4(),
      name: "Few",
      type: "Quantity",
      description: "Fewer Lorem Ipsum words (2-3)",
      contextHint: "Generate 2-3 Lorem Ipsum words",
      exampleValues: [
        "Lorem ipsum",
        "dolor sit",
        "amet consectetur",
        "adipiscing elit"
      ]
    },
    {
      id: uuidv4(),
      name: "Many",
      type: "Quantity",
      description: "More Lorem Ipsum words (5-8)",
      contextHint: "Generate 5-8 Lorem Ipsum words",
      exampleValues: [
        "Lorem ipsum dolor sit amet consectetur",
        "adipiscing elit nullam fringilla purus",
        "non condimentum varius nulla nisi",
        "venenatis dui vel tincidunt felis nulla"
      ]
    }
  ]
};