import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const buildingNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "Building Number",
  category: "Location",
  description: "A building number for addresses",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random building numbers",
      contextHint: "Generate realistic building numbers",
      exampleValues: [
        "123",
        "456",
        "789",
        "1024"
      ]
    }
  ]
};

export const cardinalDirectionTemplate: TemplateData = {
  id: uuidv4(),
  name: "Cardinal Direction",
  category: "Location",
  description: "Cardinal directions (North, East, South, West)",
  fieldType: "VARCHAR",
  defaultLength: 5,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Cardinal directions",
      contextHint: "Generate cardinal directions (N, E, S, W)",
      exampleValues: [
        "North",
        "East",
        "South",
        "West"
      ]
    },
    {
      id: uuidv4(),
      name: "Abbreviated",
      type: "Format",
      description: "Abbreviated cardinal directions",
      contextHint: "Generate abbreviated cardinal directions (N, E, S, W)",
      exampleValues: [
        "N",
        "E",
        "S",
        "W"
      ]
    }
  ]
};

export const cityTemplate: TemplateData = {
  id: uuidv4(),
  name: "City",
  category: "Location",
  description: "City names from around the world",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random city names from around the world",
      contextHint: "Generate realistic city names",
      exampleValues: [
        "New York",
        "London",
        "Paris",
        "Tokyo",
        "Sydney"
      ]
    },
    {
      id: uuidv4(),
      name: "US Cities",
      type: "Country",
      description: "City names in the United States",
      contextHint: "Generate US city names",
      exampleValues: [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Cities",
      type: "Country",
      description: "City names in the United Kingdom",
      contextHint: "Generate UK city names",
      exampleValues: [
        "London",
        "Birmingham",
        "Manchester",
        "Glasgow",
        "Liverpool"
      ]
    },
    {
      id: uuidv4(),
      name: "Canadian Cities",
      type: "Country",
      description: "City names in Canada",
      contextHint: "Generate Canadian city names",
      exampleValues: [
        "Toronto",
        "Montreal",
        "Vancouver",
        "Calgary",
        "Ottawa"
      ]
    },
    {
      id: uuidv4(),
      name: "French Cities",
      type: "Country",
      description: "City names in France",
      contextHint: "Generate French city names",
      exampleValues: [
        "Paris",
        "Marseille",
        "Lyon",
        "Toulouse",
        "Nice"
      ]
    },
    {
      id: uuidv4(),
      name: "German Cities",
      type: "Country",
      description: "City names in Germany",
      contextHint: "Generate German city names",
      exampleValues: [
        "Berlin",
        "Hamburg",
        "Munich",
        "Cologne",
        "Frankfurt"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian Cities",
      type: "Country",
      description: "City names in Italy",
      contextHint: "Generate Italian city names",
      exampleValues: [
        "Rome",
        "Milan",
        "Naples",
        "Turin",
        "Florence"
      ]
    },
    {
      id: uuidv4(),
      name: "Japanese Cities",
      type: "Country",
      description: "City names in Japan",
      contextHint: "Generate Japanese city names",
      exampleValues: [
        "Tokyo",
        "Osaka",
        "Kyoto",
        "Yokohama",
        "Sapporo"
      ]
    },
    {
      id: uuidv4(),
      name: "Chinese Cities",
      type: "Country",
      description: "City names in China",
      contextHint: "Generate Chinese city names",
      exampleValues: [
        "Beijing",
        "Shanghai",
        "Guangzhou",
        "Shenzhen",
        "Chengdu"
      ]
    },
    {
      id: uuidv4(),
      name: "Australian Cities",
      type: "Country",
      description: "City names in Australia",
      contextHint: "Generate Australian city names",
      exampleValues: [
        "Sydney",
        "Melbourne",
        "Brisbane",
        "Perth",
        "Adelaide"
      ]
    }
  ]
};

export const continentTemplate: TemplateData = {
  id: uuidv4(),
  name: "Continent",
  category: "Location",
  description: "Names of continents",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Names of continents",
      contextHint: "Generate continent names",
      exampleValues: [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "North America",
        "Oceania",
        "South America"
      ]
    }
  ]
};

