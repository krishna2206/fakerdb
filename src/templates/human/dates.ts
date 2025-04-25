import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const dateOfBirthTemplate: TemplateData = {
  id: uuidv4(),
  name: "Date of Birth",
  category: "Human Data",
  description: "A person's date of birth",
  fieldType: "DATE",
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "ISO format dates (YYYY-MM-DD)",
      contextHint: "Generate dates in ISO format YYYY-MM-DD",
      exampleValues: [
        "1985-04-12",
        "1992-10-23",
        "1976-01-30",
        "2000-12-05"
      ]
    },
    {
      id: uuidv4(),
      name: "MM/DD/YYYY Format",
      type: "Format",
      description: "Dates in MM/DD/YYYY format",
      contextHint: "Generate dates in MM/DD/YYYY format",
      exampleValues: [
        "04/12/1985",
        "10/23/1992",
        "01/30/1976",
        "12/05/2000"
      ]
    },
    {
      id: uuidv4(),
      name: "DD/MM/YYYY Format",
      type: "Format",
      description: "Dates in DD/MM/YYYY format",
      contextHint: "Generate dates in DD/MM/YYYY format",
      exampleValues: [
        "12/04/1985",
        "23/10/1992",
        "30/01/1976",
        "05/12/2000"
      ]
    },
    {
      id: uuidv4(),
      name: "Month D, YYYY Format",
      type: "Format",
      description: "Dates with month name (Month D, YYYY)",
      contextHint: "Generate dates with month name in format 'Month D, YYYY'",
      exampleValues: [
        "April 12, 1985",
        "October 23, 1992",
        "January 30, 1976",
        "December 5, 2000"
      ]
    },
    {
      id: uuidv4(),
      name: "MMM D, YYYY Format",
      type: "Format",
      description: "Dates with abbreviated month (MMM D, YYYY)",
      contextHint: "Generate dates with abbreviated month name in format 'MMM D, YYYY'",
      exampleValues: [
        "Apr 12, 1985",
        "Oct 23, 1992",
        "Jan 30, 1976",
        "Dec 5, 2000"
      ]
    },
    {
      id: uuidv4(),
      name: "YYYY-MM-DD Timestamp",
      type: "Format",
      description: "Dates with timestamp (YYYY-MM-DD HH:MM:SS)",
      contextHint: "Generate dates with timestamp in format 'YYYY-MM-DD HH:MM:SS'",
      exampleValues: [
        "1985-04-12 09:30:00",
        "1992-10-23 14:25:37",
        "1976-01-30 08:15:22",
        "2000-12-05 18:45:10"
      ]
    },
    {
      id: uuidv4(),
      name: "Unix Timestamp",
      type: "Format",
      description: "Dates as Unix timestamps (seconds since epoch)",
      contextHint: "Generate dates as Unix timestamps (seconds since Jan 1, 1970)",
      exampleValues: [
        "482140800",  // 1985-04-12
        "719848800",  // 1992-10-23
        "191700000",  // 1976-01-30
        "975974400"   // 2000-12-05
      ]
    }
  ]
};

export const currentDateTemplate: TemplateData = {
  id: uuidv4(),
  name: "Current Date",
  category: "Human Data",
  description: "Current or recent dates",
  fieldType: "DATE",
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Current date in ISO format (YYYY-MM-DD)",
      contextHint: "Generate current or recent dates in ISO format",
      exampleValues: [
        "2025-04-24",
        "2025-04-23",
        "2025-04-22",
        "2025-04-21"
      ]
    },
    {
      id: uuidv4(),
      name: "MM/DD/YYYY Format",
      type: "Format",
      description: "Current date in MM/DD/YYYY format",
      contextHint: "Generate current or recent dates in MM/DD/YYYY format",
      exampleValues: [
        "04/24/2025",
        "04/23/2025",
        "04/22/2025",
        "04/21/2025"
      ]
    },
    {
      id: uuidv4(),
      name: "DD/MM/YYYY Format",
      type: "Format",
      description: "Current date in DD/MM/YYYY format",
      contextHint: "Generate current or recent dates in DD/MM/YYYY format",
      exampleValues: [
        "24/04/2025",
        "23/04/2025",
        "22/04/2025",
        "21/04/2025"
      ]
    },
    {
      id: uuidv4(),
      name: "Month D, YYYY Format",
      type: "Format",
      description: "Current date with month name (Month D, YYYY)",
      contextHint: "Generate current or recent dates with month name",
      exampleValues: [
        "April 24, 2025",
        "April 23, 2025",
        "April 22, 2025",
        "April 21, 2025"
      ]
    },
    {
      id: uuidv4(),
      name: "MMM D, YYYY Format",
      type: "Format",
      description: "Current date with abbreviated month (MMM D, YYYY)",
      contextHint: "Generate current or recent dates with abbreviated month name",
      exampleValues: [
        "Apr 24, 2025",
        "Apr 23, 2025",
        "Apr 22, 2025",
        "Apr 21, 2025"
      ]
    }
  ]
};
