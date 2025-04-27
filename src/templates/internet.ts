import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const emailTemplate: TemplateData = {
  id: uuidv4(),
  name: "Email Address",
  category: "Internet",
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
  category: "Internet",
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

export const domainNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Domain Name",
  category: "Internet",
  description: "Full domain names for websites",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic domain names",
      contextHint: "Generate realistic domain names",
      exampleValues: [
        "example.com",
        "acme-corp.net",
        "techsolutions.org",
        "quickshop.io"
      ]
    },
    {
      id: uuidv4(),
      name: "Business",
      type: "Category",
      description: "Business domain names",
      contextHint: "Generate domain names for businesses",
      exampleValues: [
        "acmecorp.com",
        "globaltechnologies.net",
        "innovativesolutions.org",
        "summit-enterprise.com"
      ]
    },
    {
      id: uuidv4(),
      name: "Tech",
      type: "Category",
      description: "Technology domain names",
      contextHint: "Generate domain names for tech companies",
      exampleValues: [
        "codeforge.io",
        "techstack.dev",
        "bytesolutions.net",
        "cloudsphere.tech"
      ]
    }
  ]
};

export const domainSuffixTemplate: TemplateData = {
  id: uuidv4(),
  name: "Domain Suffix",
  category: "Internet",
  description: "TLDs (Top Level Domains)",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common top-level domains",
      contextHint: "Generate common domain suffixes (TLDs)",
      exampleValues: [
        "com",
        "net",
        "org",
        "io"
      ]
    },
    {
      id: uuidv4(),
      name: "Country",
      type: "Category",
      description: "Country code top-level domains",
      contextHint: "Generate country-specific domain suffixes",
      exampleValues: [
        "us",
        "uk",
        "ca",
        "de",
        "jp"
      ]
    }
  ]
};

export const domainWordTemplate: TemplateData = {
  id: uuidv4(),
  name: "Domain Word",
  category: "Internet",
  description: "Words suitable for domain names (without TLDs)",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Simple domain word components",
      contextHint: "Generate words suitable for domain names (without TLDs)",
      exampleValues: [
        "example",
        "acme",
        "techsolutions",
        "quickshop"
      ]
    }
  ]
};

export const usernameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Username",
  category: "Internet",
  description: "Usernames for online accounts",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic usernames",
      contextHint: "Generate realistic usernames",
      exampleValues: [
        "john_doe",
        "emily.j",
        "techguy42",
        "coolcat99"
      ]
    },
    {
      id: uuidv4(),
      name: "Simple",
      type: "Format",
      description: "Simple name-based usernames",
      contextHint: "Generate simple usernames based on names",
      exampleValues: [
        "johndoe",
        "emilyj",
        "msmith",
        "sarahb"
      ]
    },
    {
      id: uuidv4(),
      name: "With Numbers",
      type: "Format",
      description: "Usernames with numbers",
      contextHint: "Generate usernames that include numbers",
      exampleValues: [
        "john123",
        "emily42",
        "msmith2023",
        "sarahb99"
      ]
    }
  ]
};

export const passwordTemplate: TemplateData = {
  id: uuidv4(),
  name: "Password",
  category: "Internet",
  description: "Secure passwords",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Medium-strength passwords",
      contextHint: "Generate realistic passwords of medium complexity",
      exampleValues: [
        "Pass1234",
        "SecureP@ss",
        "MyP@ssw0rd",
        "Qwerty12!"
      ]
    },
    {
      id: uuidv4(),
      name: "Strong",
      type: "Strength",
      description: "Strong complex passwords",
      contextHint: "Generate strong passwords with high complexity",
      exampleValues: [
        "uR5$hj2*Lp9!",
        "K7#pQz@2vX4&",
        "Tx6!mN3&Yp8$",
        "W9*bF5$kL2@h"
      ]
    },
    {
      id: uuidv4(),
      name: "Simple",
      type: "Strength",
      description: "Simple passwords",
      contextHint: "Generate simple passwords (less secure)",
      exampleValues: [
        "password123",
        "letmein",
        "welcome1",
        "qwerty"
      ]
    }
  ]
};