export const countryTemplate: TemplateData = {
  id: uuidv4(),
  name: "Country",
  category: "Location",
  description: "Names of countries around the world",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Names of countries around the world",
      contextHint: "Generate country names",
      exampleValues: [
        "United States",
        "United Kingdom",
        "Canada",
        "Germany",
        "Japan",
        "Australia",
        "Brazil",
        "South Africa"
      ]
    },
    {
      id: uuidv4(),
      name: "European Countries",
      type: "Region",
      description: "Names of European countries",
      contextHint: "Generate European country names",
      exampleValues: [
        "Germany",
        "France",
        "Italy",
        "Spain",
        "United Kingdom",
        "Netherlands",
        "Sweden",
        "Poland"
      ]
    },
    {
      id: uuidv4(),
      name: "Asian Countries",
      type: "Region",
      description: "Names of Asian countries",
      contextHint: "Generate Asian country names",
      exampleValues: [
        "Japan",
        "China",
        "India",
        "South Korea",
        "Vietnam",
        "Thailand",
        "Indonesia",
        "Malaysia"
      ]
    },
    {
      id: uuidv4(),
      name: "African Countries",
      type: "Region",
      description: "Names of African countries",
      contextHint: "Generate African country names",
      exampleValues: [
        "South Africa",
        "Nigeria",
        "Egypt",
        "Kenya",
        "Morocco",
        "Ghana",
        "Ethiopia",
        "Tanzania"
      ]
    },
    {
      id: uuidv4(),
      name: "North American Countries",
      type: "Region",
      description: "Names of North American countries",
      contextHint: "Generate North American country names",
      exampleValues: [
        "United States",
        "Canada",
        "Mexico",
        "Costa Rica",
        "Panama",
        "Jamaica",
        "Cuba",
        "Guatemala"
      ]
    },
    {
      id: uuidv4(),
      name: "South American Countries",
      type: "Region",
      description: "Names of South American countries",
      contextHint: "Generate South American country names",
      exampleValues: [
        "Brazil",
        "Argentina",
        "Colombia",
        "Peru",
        "Chile",
        "Ecuador",
        "Uruguay",
        "Venezuela"
      ]
    }
  ]
};

export const countryCodeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Country Code",
  category: "Location",
  description: "ISO country codes",
  fieldType: "CHAR",
  defaultLength: 2,
  variations: [
    {
      id: uuidv4(),
      name: "Default (ISO-3166-1 alpha-2)",
      type: "Default",
      description: "2-letter ISO country codes",
      contextHint: "Generate ISO 3166-1 alpha-2 country codes",
      exampleValues: [
        "US",
        "GB",
        "CA",
        "DE",
        "JP",
        "AU",
        "BR",
        "ZA"
      ]
    },
    {
      id: uuidv4(),
      name: "ISO-3166-1 alpha-3",
      type: "Format",
      description: "3-letter ISO country codes",
      contextHint: "Generate ISO 3166-1 alpha-3 country codes",
      exampleValues: [
        "USA",
        "GBR",
        "CAN",
        "DEU",
        "JPN",
        "AUS",
        "BRA",
        "ZAF"
      ]
    }
  ]
};

export const countyTemplate: TemplateData = {
  id: uuidv4(),
  name: "County",
  category: "Location",
  description: "County names",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic county names",
      contextHint: "Generate realistic county names",
      exampleValues: [
        "Jefferson",
        "Lincoln",
        "Washington",
        "Franklin",
        "Madison"
      ]
    },
    {
      id: uuidv4(),
      name: "US Counties",
      type: "Country",
      description: "US county names",
      contextHint: "Generate US county names",
      exampleValues: [
        "Orange County",
        "King County",
        "Harris County",
        "Cook County",
        "Maricopa County"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Counties",
      type: "Country",
      description: "UK county names",
      contextHint: "Generate UK county names",
      exampleValues: [
        "Kent",
        "Essex",
        "Surrey",
        "Yorkshire",
        "Hampshire"
      ]
    }
  ]
};

export const directionTemplate: TemplateData = {
  id: uuidv4(),
  name: "Direction",
  category: "Location",
  description: "Directional terms",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common directional terms",
      contextHint: "Generate directional terms",
      exampleValues: [
        "North",
        "East",
        "South",
        "West",
        "Northeast",
        "Southeast",
        "Southwest",
        "Northwest"
      ]
    },
    {
      id: uuidv4(),
      name: "Abbreviated",
      type: "Format",
      description: "Abbreviated directional terms",
      contextHint: "Generate abbreviated directional terms",
      exampleValues: [
        "N",
        "E",
        "S",
        "W",
        "NE",
        "SE",
        "SW",
        "NW"
      ]
    }
  ]
};

export const languageTemplate: TemplateData = {
  id: uuidv4(),
  name: "Language",
  category: "Location",
  description: "Language names",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common language names",
      contextHint: "Generate language names",
      exampleValues: [
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
        "Arabic",
        "Hindi"
      ]
    }
  ]
};

