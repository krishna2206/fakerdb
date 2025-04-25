import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const fullNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Full Name",
  category: "Human Data",
  description: "A person's full name (first and last name)",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic full names",
      contextHint: "Generate realistic full names",
      exampleValues: [
        "John Smith",
        "Emily Johnson",
        "Michael Williams",
        "Sarah Brown"
      ]
    },
    {
      id: uuidv4(),
      name: "US Names",
      type: "Country",
      description: "American-style names",
      contextHint: "Generate US-style full names",
      exampleValues: [
        "John Smith",
        "Emily Johnson",
        "Michael Williams",
        "Sarah Brown"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Names",
      type: "Country",
      description: "British-style names",
      contextHint: "Generate UK-style full names",
      exampleValues: [
        "James Wilson",
        "Olivia Taylor",
        "George Evans",
        "Emma Davies"
      ]
    },
    {
      id: uuidv4(),
      name: "French Names",
      type: "Country",
      description: "French-style names",
      contextHint: "Generate French full names",
      exampleValues: [
        "Jean Dubois",
        "Marie Laurent",
        "Pierre Martin",
        "Sophie Bernard"
      ]
    },
    {
      id: uuidv4(),
      name: "Spanish Names",
      type: "Country",
      description: "Spanish-style names",
      contextHint: "Generate Spanish full names",
      exampleValues: [
        "Antonio García",
        "María Rodríguez",
        "José Martínez",
        "Carmen López"
      ]
    },
    {
      id: uuidv4(),
      name: "German Names",
      type: "Country",
      description: "German-style names",
      contextHint: "Generate German full names",
      exampleValues: [
        "Thomas Müller",
        "Anna Schmidt",
        "Michael Weber",
        "Hannah Fischer"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian Names",
      type: "Country",
      description: "Italian-style names",
      contextHint: "Generate Italian full names",
      exampleValues: [
        "Marco Rossi",
        "Giulia Russo",
        "Antonio Esposito",
        "Sofia Ferrari"
      ]
    },
    {
      id: uuidv4(),
      name: "Indian Names",
      type: "Country",
      description: "Indian-style names",
      contextHint: "Generate Indian full names",
      exampleValues: [
        "Raj Patel",
        "Priya Sharma",
        "Amit Singh",
        "Neha Gupta"
      ]
    },
    {
      id: uuidv4(),
      name: "Chinese Names",
      type: "Country",
      description: "Chinese-style names",
      contextHint: "Generate Chinese full names",
      exampleValues: [
        "Wei Zhang",
        "Yan Wang",
        "Ming Liu",
        "Jing Chen"
      ]
    },
    {
      id: uuidv4(),
      name: "Japanese Names",
      type: "Country",
      description: "Japanese-style names",
      contextHint: "Generate Japanese full names",
      exampleValues: [
        "Takashi Yamamoto",
        "Yuki Sato",
        "Hiroshi Tanaka",
        "Akiko Suzuki"
      ]
    },
    {
      id: uuidv4(),
      name: "Brazilian Names",
      type: "Country",
      description: "Brazilian-style names",
      contextHint: "Generate Brazilian full names",
      exampleValues: [
        "João Silva",
        "Maria Santos",
        "Pedro Oliveira",
        "Ana Costa"
      ]
    },
    {
      id: uuidv4(),
      name: "Malagasy Names",
      type: "Country",
      description: "Malagasy-style names from Madagascar",
      contextHint: "Generate Malagasy full names",
      exampleValues: [
        "Mamy Rakotoarisoa",
        "Voahirana Rabemananjara",
        "Tojonirina Razafindrakoto",
        "Haingo Randrianarisoa"
      ]
    },
    {
      id: uuidv4(),
      name: "Russian Names",
      type: "Country",
      description: "Russian-style names",
      contextHint: "Generate Russian full names",
      exampleValues: [
        "Alexei Sokolov",
        "Natalia Petrova",
        "Igor Volkov",
        "Olga Fedorova"
      ]
    },
    {
      id: uuidv4(),
      name: "Korean Names",
      type: "Country",
      description: "Korean-style names",
      contextHint: "Generate Korean full names",
      exampleValues: [
        "Kim Sung-jin",
        "Park Min-hee",
        "Lee Hyun-woo",
        "Choi Eun-ji"
      ]
    },
    {
      id: uuidv4(),
      name: "Arabic Names",
      type: "Country",
      description: "Arabic-style names",
      contextHint: "Generate Arabic full names",
      exampleValues: [
        "Hassan Al-Zaidi",
        "Samira El-Masri",
        "Yusuf Al-Hakim",
        "Fatima Al-Najjar"
      ]
    },
    {
      id: uuidv4(),
      name: "Nigerian Names",
      type: "Country",
      description: "Nigerian-style names",
      contextHint: "Generate Nigerian full names",
      exampleValues: [
        "Emeka Nwachukwu",
        "Folake Afolayan",
        "Chinedu Eze",
        "Ngozi Okonkwo"
      ]
    },
    {
      id: uuidv4(),
      name: "Swedish Names",
      type: "Country",
      description: "Swedish-style names",
      contextHint: "Generate Swedish full names",
      exampleValues: [
        "Gustav Nilsson",
        "Astrid Bergman",
        "Magnus Ekström",
        "Linnea Nyström"
      ]
    },
    {
      id: uuidv4(),
      name: "Greek Names",
      type: "Country",
      description: "Greek-style names",
      contextHint: "Generate Greek full names",
      exampleValues: [
        "Stavros Antoniou",
        "Irene Papadaki",
        "Nikolas Georgiou",
        "Katerina Demetriou"
      ]
    },
    {
      id: uuidv4(),
      name: "Male Only",
      type: "Gender",
      description: "Male full names only",
      contextHint: "Generate male full names only",
      exampleValues: [
        "John Smith",
        "Michael Johnson",
        "David Brown",
        "James Wilson"
      ]
    },
    {
      id: uuidv4(),
      name: "Female Only",
      type: "Gender",
      description: "Female full names only",
      contextHint: "Generate female full names only",
      exampleValues: [
        "Emily Smith",
        "Sarah Johnson",
        "Jessica Brown",
        "Emma Wilson"
      ]
    }
  ]
};

