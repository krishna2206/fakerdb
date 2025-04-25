import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const sexTemplate: TemplateData = {
  id: uuidv4(),
  name: "Sex",
  category: "Human Data",
  description: "Biological sex",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Biological sex",
      contextHint: "Generate biological sex",
      exampleValues: [
        "Female",
        "Male"
      ]
    }
  ]
};

export const sexTypeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Sex Type",
  category: "Human Data",
  description: "Sex type abbreviation",
  fieldType: "CHAR",
  defaultLength: 1,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Abbreviated sex type (F/M)",
      contextHint: "Generate sex type abbreviations (F/M)",
      exampleValues: [
        "F",
        "M"
      ]
    }
  ]
};

export const jobAreaTemplate: TemplateData = {
  id: uuidv4(),
  name: "Job Area",
  category: "Human Data",
  description: "Professional field or department",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common job areas/departments",
      contextHint: "Generate job areas or departments",
      exampleValues: [
        "Engineering",
        "Marketing",
        "Sales",
        "Human Resources",
        "Finance",
        "Product",
        "Research",
        "Legal",
        "Operations"
      ]
    }
  ]
};

export const jobDescriptorTemplate: TemplateData = {
  id: uuidv4(),
  name: "Job Descriptor",
  category: "Human Data",
  description: "Adjectives describing job roles",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Adjectives commonly used in job titles",
      contextHint: "Generate job descriptors/adjectives",
      exampleValues: [
        "Senior",
        "Lead",
        "Principal",
        "Global",
        "Chief",
        "Regional",
        "Associate",
        "Junior",
        "Executive"
      ]
    }
  ]
};

export const jobTypeTemplate: TemplateData = {
  id: uuidv4(),
  name: "Job Type",
  category: "Human Data",
  description: "Types of jobs/positions",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common job types",
      contextHint: "Generate job types",
      exampleValues: [
        "Manager",
        "Supervisor",
        "Engineer",
        "Analyst",
        "Coordinator",
        "Developer",
        "Designer",
        "Specialist",
        "Director"
      ]
    }
  ]
};

export const jobTitleTemplate: TemplateData = {
  id: uuidv4(),
  name: "Job Title",
  category: "Human Data",
  description: "Professional job titles for people",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic job titles",
      contextHint: "Generate realistic job titles",
      exampleValues: [
        "Senior Program Developer",
        "Corporate Identity Director",
        "District Applications Representative",
        "Lead Marketing Coordinator"
      ]
    },
    {
      id: uuidv4(),
      name: "Technical",
      type: "Field",
      description: "Technical job titles",
      contextHint: "Generate technical/IT job titles",
      exampleValues: [
        "Senior Software Engineer",
        "Full Stack Developer",
        "Cloud Infrastructure Architect",
        "IT Systems Administrator"
      ]
    },
    {
      id: uuidv4(),
      name: "Management",
      type: "Field",
      description: "Management job titles",
      contextHint: "Generate management job titles",
      exampleValues: [
        "Product Manager",
        "Director of Operations",
        "Chief Technology Officer",
        "Team Lead"
      ]
    },
    {
      id: uuidv4(),
      name: "Marketing",
      type: "Field",
      description: "Marketing job titles",
      contextHint: "Generate marketing job titles",
      exampleValues: [
        "Marketing Director",
        "Digital Marketing Specialist",
        "Brand Strategist",
        "Content Marketing Manager"
      ]
    }
  ]
};

export const genderTemplate: TemplateData = {
  id: uuidv4(),
  name: "Gender",
  category: "Human Data",
  description: "Gender identity",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Inclusive gender identities",
      contextHint: "Generate diverse gender identities",
      exampleValues: [
        "Female",
        "Male",
        "Non-binary",
        "Genderfluid"
      ]
    },
    {
      id: uuidv4(),
      name: "Binary",
      type: "Format",
      description: "Binary gender options",
      contextHint: "Generate binary gender options (male/female)",
      exampleValues: [
        "Female",
        "Male"
      ]
    }
  ]
};

export const zodiacSignTemplate: TemplateData = {
  id: uuidv4(),
  name: "Zodiac Sign",
  category: "Human Data",
  description: "Astrological zodiac signs",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Astrological zodiac signs",
      contextHint: "Generate zodiac signs",
      exampleValues: [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces"
      ]
    }
  ]
};

export const bioTemplate: TemplateData = {
  id: uuidv4(),
  name: "Bio",
  category: "Human Data",
  description: "Short personal biographies",
  fieldType: "TEXT",
  defaultLength: 500,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Short personal biographies",
      contextHint: "Generate realistic personal biographies",
      exampleValues: [
        "Coffee enthusiast. Proud bacon specialist. Certified food aficionado.",
        "Music fanatic. Friendly entrepreneur. Amateur internet buff. Passionate gamer.",
        "Professional travel junkie. Incurable pop culture advocate. Lifelong social media geek.",
        "Dedicated coffee maven. Award-winning beer trailblazer. Passionate foodie."
      ]
    },
    {
      id: uuidv4(),
      name: "Professional",
      type: "Style",
      description: "Professional biographies for career contexts",
      contextHint: "Generate professional biographies for business profiles",
      exampleValues: [
        "Experienced software developer with 10+ years specializing in cloud architecture and distributed systems.",
        "Product marketing professional with expertise in go-to-market strategies for SaaS platforms.",
        "Certified project manager with track record of successful implementations in the financial sector.",
        "UX researcher focusing on creating accessible and intuitive user experiences for diverse audiences."
      ]
    },
    {
      id: uuidv4(),
      name: "Social Media",
      type: "Style",
      description: "Casual biographies for social platforms",
      contextHint: "Generate casual biographies for social media profiles",
      exampleValues: [
        "Coffee enthusiast. Dog lover. Adventure seeker. Yoga instructor by day, bookworm by night.",
        "Foodie exploring the world one bite at a time. Photography hobbyist. Proud plant parent.",
        "Digital nomad living the laptop lifestyle. Sunset chaser. Beach volleyball enthusiast.",
        "Fitness coach helping others reach their goals. Hiker. Podcast addict. Tea drinker."
      ]
    }
  ]
};