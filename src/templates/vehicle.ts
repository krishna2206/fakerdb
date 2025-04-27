import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const bicycleTemplate: TemplateData = {
  id: uuidv4(),
  name: "Bicycle",
  category: "Vehicle",
  description: "Generate bicycle model names and types",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard bicycle models",
      contextHint: "Generate a bicycle model and type",
      exampleValues: [
        "Mountain Bicycle",
        "Road Bicycle",
        "BMX Bicycle",
        "Trek FX 2",
        "Schwinn Cruiser",
        "Giant Contend"
      ]
    },
    {
      id: uuidv4(),
      name: "Type",
      type: "Type",
      description: "Types of bicycles",
      contextHint: "Generate only the bicycle type",
      exampleValues: [
        "Mountain",
        "Road",
        "Hybrid",
        "Cruiser",
        "BMX",
        "Touring",
        "Folding",
        "Fixed Gear",
        "Electric"
      ]
    }
  ]
};

export const vehicleColorTemplate: TemplateData = {
  id: uuidv4(),
  name: "Vehicle Color",
  category: "Vehicle",
  description: "Generate vehicle colors",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common vehicle colors",
      contextHint: "Generate a vehicle color",
      exampleValues: [
        "Red",
        "Black",
        "White",
        "Silver",
        "Gray",
        "Blue",
        "Charcoal",
        "Forest Green",
        "Metallic Bronze"
      ]
    },
    {
      id: uuidv4(),
      name: "Premium",
      type: "Category",
      description: "Premium and metallic vehicle colors",
      contextHint: "Generate a premium vehicle color name",
      exampleValues: [
        "Glacier White Pearl",
        "Midnight Black Metallic",
        "Crimson Red Tinted Pearl",
        "Deep Blue Pearl",
        "Mocha Almond Pearl"
      ]
    }
  ]
};

export const fuelTemplate: TemplateData = {
  id: uuidv4(),
  name: "Fuel Type",
  category: "Vehicle",
  description: "Generate vehicle fuel types",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard fuel types",
      contextHint: "Generate a vehicle fuel type",
      exampleValues: [
        "Gasoline",
        "Diesel",
        "Electric",
        "Hybrid",
        "E85 Flex Fuel",
        "CNG",
        "Biodiesel"
      ]
    }
  ]
};

export const manufacturerTemplate: TemplateData = {
  id: uuidv4(),
  name: "Manufacturer",
  category: "Vehicle",
  description: "Generate vehicle manufacturers",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common vehicle manufacturers",
      contextHint: "Generate a vehicle manufacturer name",
      exampleValues: [
        "Toyota",
        "Ford",
        "Chevrolet",
        "Honda",
        "BMW",
        "Mercedes-Benz",
        "Volkswagen",
        "Audi",
        "Nissan"
      ]
    },
    {
      id: uuidv4(),
      name: "Luxury",
      type: "Category",
      description: "Luxury vehicle manufacturers",
      contextHint: "Generate a luxury vehicle manufacturer name",
      exampleValues: [
        "Bentley",
        "Rolls-Royce",
        "Ferrari",
        "Lamborghini",
        "Aston Martin",
        "Bugatti",
        "McLaren",
        "Maserati"
      ]
    }
  ]
};

export const modelTemplate: TemplateData = {
  id: uuidv4(),
  name: "Vehicle Model",
  category: "Vehicle",
  description: "Generate vehicle model names",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common vehicle models",
      contextHint: "Generate a vehicle model name",
      exampleValues: [
        "Camry",
        "F-150",
        "Civic",
        "Accord",
        "Escape",
        "Rogue",
        "CR-V",
        "Silverado",
        "Corolla"
      ]
    },
    {
      id: uuidv4(),
      name: "With Manufacturer",
      type: "Format",
      description: "Model names with manufacturer",
      contextHint: "Generate a vehicle model with manufacturer (e.g., Toyota Camry)",
      exampleValues: [
        "Honda Civic",
        "Toyota Camry",
        "Ford F-150",
        "Chevrolet Malibu",
        "BMW X5",
        "Audi A4",
        "Tesla Model 3"
      ]
    }
  ]
};

export const vehicleTypeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Vehicle Type",
  category: "Vehicle",
  description: "Generate vehicle types/body styles",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common vehicle types/body styles",
      contextHint: "Generate a vehicle type or body style",
      exampleValues: [
        "Sedan",
        "SUV",
        "Truck",
        "Coupe",
        "Convertible",
        "Hatchback",
        "Minivan",
        "Wagon",
        "Crossover"
      ]
    }
  ]
};

export const vehicleTemplate: TemplateData = {
  id: uuidv4(),
  name: "Vehicle",
  category: "Vehicle",
  description: "Generate complete vehicle descriptions",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Complete vehicle description with year, make and model",
      contextHint: "Generate a complete vehicle description (year, make, model)",
      exampleValues: [
        "2019 Honda Civic LX",
        "2021 Toyota RAV4 XLE",
        "2018 Ford F-150 XLT",
        "2022 Tesla Model 3 Long Range",
        "2020 Jeep Grand Cherokee Laredo"
      ]
    },
    {
      id: uuidv4(),
      name: "With Color",
      type: "Extended",
      description: "Complete vehicle with color",
      contextHint: "Generate a vehicle with year, make, model and color",
      exampleValues: [
        "Black 2019 Honda Civic LX",
        "Silver 2021 Toyota RAV4 XLE",
        "Red 2018 Ford F-150 XLT",
        "White 2022 Tesla Model 3 Long Range",
        "Blue 2020 Jeep Grand Cherokee Laredo"
      ]
    }
  ]
};

export const vinTemplate: TemplateData = {
  id: uuidv4(),
  name: "VIN",
  category: "Vehicle",
  description: "Generate vehicle identification numbers",
  fieldType: "CHAR",
  defaultLength: 17,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard 17-character VIN",
      contextHint: "Generate a valid vehicle identification number (VIN)",
      exampleValues: [
        "1HGCM82633A004352",
        "JH4KA8160MC001741",
        "1G1JC524417345789",
        "2FAFP71W14X126104",
        "WBAVD13576KV49342"
      ]
    }
  ]
};

export const vrmTemplate: TemplateData = {
  id: uuidv4(),
  name: "VRM",
  category: "Vehicle",
  description: "Generate vehicle registration marks/plates",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard vehicle license plates",
      contextHint: "Generate a vehicle license plate/registration number",
      exampleValues: [
        "ABC-1234",
        "XYZ 567",
        "FGH 8901",
        "789-JKL",
        "456 MNO"
      ]
    },
    {
      id: uuidv4(),
      name: "US Format",
      type: "Country",
      description: "US-style license plates",
      contextHint: "Generate a US format license plate",
      exampleValues: [
        "ABC-1234",
        "XYZ-567",
        "789-JKL",
        "CAL1234",
        "TX45678"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Format",
      type: "Country",
      description: "UK-style license plates",
      contextHint: "Generate a UK format license plate",
      exampleValues: [
        "AB12 CDE",
        "CD34 EFG",
        "EF56 GHI",
        "GH78 IJK",
        "IJ90 KLM"
      ]
    }
  ]
};