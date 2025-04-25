import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const phoneNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "Phone Number",
  category: "Human Data",
  description: "A phone number in various formats",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic phone numbers",
      contextHint: "Generate realistic phone numbers in standard format with country code prefix",
      exampleValues: [
        "+1 (555) 123-4567",
        "+44 20 1234 5678",
        "+61 2 9876 5432",
        "+33 1 23 45 67 89"
      ]
    },
    {
      id: uuidv4(),
      name: "US Format",
      type: "Country",
      description: "US-style phone numbers",
      contextHint: "Generate US-format phone numbers with country code prefix",
      exampleValues: [
        "+1 (555) 123-4567",
        "+1 555-123-4567",
        "+1 555.123.4567", 
        "+1 555 123 4567"
      ]
    },
    {
      id: uuidv4(),
      name: "UK Format",
      type: "Country",
      description: "UK-style phone numbers",
      contextHint: "Generate UK-format phone numbers with country code prefix",
      exampleValues: [
        "+44 20 1234 5678",
        "+44 20 7946 0958",
        "+44 7700 900123",
        "+44 7700 900456"
      ]
    },
    {
      id: uuidv4(),
      name: "French Format",
      type: "Country",
      description: "French phone numbers",
      contextHint: "Generate French format phone numbers with country code prefix",
      exampleValues: [
        "+33 1 23 45 67 89",
        "+33 6 12 34 56 78",
        "+33 7 98 76 54 32",
        "+33 9 87 65 43 21"
      ]
    },
    {
      id: uuidv4(),
      name: "Spanish Format",
      type: "Country",
      description: "Spanish phone numbers",
      contextHint: "Generate Spanish format phone numbers with country code prefix",
      exampleValues: [
        "+34 91 234 56 78",
        "+34 6 123 45 67",
        "+34 7 234 56 78",
        "+34 8 765 43 21"
      ]
    },
    {
      id: uuidv4(),
      name: "German Format",
      type: "Country",
      description: "German phone numbers",
      contextHint: "Generate German format phone numbers with country code prefix",
      exampleValues: [
        "+49 30 12345678",
        "+49 171 1234567",
        "+49 176 98765432",
        "+49 89 87654321"
      ]
    },
    {
      id: uuidv4(),
      name: "Italian Format",
      type: "Country",
      description: "Italian phone numbers",
      contextHint: "Generate Italian format phone numbers with country code prefix",
      exampleValues: [
        "+39 02 1234 5678",
        "+39 06 8765 4321",
        "+39 333 123 4567",
        "+39 345 876 5432"
      ]
    },
    {
      id: uuidv4(),
      name: "Indian Format",
      type: "Country",
      description: "Indian phone numbers",
      contextHint: "Generate Indian format phone numbers with country code prefix",
      exampleValues: [
        "+91 98765 43210",
        "+91 77777 88888",
        "+91 95555 12345",
        "+91 83333 12345"
      ]
    },
    {
      id: uuidv4(),
      name: "Chinese Format",
      type: "Country",
      description: "Chinese phone numbers",
      contextHint: "Generate Chinese format phone numbers with country code prefix",
      exampleValues: [
        "+86 10 1234 5678",
        "+86 21 8765 4321",
        "+86 139 1234 5678",
        "+86 150 9876 5432"
      ]
    },
    {
      id: uuidv4(),
      name: "Japanese Format",
      type: "Country",
      description: "Japanese phone numbers",
      contextHint: "Generate Japanese format phone numbers with country code prefix",
      exampleValues: [
        "+81 3-1234-5678",
        "+81 90-1234-5678",
        "+81 80-9876-5432",
        "+81 3-9876-5432"
      ]
    },
    {
      id: uuidv4(),
      name: "Brazilian Format",
      type: "Country",
      description: "Brazilian phone numbers",
      contextHint: "Generate Brazilian format phone numbers with country code prefix",
      exampleValues: [
        "+55 11 91234-5678",
        "+55 21 98765-4321",
        "+55 31 99876-5432",
        "+55 41 98765-1234"
      ]
    },
    {
      id: uuidv4(),
      name: "Malagasy Format",
      type: "Country",
      description: "Madagascar phone numbers",
      contextHint: "Generate Madagascar (Malagasy) format phone numbers with country code prefix",
      exampleValues: [
        "+261 34 12 345 67",
        "+261 33 98 765 43",
        "+261 32 54 321 09",
        "+261 34 87 654 32"
      ]
    },
    {
      id: uuidv4(),
      name: "Russian Format",
      type: "Country",
      description: "Russian phone numbers",
      contextHint: "Generate Russian format phone numbers with country code prefix",
      exampleValues: [
        "+7 495 123-45-67",
        "+7 812 987-65-43",
        "+7 903 123-45-67",
        "+7 912 345-67-89"
      ]
    },
    {
      id: uuidv4(),
      name: "Korean Format",
      type: "Country",
      description: "Korean phone numbers",
      contextHint: "Generate Korean format phone numbers with country code prefix",
      exampleValues: [
        "+82 2 1234 5678",
        "+82 10 9876 5432",
        "+82 51 234 5678",
        "+82 10 1234 5678"
      ]
    },
    {
      id: uuidv4(),
      name: "Arabic Format",
      type: "Country",
      description: "Arabic phone numbers (UAE)",
      contextHint: "Generate Arabic format phone numbers with country code prefix",
      exampleValues: [
        "+971 2 123 4567",
        "+971 50 123 4567",
        "+971 4 987 6543",
        "+971 55 765 4321"
      ]
    },
    {
      id: uuidv4(),
      name: "Nigerian Format",
      type: "Country",
      description: "Nigerian phone numbers",
      contextHint: "Generate Nigerian format phone numbers with country code prefix",
      exampleValues: [
        "+234 1 234 5678",
        "+234 803 123 4567",
        "+234 805 987 6543",
        "+234 701 234 5678"
      ]
    },
    {
      id: uuidv4(),
      name: "Swedish Format",
      type: "Country",
      description: "Swedish phone numbers",
      contextHint: "Generate Swedish format phone numbers with country code prefix",
      exampleValues: [
        "+46 8 123 456 78",
        "+46 70 123 45 67",
        "+46 76 987 65 43",
        "+46 31 234 56 78"
      ]
    },
    {
      id: uuidv4(),
      name: "Greek Format",
      type: "Country",
      description: "Greek phone numbers",
      contextHint: "Generate Greek format phone numbers with country code prefix",
      exampleValues: [
        "+30 21 1234 5678",
        "+30 69 1234 5678",
        "+30 23 1098 7654",
        "+30 69 8765 4321"
      ]
    },
    {
      id: uuidv4(),
      name: "Canadian Format",
      type: "Country",
      description: "Canadian phone numbers",
      contextHint: "Generate Canadian format phone numbers with country code prefix",
      exampleValues: [
        "+1 (416) 555-1234",
        "+1 (604) 987-6543",
        "+1 (514) 876-5432",
        "+1 (905) 765-4321"
      ]
    },
    {
      id: uuidv4(),
      name: "Australian Format",
      type: "Country",
      description: "Australian phone numbers",
      contextHint: "Generate Australian format phone numbers with country code prefix",
      exampleValues: [
        "+61 2 9876 5432",
        "+61 4 1234 5678",
        "+61 3 8765 4321",
        "+61 4 8765 4321"
      ]
    },
    {
      id: uuidv4(),
      name: "International Format",
      type: "Format",
      description: "Phone numbers in international format",
      contextHint: "Generate phone numbers in international format (E.164) with country code prefix",
      exampleValues: [
        "+15551234567",
        "+442012345678",
        "+61291234567", 
        "+33123456789"
      ]
    },
    {
      id: uuidv4(),
      name: "Digits Only",
      type: "Format",
      description: "Phone numbers with digits only (no formatting)",
      contextHint: "Generate phone numbers as digits only with country code prefix",
      exampleValues: [
        "15551234567",
        "442012345678",
        "61291234567",
        "33123456789"
      ]
    }
  ]
};