export const latitudeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Latitude",
  category: "Location",
  description: "Latitude coordinates",
  fieldType: "DECIMAL",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Realistic latitude values",
      contextHint: "Generate latitude coordinates (between -90 and 90)",
      exampleValues: [
        "40.7128",
        "-33.8688",
        "51.5074",
        "35.6762",
        "-23.5505"
      ]
    }
  ]
};

export const longitudeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Longitude",
  category: "Location",
  description: "Longitude coordinates",
  fieldType: "DECIMAL",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Realistic longitude values",
      contextHint: "Generate longitude coordinates (between -180 and 180)",
      exampleValues: [
        "-74.0060",
        "151.2093",
        "-0.1278",
        "139.6503",
        "-46.6333"
      ]
    }
  ]
};

export const nearbyGPSCoordinateTemplate: TemplateData = {
  id: uuidv4(),
  name: "Nearby GPS Coordinate",
  category: "Location",
  description: "GPS coordinates near a specified point",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "GPS coordinates format: latitude,longitude",
      contextHint: "Generate GPS coordinates near a reference point",
      exampleValues: [
        "40.7128,-74.0060",
        "40.7137,-74.0081",
        "40.7119,-74.0055",
        "40.7140,-74.0032"
      ]
    }
  ]
};

export const ordinalDirectionTemplate: TemplateData = {
  id: uuidv4(),
  name: "Ordinal Direction",
  category: "Location",
  description: "Ordinal directions (Northeast, Southeast, etc.)",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Ordinal directions",
      contextHint: "Generate ordinal directions (NE, SE, SW, NW)",
      exampleValues: [
        "Northeast",
        "Southeast",
        "Southwest",
        "Northwest"
      ]
    },
    {
      id: uuidv4(),
      name: "Abbreviated",
      type: "Format",
      description: "Abbreviated ordinal directions",
      contextHint: "Generate abbreviated ordinal directions",
      exampleValues: [
        "NE",
        "SE",
        "SW",
        "NW"
      ]
    }
  ]
};

export const secondaryAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "Secondary Address",
  category: "Location",
  description: "Secondary address information (apt, suite, etc.)",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Secondary address information",
      contextHint: "Generate secondary address information (apartments, suites, etc.)",
      exampleValues: [
        "Apt. 123",
        "Suite 456",
        "Unit 789",
        "Floor 5",
        "Room 101"
      ]
    }
  ]
};

export const stateTemplate: TemplateData = {
  id: uuidv4(),
  name: "State",
  category: "Location",
  description: "State/province names",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "General state/province names",
      contextHint: "Generate realistic state/province names",
      exampleValues: [
        "California",
        "Texas",
        "New York",
        "Florida",
        "Ontario",
        "Queensland"
      ]
    },
    {
      id: uuidv4(),
      name: "US States",
      type: "Country",
      description: "US state names",
      contextHint: "Generate US state names",
      exampleValues: [
        "California",
        "Texas",
        "New York",
        "Florida",
        "Illinois"
      ]
    },
    {
      id: uuidv4(),
      name: "US State Abbreviations",
      type: "Format",
      description: "US state abbreviations",
      contextHint: "Generate US state abbreviations",
      exampleValues: [
        "CA",
        "TX",
        "NY",
        "FL",
        "IL"
      ]
    },
    {
      id: uuidv4(),
      name: "Canadian Provinces",
      type: "Country",
      description: "Canadian province names",
      contextHint: "Generate Canadian province names",
      exampleValues: [
        "Ontario",
        "Quebec",
        "British Columbia",
        "Alberta",
        "Nova Scotia"
      ]
    },
    {
      id: uuidv4(),
      name: "Australian States",
      type: "Country",
      description: "Australian state names",
      contextHint: "Generate Australian state names",
      exampleValues: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "Western Australia",
        "South Australia"
      ]
    }
  ]
};

export const streetTemplate: TemplateData = {
  id: uuidv4(),
  name: "Street",
  category: "Location",
  description: "Street names",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common street names",
      contextHint: "Generate realistic street names",
      exampleValues: [
        "Main Street",
        "Oak Avenue",
        "Park Road",
        "Maple Lane",
        "Washington Boulevard"
      ]
    },
    {
      id: uuidv4(),
      name: "US Streets",
      type: "Country",
      description: "US-style street names",
      contextHint: "Generate US street names",
      exampleValues: [
        "Main Street",
        "Oak Avenue",
        "Washington Boulevard",
        "Lincoln Road",
        "Jefferson Lane"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Streets",
      type: "Country",
      description: "UK-style street names",
      contextHint: "Generate UK street names",
      exampleValues: [
        "High Street",
        "Church Road",
        "Station Road",
        "Victoria Street",
        "Queen's Road"
      ]
    }
  ]
};