export const firstNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "First Name",
  category: "Human Data",
  description: "A person's first name",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic first names",
      contextHint: "Generate realistic first names",
      exampleValues: [
        "John",
        "Emily",
        "Michael",
        "Sarah"
      ]
    },
    {
      id: uuidv4(),
      name: "US Names",
      type: "Country",
      description: "American-style first names",
      contextHint: "Generate US first names",
      exampleValues: [
        "John",
        "Emily",
        "Michael",
        "Sarah"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Names",
      type: "Country",
      description: "British-style first names",
      contextHint: "Generate UK first names",
      exampleValues: [
        "James",
        "Olivia",
        "George",
        "Emma"
      ]
    },
    {
      id: uuidv4(),
      name: "French Names",
      type: "Country",
      description: "French-style first names",
      contextHint: "Generate French first names",
      exampleValues: [
        "Jean",
        "Marie",
        "Pierre",
        "Sophie"
      ]
    },
    {
      id: uuidv4(),
      name: "Spanish Names",
      type: "Country",
      description: "Spanish-style first names",
      contextHint: "Generate Spanish first names",
      exampleValues: [
        "Antonio",
        "María",
        "José",
        "Carmen"
      ]
    },
    {
      id: uuidv4(),
      name: "German Names",
      type: "Country",
      description: "German-style first names",
      contextHint: "Generate German first names",
      exampleValues: [
        "Thomas",
        "Anna",
        "Michael",
        "Hannah"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian Names",
      type: "Country",
      description: "Italian-style first names",
      contextHint: "Generate Italian first names",
      exampleValues: [
        "Marco",
        "Giulia",
        "Antonio",
        "Sofia"
      ]
    },
    {
      id: uuidv4(),
      name: "Indian Names",
      type: "Country",
      description: "Indian-style first names",
      contextHint: "Generate Indian first names",
      exampleValues: [
        "Raj",
        "Priya",
        "Amit",
        "Neha"
      ]
    },
    {
      id: uuidv4(),
      name: "Chinese Names",
      type: "Country",
      description: "Chinese-style first names",
      contextHint: "Generate Chinese first names",
      exampleValues: [
        "Wei",
        "Yan",
        "Ming",
        "Jing"
      ]
    },
    {
      id: uuidv4(),
      name: "Japanese Names",
      type: "Country",
      description: "Japanese-style first names",
      contextHint: "Generate Japanese first names",
      exampleValues: [
        "Takashi",
        "Yuki",
        "Hiroshi",
        "Akiko"
      ]
    },
    {
      id: uuidv4(),
      name: "Brazilian Names",
      type: "Country",
      description: "Brazilian-style first names",
      contextHint: "Generate Brazilian first names",
      exampleValues: [
        "João",
        "Maria",
        "Pedro",
        "Ana"
      ]
    },
    {
      id: uuidv4(),
      name: "Malagasy Names",
      type: "Country",
      description: "Malagasy-style first names from Madagascar",
      contextHint: "Generate Malagasy first names",
      exampleValues: [
        "Mamy",
        "Voahirana",
        "Tojonirina",
        "Haingo"
      ]
    },
    {
      id: uuidv4(),
      name: "Russian Names",
      type: "Country",
      description: "Russian-style first names",
      contextHint: "Generate Russian first names",
      exampleValues: [
        "Alexei",
        "Natalia",
        "Igor",
        "Olga"
      ]
    },
    {
      id: uuidv4(),
      name: "Korean Names",
      type: "Country",
      description: "Korean-style first names",
      contextHint: "Generate Korean first names",
      exampleValues: [
        "Sung-jin",
        "Min-hee",
        "Hyun-woo",
        "Eun-ji"
      ]
    },
    {
      id: uuidv4(),
      name: "Arabic Names",
      type: "Country",
      description: "Arabic-style first names",
      contextHint: "Generate Arabic first names",
      exampleValues: [
        "Hassan",
        "Samira",
        "Yusuf",
        "Fatima"
      ]
    },
    {
      id: uuidv4(),
      name: "Nigerian Names",
      type: "Country",
      description: "Nigerian-style first names",
      contextHint: "Generate Nigerian first names",
      exampleValues: [
        "Emeka",
        "Folake",
        "Chinedu",
        "Ngozi"
      ]
    },
    {
      id: uuidv4(),
      name: "Swedish Names",
      type: "Country",
      description: "Swedish-style first names",
      contextHint: "Generate Swedish first names",
      exampleValues: [
        "Gustav",
        "Astrid",
        "Magnus",
        "Linnea"
      ]
    },
    {
      id: uuidv4(),
      name: "Greek Names",
      type: "Country",
      description: "Greek-style first names",
      contextHint: "Generate Greek first names",
      exampleValues: [
        "Stavros",
        "Irene",
        "Nikolas",
        "Katerina"
      ]
    },
    {
      id: uuidv4(),
      name: "Male Only",
      type: "Gender",
      description: "Male first names only",
      contextHint: "Generate male first names only",
      exampleValues: [
        "John",
        "Michael",
        "David",
        "James"
      ]
    },
    {
      id: uuidv4(),
      name: "Female Only",
      type: "Gender",
      description: "Female first names only",
      contextHint: "Generate female first names only",
      exampleValues: [
        "Emily",
        "Sarah",
        "Jessica",
        "Emma"
      ]
    }
  ]
};

