import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const emailTemplate: TemplateData = {
  id: uuidv4(),
  name: "Email Address",
  category: "Human Data",
  description: "Email addresses for users",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic email addresses",
      contextHint: "Generate realistic email addresses",
      exampleValues: [
        "john.doe@example.com",
        "emily.johnson@gmail.com",
        "m.smith@outlook.com",
        "sarah_brown123@yahoo.com"
      ]
    },
    {
      id: uuidv4(),
      name: "Gmail",
      type: "Provider",
      description: "Gmail email addresses",
      contextHint: "Generate Gmail email addresses",
      exampleValues: [
        "johndoe@gmail.com",
        "emily.johnson@gmail.com",
        "msmith2023@gmail.com",
        "sarah.brown123@gmail.com"
      ]
    },
    {
      id: uuidv4(),
      name: "Outlook/Hotmail",
      type: "Provider",
      description: "Microsoft email addresses",
      contextHint: "Generate Outlook or Hotmail email addresses",
      exampleValues: [
        "john.doe@outlook.com",
        "emily_johnson@hotmail.com",
        "m.smith@outlook.com",
        "sarah.brown@hotmail.com"
      ]
    },
    {
      id: uuidv4(),
      name: "Yahoo",
      type: "Provider",
      description: "Yahoo email addresses",
      contextHint: "Generate Yahoo email addresses",
      exampleValues: [
        "john_doe@yahoo.com",
        "emily.johnson@yahoo.com",
        "msmith2023@yahoo.com",
        "sarah_brown123@yahoo.com"
      ]
    },
    {
      id: uuidv4(),
      name: "Company Domain",
      type: "Provider",
      description: "Business email addresses",
      contextHint: "Generate business email addresses with company domains",
      exampleValues: [
        "john.doe@company.com",
        "emily.j@enterprise.org",
        "msmith@corporation.co.uk",
        "sarah.brown@business.net"
      ]
    },
    {
      id: uuidv4(),
      name: "Full Name Format",
      type: "Format",
      description: "Email addresses with full name before @",
      contextHint: "Generate email addresses using full names before the @ symbol",
      exampleValues: [
        "johndoe@example.com",
        "emilyjohnson@gmail.com",
        "michaelsmith@outlook.com",
        "sarahbrown@yahoo.com"
      ]
    },
    {
      id: uuidv4(),
      name: "First Initial Last Name",
      type: "Format",
      description: "Email with first initial and last name",
      contextHint: "Generate email addresses using first initial plus last name format",
      exampleValues: [
        "jdoe@example.com",
        "ejohnson@gmail.com",
        "msmith@outlook.com",
        "sbrown@yahoo.com"
      ]
    }
  ]
};

export const workEmailTemplate: TemplateData = {
  id: uuidv4(),
  name: "Work Email",
  category: "Human Data",
  description: "Business email addresses for professional contexts",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic work email addresses",
      contextHint: "Generate realistic work/business email addresses",
      exampleValues: [
        "john.doe@company.com",
        "emily.johnson@enterprise.org",
        "m.smith@corporation.co.uk",
        "sarah.brown@business.net"
      ]
    },
    {
      id: uuidv4(),
      name: "First Last Format",
      type: "Format",
      description: "First name.last name format",
      contextHint: "Generate work emails using firstname.lastname@company format",
      exampleValues: [
        "john.doe@company.com",
        "emily.johnson@enterprise.org",
        "michael.smith@corporation.co.uk",
        "sarah.brown@business.net"
      ]
    },
    {
      id: uuidv4(),
      name: "First Initial Last Format",
      type: "Format",
      description: "First initial.last name format",
      contextHint: "Generate work emails using first initial plus lastname@company format",
      exampleValues: [
        "j.doe@company.com",
        "e.johnson@enterprise.org",
        "m.smith@corporation.co.uk",
        "s.brown@business.net"
      ]
    }
  ]
};