export const streetAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "Street Address",
  category: "Location",
  description: "Complete street addresses",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Complete street addresses",
      contextHint: "Generate realistic street addresses",
      exampleValues: [
        "123 Main Street",
        "456 Oak Avenue",
        "789 Park Road",
        "1024 Maple Lane",
        "555 Washington Boulevard"
      ]
    },
    {
      id: uuidv4(),
      name: "US Addresses",
      type: "Country",
      description: "US-style street addresses",
      contextHint: "Generate US street addresses",
      exampleValues: [
        "123 Main Street",
        "456 Oak Avenue",
        "789 Washington Boulevard",
        "1024 Lincoln Road",
        "555 Jefferson Lane"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Addresses",
      type: "Country",
      description: "UK-style street addresses",
      contextHint: "Generate UK street addresses",
      exampleValues: [
        "10 High Street",
        "24 Church Road",
        "35 Station Road",
        "78 Victoria Street",
        "123 Queen's Road"
      ]
    }
  ]
};

export const timeZoneTemplate: TemplateData = {
  id: uuidv4(),
  name: "Time Zone",
  category: "Location",
  description: "Time zone names",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Time zone names",
      contextHint: "Generate time zone names",
      exampleValues: [
        "America/New_York",
        "Europe/London",
        "Asia/Tokyo",
        "Australia/Sydney",
        "Pacific/Auckland"
      ]
    },
    {
      id: uuidv4(),
      name: "IANA Format",
      type: "Format",
      description: "IANA time zone identifiers",
      contextHint: "Generate IANA time zone identifiers",
      exampleValues: [
        "America/New_York",
        "Europe/London",
        "Asia/Tokyo",
        "Australia/Sydney",
        "Pacific/Auckland"
      ]
    },
    {
      id: uuidv4(),
      name: "Abbreviated",
      type: "Format",
      description: "Abbreviated time zone names",
      contextHint: "Generate abbreviated time zone names",
      exampleValues: [
        "EST",
        "GMT",
        "JST",
        "AEST",
        "NZST"
      ]
    },
    {
      id: uuidv4(),
      name: "UTC Offset",
      type: "Format",
      description: "UTC offset format",
      contextHint: "Generate time zones in UTC offset format",
      exampleValues: [
        "UTC-05:00",
        "UTC+00:00",
        "UTC+09:00",
        "UTC+10:00",
        "UTC+12:00"
      ]
    }
  ]
};

export const zipCodeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Zip Code",
  category: "Location",
  description: "Postal/ZIP codes",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic postal/ZIP codes",
      contextHint: "Generate postal/ZIP codes",
      exampleValues: [
        "12345",
        "67890",
        "54321",
        "98765"
      ]
    },
    {
      id: uuidv4(),
      name: "US ZIP",
      type: "Country",
      description: "US ZIP codes",
      contextHint: "Generate US ZIP codes",
      exampleValues: [
        "12345",
        "67890",
        "54321",
        "98765"
      ]
    },
    {
      id: uuidv4(),
      name: "US ZIP+4",
      type: "Format",
      description: "US ZIP+4 codes",
      contextHint: "Generate US ZIP+4 codes",
      exampleValues: [
        "12345-6789",
        "54321-8765",
        "98765-4321",
        "10101-2323"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Postcodes",
      type: "Country",
      description: "UK postcodes",
      contextHint: "Generate UK postcodes",
      exampleValues: [
        "SW1A 1AA",
        "EC1A 1BB",
        "W1A 0AX",
        "M1 1AE"
      ]
    },
    {
      id: uuidv4(),
      name: "Canadian Postcodes",
      type: "Country",
      description: "Canadian postcodes",
      contextHint: "Generate Canadian postcodes",
      exampleValues: [
        "A1A 1A1",
        "B2B 2B2",
        "C3C 3C3",
        "D4D 4D4"
      ]
    },
    {
      id: uuidv4(),
      name: "Australian Postcodes",
      type: "Country",
      description: "Australian postcodes",
      contextHint: "Generate Australian postcodes",
      exampleValues: [
        "2000",
        "3000",
        "4000",
        "5000"
      ]
    }
  ]
};