export const lastNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Last Name",
  category: "Human Data",
  description: "A person's last name (surname)",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic last names",
      contextHint: "Generate realistic last names",
      exampleValues: [
        "Smith",
        "Johnson",
        "Williams",
        "Brown"
      ]
    },
    {
      id: uuidv4(),
      name: "US Names",
      type: "Country",
      description: "American-style last names",
      contextHint: "Generate US last names",
      exampleValues: [
        "Smith",
        "Johnson",
        "Williams",
        "Brown"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Names",
      type: "Country",
      description: "British-style last names",
      contextHint: "Generate UK last names",
      exampleValues: [
        "Wilson",
        "Taylor",
        "Evans",
        "Davies"
      ]
    },
    {
      id: uuidv4(),
      name: "French Names",
      type: "Country",
      description: "French-style last names",
      contextHint: "Generate French last names",
      exampleValues: [
        "Dubois",
        "Laurent",
        "Martin",
        "Bernard"
      ]
    },
    {
      id: uuidv4(),
      name: "Spanish Names",
      type: "Country",
      description: "Spanish-style last names",
      contextHint: "Generate Spanish last names",
      exampleValues: [
        "García",
        "Rodríguez",
        "Martínez",
        "López"
      ]
    },
    {
      id: uuidv4(),
      name: "German Names",
      type: "Country",
      description: "German-style last names",
      contextHint: "Generate German last names",
      exampleValues: [
        "Müller",
        "Schmidt",
        "Weber",
        "Fischer"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian Names",
      type: "Country",
      description: "Italian-style last names",
      contextHint: "Generate Italian last names",
      exampleValues: [
        "Rossi",
        "Russo",
        "Esposito",
        "Ferrari"
      ]
    },
    {
      id: uuidv4(),
      name: "Indian Names",
      type: "Country",
      description: "Indian-style last names",
      contextHint: "Generate Indian last names",
      exampleValues: [
        "Patel",
        "Sharma",
        "Singh",
        "Gupta"
      ]
    },
    {
      id: uuidv4(),
      name: "Chinese Names",
      type: "Country",
      description: "Chinese-style last names",
      contextHint: "Generate Chinese last names",
      exampleValues: [
        "Zhang",
        "Wang",
        "Liu",
        "Chen"
      ]
    },
    {
      id: uuidv4(),
      name: "Japanese Names",
      type: "Country",
      description: "Japanese-style last names",
      contextHint: "Generate Japanese last names",
      exampleValues: [
        "Yamamoto",
        "Sato",
        "Tanaka",
        "Suzuki"
      ]
    },
    {
      id: uuidv4(),
      name: "Brazilian Names",
      type: "Country",
      description: "Brazilian-style last names",
      contextHint: "Generate Brazilian last names",
      exampleValues: [
        "Silva",
        "Santos",
        "Oliveira",
        "Costa"
      ]
    },
    {
      id: uuidv4(),
      name: "Malagasy Names",
      type: "Country",
      description: "Malagasy-style last names from Madagascar",
      contextHint: "Generate Malagasy last names",
      exampleValues: [
        "Rakotoarisoa",
        "Rabemananjara",
        "Razafindrakoto",
        "Randrianarisoa"
      ]
    },
    {
      id: uuidv4(),
      name: "Russian Names",
      type: "Country",
      description: "Russian-style last names",
      contextHint: "Generate Russian last names",
      exampleValues: [
        "Ivanov",
        "Smirnova",
        "Petrov",
        "Kuznetsova"
      ]
    },
    {
      id: uuidv4(),
      name: "Korean Names",
      type: "Country",
      description: "Korean-style last names",
      contextHint: "Generate Korean last names",
      exampleValues: [
        "Kim",
        "Park",
        "Lee",
        "Choi"
      ]
    },
    {
      id: uuidv4(),
      name: "Arabic Names",
      type: "Country",
      description: "Arabic-style last names",
      contextHint: "Generate Arabic last names",
      exampleValues: [
        "Al-Farsi",
        "El-Hassan",
        "Al-Mansour",
        "Al-Amin"
      ]
    },
    {
      id: uuidv4(),
      name: "Nigerian Names",
      type: "Country",
      description: "Nigerian-style last names",
      contextHint: "Generate Nigerian last names",
      exampleValues: [
        "Adeyemi",
        "Okafor",
        "Ogunlesi",
        "Onyekachi"
      ]
    },
    {
      id: uuidv4(),
      name: "Swedish Names",
      type: "Country",
      description: "Swedish-style last names",
      contextHint: "Generate Swedish last names",
      exampleValues: [
        "Johansson",
        "Andersson",
        "Lindberg",
        "Björklund"
      ]
    },
    {
      id: uuidv4(),
      name: "Greek Names",
      type: "Country",
      description: "Greek-style last names",
      contextHint: "Generate Greek last names",
      exampleValues: [
        "Papadopoulos",
        "Karagianni",
        "Nikolaou",
        "Dimitriou"
      ]
    }
  ]
};

export const middleNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Middle Name",
  category: "Human Data",
  description: "Person's middle name",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common middle names",
      contextHint: "Generate middle names",
      exampleValues: [
        "Marie",
        "James",
        "Ann",
        "Elizabeth",
        "Lee",
        "Robert"
      ]
    }
  ]
};

export const prefixTemplate: TemplateData = {
  id: uuidv4(),
  name: "Prefix",
  category: "Human Data",
  description: "Name prefix/title",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common name prefixes",
      contextHint: "Generate name prefixes/titles",
      exampleValues: [
        "Mr.",
        "Mrs.",
        "Ms.",
        "Miss",
        "Dr.",
        "Prof."
      ]
    }
  ]
};

export const suffixTemplate: TemplateData = {
  id: uuidv4(),
  name: "Suffix",
  category: "Human Data",
  description: "Name suffix",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common name suffixes",
      contextHint: "Generate name suffixes",
      exampleValues: [
        "Jr.",
        "Sr.",
        "II",
        "III",
        "IV",
        "Ph.D.",
        "M.D.",
        "Esq."
      ]
    }
  ]
};