export const ipTemplate: TemplateData = {
  id: uuidv4(),
  name: "IP Address",
  category: "Internet",
  description: "IP addresses (v4 or v6)",
  fieldType: "VARCHAR",
  defaultLength: 45, // IPv6 can be up to 45 chars
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Mix of IPv4 and IPv6 addresses",
      contextHint: "Generate IP addresses (mix of v4 and v6)",
      exampleValues: [
        "192.168.1.1",
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "10.0.0.1",
        "fe80::1ff:fe23:4567:890a"
      ]
    }
  ]
};

export const ipv4Template: TemplateData = {
  id: uuidv4(),
  name: "IPv4 Address",
  category: "Internet",
  description: "IPv4 addresses",
  fieldType: "VARCHAR",
  defaultLength: 15,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic IPv4 addresses",
      contextHint: "Generate IPv4 addresses",
      exampleValues: [
        "192.168.1.1",
        "10.0.0.1",
        "172.16.254.1",
        "127.0.0.1"
      ]
    },
    {
      id: uuidv4(),
      name: "Private",
      type: "Category",
      description: "Private network IPv4 addresses",
      contextHint: "Generate private network IPv4 addresses",
      exampleValues: [
        "192.168.0.1",
        "10.0.0.15",
        "172.16.10.3",
        "192.168.1.254"
      ]
    }
  ]
};

export const ipv6Template: TemplateData = {
  id: uuidv4(),
  name: "IPv6 Address",
  category: "Internet",
  description: "IPv6 addresses",
  fieldType: "VARCHAR",
  defaultLength: 45,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic IPv6 addresses",
      contextHint: "Generate IPv6 addresses",
      exampleValues: [
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "fe80::1ff:fe23:4567:890a",
        "2001:db8:3333:4444:5555:6666:7777:8888",
        "2001:db8::"
      ]
    }
  ]
};

export const macAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "MAC Address",
  category: "Internet",
  description: "MAC addresses for network interfaces",
  fieldType: "VARCHAR",
  defaultLength: 17,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "MAC addresses with colons",
      contextHint: "Generate MAC addresses with colon separators",
      exampleValues: [
        "00:0a:95:9d:68:16",
        "e8:2a:ea:55:d4:8b",
        "5c:cf:7f:0c:1b:af",
        "00:00:00:00:00:00"
      ]
    },
    {
      id: uuidv4(),
      name: "Hyphenated",
      type: "Format",
      description: "MAC addresses with hyphens",
      contextHint: "Generate MAC addresses with hyphen separators",
      exampleValues: [
        "00-0a-95-9d-68-16",
        "e8-2a-ea-55-d4-8b",
        "5c-cf-7f-0c-1b-af",
        "00-00-00-00-00-00"
      ]
    }
  ]
};

export const urlTemplate: TemplateData = {
  id: uuidv4(),
  name: "URL",
  category: "Internet",
  description: "Website URLs",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic URLs",
      contextHint: "Generate realistic website URLs",
      exampleValues: [
        "https://example.com",
        "https://acme-corp.net/products",
        "http://techsolutions.org/about",
        "https://quickshop.io/catalog"
      ]
    },
    {
      id: uuidv4(),
      name: "Secure",
      type: "Protocol",
      description: "HTTPS URLs",
      contextHint: "Generate URLs using HTTPS protocol",
      exampleValues: [
        "https://example.com",
        "https://acme-corp.net",
        "https://techsolutions.org",
        "https://quickshop.io"
      ]
    },
    {
      id: uuidv4(),
      name: "With Path",
      type: "Format",
      description: "URLs with path components",
      contextHint: "Generate URLs that include paths",
      exampleValues: [
        "https://example.com/users/profile",
        "https://acme-corp.net/products/new",
        "http://techsolutions.org/about/team",
        "https://quickshop.io/catalog/items/1234"
      ]
    }
  ]
};

export const httpMethodTemplate: TemplateData = {
  id: uuidv4(),
  name: "HTTP Method",
  category: "Internet",
  description: "HTTP request methods",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common HTTP methods",
      contextHint: "Generate HTTP request methods",
      exampleValues: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH"
      ]
    },
    {
      id: uuidv4(),
      name: "All",
      type: "Extended",
      description: "All HTTP methods including less common ones",
      contextHint: "Generate all HTTP methods including less common ones",
      exampleValues: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "HEAD",
        "OPTIONS",
        "CONNECT",
        "TRACE"
      ]
    }
  ]
};

export const httpStatusCodeTemplate: TemplateData = {
  id: uuidv4(),
  name: "HTTP Status Code",
  category: "Internet",
  description: "HTTP response status codes",
  fieldType: "INT",
  defaultLength: null,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common HTTP status codes",
      contextHint: "Generate common HTTP status codes",
      exampleValues: [
        "200",
        "201",
        "400",
        "404",
        "500"
      ]
    },
    {
      id: uuidv4(),
      name: "Success",
      type: "Category",
      description: "Success (2xx) HTTP status codes",
      contextHint: "Generate success (2xx) HTTP status codes",
      exampleValues: [
        "200",
        "201",
        "202",
        "204"
      ]
    },
    {
      id: uuidv4(),
      name: "Client Error",
      type: "Category",
      description: "Client error (4xx) HTTP status codes",
      contextHint: "Generate client error (4xx) HTTP status codes",
      exampleValues: [
        "400",
        "401",
        "403",
        "404",
        "429"
      ]
    },
    {
      id: uuidv4(),
      name: "Server Error",
      type: "Category",
      description: "Server error (5xx) HTTP status codes",
      contextHint: "Generate server error (5xx) HTTP status codes",
      exampleValues: [
        "500",
        "501",
        "502",
        "503",
        "504"
      ]
    }
  ]
};

export const protocolTemplate: TemplateData = {
  id: uuidv4(),
  name: "Protocol",
  category: "Internet",
  description: "Network protocols",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common internet protocols",
      contextHint: "Generate common internet protocols",
      exampleValues: [
        "http",
        "https",
        "ftp",
        "ssh",
        "smtp"
      ]
    }
  ]
};

export const portTemplate: TemplateData = {
  id: uuidv4(),
  name: "Port Number",
  category: "Internet",
  description: "Network port numbers",
  fieldType: "INT",
  defaultLength: null,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random port numbers",
      contextHint: "Generate network port numbers",
      exampleValues: [
        "8080",
        "3000",
        "443",
        "22",
        "5432"
      ]
    },
    {
      id: uuidv4(),
      name: "Well Known",
      type: "Category",
      description: "Well-known port numbers",
      contextHint: "Generate well-known port numbers",
      exampleValues: [
        "80",   // HTTP
        "443",  // HTTPS
        "22",   // SSH
        "25",   // SMTP
        "3306"  // MySQL
      ]
    }
  ]
};

export const userAgentTemplate: TemplateData = {
  id: uuidv4(),
  name: "User Agent",
  category: "Internet",
  description: "Browser user agent strings",
  fieldType: "VARCHAR",
  defaultLength: 255,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random user agent strings",
      contextHint: "Generate browser user agent strings",
      exampleValues: [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
      ]
    },
    {
      id: uuidv4(),
      name: "Chrome",
      type: "Browser",
      description: "Chrome browser user agents",
      contextHint: "Generate Chrome browser user agent strings",
      exampleValues: [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
      ]
    },
    {
      id: uuidv4(),
      name: "Firefox",
      type: "Browser",
      description: "Firefox browser user agents",
      contextHint: "Generate Firefox browser user agent strings",
      exampleValues: [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0",
        "Mozilla/5.0 (X11; Linux i686; rv:88.0) Gecko/20100101 Firefox/88.0",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
      ]
    },
    {
      id: uuidv4(),
      name: "Mobile",
      type: "Device",
      description: "Mobile device user agents",
      contextHint: "Generate mobile device user agent strings",
      exampleValues: [
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0",
        "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
        "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
      ]
    }
  ]
};

export const colorTemplate: TemplateData = {
  id: uuidv4(),
  name: "Color",
  category: "Internet",
  description: "Color values in various formats",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random hex color codes",
      contextHint: "Generate hex color codes",
      exampleValues: [
        "#1a2b3c",
        "#ff4500",
        "#00ff00",
        "#8a2be2"
      ]
    },
    {
      id: uuidv4(),
      name: "RGB",
      type: "Format",
      description: "RGB format colors",
      contextHint: "Generate RGB format color values",
      exampleValues: [
        "rgb(26, 43, 60)",
        "rgb(255, 69, 0)",
        "rgb(0, 255, 0)",
        "rgb(138, 43, 226)"
      ]
    },
    {
      id: uuidv4(),
      name: "HSL",
      type: "Format",
      description: "HSL format colors",
      contextHint: "Generate HSL format color values",
      exampleValues: [
        "hsl(210, 37%, 17%)",
        "hsl(16, 100%, 50%)",
        "hsl(120, 100%, 50%)",
        "hsl(271, 76%, 53%)"
      ]
    },
    {
      id: uuidv4(),
      name: "Named",
      type: "Format",
      description: "Named CSS colors",
      contextHint: "Generate named CSS colors",
      exampleValues: [
        "red",
        "blue",
        "green",
        "purple",
        "orange"
      ]
    }
  ]
};

export const emojiTemplate: TemplateData = {
  id: uuidv4(),
  name: "Emoji",
  category: "Internet",
  description: "Emoji characters",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Random emoji characters",
      contextHint: "Generate emoji characters",
      exampleValues: [
        "😀",
        "👍",
        "🎉",
        "🚀",
        "❤️"
      ]
    },
    {
      id: uuidv4(),
      name: "Faces",
      type: "Category",
      description: "Face emoji characters",
      contextHint: "Generate face emoji characters",
      exampleValues: [
        "😀",
        "😊",
        "🙂",
        "😍",
        "🤔"
      ]
    },
    {
      id: uuidv4(),
      name: "Objects",
      type: "Category",
      description: "Object emoji characters",
      contextHint: "Generate object emoji characters",
      exampleValues: [
        "📱",
        "💻",
        "🎮",
        "📷",
        "🚗"
      ]
    }
  ]
};

export const jwtTemplate: TemplateData = {
  id: uuidv4(),
  name: "JWT Token",
  category: "Internet",
  description: "JSON Web Tokens",
  fieldType: "VARCHAR",
  defaultLength: 500,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard JWT tokens",
      contextHint: "Generate JSON Web Tokens",
      exampleValues: [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NjQ3ODkwMTIzIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.hZUOzExgFhvCOoMpnSe1YZMCqT6_yQOvYFZUC4WVjdg",
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg",
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.tyh-VfuzIxCyGYDlkBA7DfyjrqmSHu6pQ2hoZuFqUSLPNY2N0mpHb3nk5K17HWP_3cYHBw7AhHale5wky6-sVA"
      ]
    }
  ]
};

export const jwtAlgorithmTemplate: TemplateData = {
  id: uuidv4(),
  name: "JWT Algorithm",
  category: "Internet",
  description: "JWT signing algorithms",
  fieldType: "VARCHAR",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common JWT algorithms",
      contextHint: "Generate JWT signing algorithms",
      exampleValues: [
        "HS256",
        "RS256",
        "ES256",
        "HS384",
        "HS512"
      ]
    }
  ]
};

export const displayNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "Display Name",
  category: "Internet",
  description: "User display names for online platforms",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic display names",
      contextHint: "Generate user display names for online platforms",
      exampleValues: [
        "John Doe",
        "Emily J.",
        "TechGuy42",
        "CoolCat99"
      ]
    },
    {
      id: uuidv4(),
      name: "Professional",
      type: "Style",
      description: "Professional display names",
      contextHint: "Generate professional display names",
      exampleValues: [
        "John Doe",
        "Emily Johnson",
        "Michael Smith",
        "Sarah Brown"
      ]
    },
    {
      id: uuidv4(),
      name: "Casual",
      type: "Style",
      description: "Casual/nickname style display names",
      contextHint: "Generate casual display names",
      exampleValues: [
        "Johnny",
        "Em",
        "Mike",
        "Sari"
      ]
    }
  ]
};

export const exampleEmailTemplate: TemplateData = {
  id: uuidv4(),
  name: "Example Email",
  category: "Internet",
  description: "Email addresses with example.com domain",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Email addresses with example.com domain",
      contextHint: "Generate email addresses with example.com domain",
      exampleValues: [
        "john.doe@example.com",
        "emily.johnson@example.com",
        "msmith@example.com",
        "sarah.brown@example.com"
      ]
    }
  ]
};