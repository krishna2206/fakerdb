import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const departmentTemplate: TemplateData = {
  id: uuidv4(),
  name: "department",
  category: "Commerce",
  description: "Department name within a store or organization",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common department names",
      contextHint: "Generate retail department names",
      exampleValues: [
        "Books",
        "Electronics",
        "Home",
        "Garden",
        "Toys",
        "Sports",
        "Clothing"
      ]
    },
    {
      id: uuidv4(),
      name: "Grocery",
      type: "Category",
      description: "Grocery store departments",
      contextHint: "Generate grocery store department names",
      exampleValues: [
        "Produce",
        "Bakery",
        "Dairy",
        "Meat",
        "Seafood",
        "Frozen Foods",
        "Deli"
      ]
    },
    {
      id: uuidv4(),
      name: "Corporate",
      type: "Category",
      description: "Corporate department names",
      contextHint: "Generate corporate department names",
      exampleValues: [
        "Human Resources",
        "Finance",
        "Marketing",
        "IT",
        "Sales",
        "Research & Development",
        "Customer Service"
      ]
    }
  ]
};

export const isbnTemplate: TemplateData = {
  id: uuidv4(),
  name: "isbn",
  category: "Commerce",
  description: "International Standard Book Number",
  fieldType: "VARCHAR",
  defaultLength: 17,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard ISBN-13 format with hyphens",
      contextHint: "Generate valid ISBN-13 numbers with hyphens",
      exampleValues: [
        "978-3-16-148410-0",
        "978-1-4028-9462-6",
        "978-0-306-40615-7",
        "978-0-7653-5618-4"
      ]
    },
    {
      id: uuidv4(),
      name: "ISBN-13",
      type: "Format",
      description: "ISBN-13 format without hyphens",
      contextHint: "Generate valid ISBN-13 numbers without hyphens",
      exampleValues: [
        "9783161484100",
        "9781402894626",
        "9780306406157",
        "9780765356184"
      ]
    },
    {
      id: uuidv4(),
      name: "ISBN-10",
      type: "Format",
      description: "Legacy ISBN-10 format with hyphens",
      contextHint: "Generate valid ISBN-10 numbers with hyphens",
      exampleValues: [
        "0-306-40615-2",
        "0-7653-5618-2",
        "1-4028-9462-7",
        "3-16-148410-X"
      ]
    }
  ]
};

export const priceTemplate: TemplateData = {
  id: uuidv4(),
  name: "price",
  category: "Commerce",
  description: "Product or service price",
  fieldType: "DECIMAL",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard price in USD with decimal",
      contextHint: "Generate realistic USD prices with decimal points",
      exampleValues: [
        "29.99",
        "199.95",
        "9.99",
        "49.50"
      ]
    },
    {
      id: uuidv4(),
      name: "USD",
      type: "Currency",
      description: "Prices with USD symbol",
      contextHint: "Generate USD prices with $ symbol",
      exampleValues: [
        "$29.99",
        "$199.95",
        "$9.99",
        "$49.50"
      ]
    },
    {
      id: uuidv4(),
      name: "EUR",
      type: "Currency",
      description: "Prices with EUR symbol",
      contextHint: "Generate EUR prices with € symbol",
      exampleValues: [
        "€29.99",
        "€199.95",
        "€9.99",
        "€49.50"
      ]
    },
    {
      id: uuidv4(),
      name: "GBP",
      type: "Currency",
      description: "Prices with GBP symbol",
      contextHint: "Generate GBP prices with £ symbol",
      exampleValues: [
        "£29.99",
        "£199.95",
        "£9.99",
        "£49.50"
      ]
    },
    {
      id: uuidv4(),
      name: "JPY",
      type: "Currency",
      description: "Prices in Japanese Yen (whole numbers)",
      contextHint: "Generate JPY prices with ¥ symbol (no decimals)",
      exampleValues: [
        "¥3000",
        "¥19995",
        "¥999",
        "¥4950"
      ]
    },
    {
      id: uuidv4(),
      name: "Premium",
      type: "Range",
      description: "Higher price points for premium products",
      contextHint: "Generate premium price points (higher values)",
      exampleValues: [
        "299.99",
        "499.95",
        "899.00",
        "1299.95"
      ]
    },
    {
      id: uuidv4(),
      name: "Budget",
      type: "Range",
      description: "Lower price points for budget products",
      contextHint: "Generate budget price points (lower values)",
      exampleValues: [
        "9.99",
        "14.95",
        "4.99",
        "19.95"
      ]
    }
  ]
};

export const productTemplate: TemplateData = {
  id: uuidv4(),
  name: "product",
  category: "Commerce",
  description: "Product name",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Generic product names",
      contextHint: "Generate realistic product names",
      exampleValues: [
        "Practical Granite Shirt",
        "Incredible Cotton Computer",
        "Refined Metal Car",
        "Handcrafted Wooden Keyboard"
      ]
    },
    {
      id: uuidv4(),
      name: "Electronics",
      type: "Category",
      description: "Electronic product names",
      contextHint: "Generate electronic product names",
      exampleValues: [
        "Smart Ultra HD Television",
        "Wireless Noise-Cancelling Headphones",
        "Ultra-Slim Gaming Laptop",
        "Professional DSLR Camera"
      ]
    },
    {
      id: uuidv4(),
      name: "Clothing",
      type: "Category",
      description: "Clothing product names",
      contextHint: "Generate clothing product names",
      exampleValues: [
        "Slim Fit Cotton T-Shirt",
        "Wool Blend Winter Coat",
        "Relaxed Fit Jeans",
        "Moisture-Wicking Athletic Shorts"
      ]
    },
    {
      id: uuidv4(),
      name: "Furniture",
      type: "Category",
      description: "Furniture product names",
      contextHint: "Generate furniture product names",
      exampleValues: [
        "Modern Sectional Sofa",
        "Rustic Oak Dining Table",
        "Ergonomic Office Chair",
        "Mid-Century Accent Cabinet"
      ]
    },
    {
      id: uuidv4(),
      name: "Beauty",
      type: "Category",
      description: "Beauty product names",
      contextHint: "Generate beauty product names",
      exampleValues: [
        "Hydrating Facial Serum",
        "Volumizing Mascara",
        "Rejuvenating Night Cream",
        "Matte Finish Foundation"
      ]
    }
  ]
};

export const productAdjectiveTemplate: TemplateData = {
  id: uuidv4(),
  name: "productAdjective",
  category: "Commerce",
  description: "Adjectives for describing products",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common product adjectives",
      contextHint: "Generate product adjectives",
      exampleValues: [
        "Small",
        "Ergonomic",
        "Rustic",
        "Intelligent",
        "Gorgeous",
        "Incredible",
        "Fantastic",
        "Practical",
        "Sleek",
        "Handcrafted"
      ]
    },
    {
      id: uuidv4(),
      name: "Quality",
      type: "Category",
      description: "Quality-related adjectives",
      contextHint: "Generate quality-related product adjectives",
      exampleValues: [
        "Premium",
        "Luxury",
        "High-End",
        "Superior",
        "Exceptional",
        "Professional-Grade",
        "Top-Tier"
      ]
    },
    {
      id: uuidv4(),
      name: "Design",
      type: "Category",
      description: "Design-related adjectives",
      contextHint: "Generate design-related product adjectives",
      exampleValues: [
        "Elegant",
        "Modern",
        "Minimalist",
        "Ergonomic",
        "Sleek",
        "Aerodynamic",
        "Compact"
      ]
    }
  ]
};

export const productDescriptionTemplate: TemplateData = {
  id: uuidv4(),
  name: "productDescription",
  category: "Commerce",
  description: "Product description text",
  fieldType: "TEXT",
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard product descriptions",
      contextHint: "Generate realistic product descriptions",
      exampleValues: [
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J.",
        "The Football Is Good For Training And Recreational Purposes",
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"
      ]
    },
    {
      id: uuidv4(),
      name: "Short",
      type: "Format",
      description: "Brief product descriptions",
      contextHint: "Generate brief product descriptions (1-2 sentences)",
      exampleValues: [
        "Premium wireless earbuds with active noise cancellation and 24-hour battery life.",
        "Handcrafted leather wallet with RFID blocking technology and multiple card slots.",
        "Ergonomic office chair with lumbar support and breathable mesh back.",
        "Ultra-lightweight hiking boots with waterproof membrane and superior traction."
      ]
    },
    {
      id: uuidv4(),
      name: "Detailed",
      type: "Format",
      description: "Comprehensive product descriptions",
      contextHint: "Generate detailed product descriptions (3+ sentences)",
      exampleValues: [
        "Experience superior sound quality with our premium wireless earbuds. Featuring active noise cancellation technology, these earbuds block out ambient noise for an immersive listening experience. With 24-hour battery life including the charging case, touch controls, and IPX7 water resistance, they're perfect for any lifestyle.",
        "Crafted from genuine full-grain leather, this wallet combines classic style with modern functionality. The RFID blocking technology protects your personal information from electronic theft. Features 8 card slots, 2 currency compartments, and a slim profile that fits comfortably in any pocket.",
        "Transform your workspace with this ergonomic office chair designed for all-day comfort. The breathable mesh back provides optimal airflow, while the adjustable lumbar support conforms to your spine's natural curve. With customizable armrests, seat height, and tilt tension, you can personalize your sitting experience for maximum productivity.",
        "Engineered for serious hikers, these ultra-lightweight boots provide exceptional performance on any terrain. The waterproof membrane keeps your feet dry while allowing moisture to escape, and the Vibram outsole delivers superior traction on wet and dry surfaces. Featuring memory foam insoles and ankle support, they offer unmatched comfort on long trails."
      ]
    },
    {
      id: uuidv4(),
      name: "Technical",
      type: "Style",
      description: "Technical product descriptions",
      contextHint: "Generate technical product descriptions with specifications",
      exampleValues: [
        "Model XPS-15 features an Intel Core i7-12700H processor (14 cores, up to 4.7GHz), 32GB DDR5 RAM, 1TB NVMe SSD, and NVIDIA RTX 3060 graphics with 6GB GDDR6 memory. The 15.6\" OLED display offers 3840x2160 resolution with 100% DCI-P3 color gamut and 400-nit brightness.",
        "This DSLR camera boasts a 24.1MP APS-C CMOS sensor with ISO range 100-25600 (expandable to 51200), DIGIC 8 image processor, and continuous shooting at 10fps. Features 45-point all cross-type AF system, 4K video recording at 30fps, and built-in Wi-Fi and Bluetooth.",
        "Constructed with 7075-T6 aluminum frame, carbon fiber fork, and Shimano Ultegra R8000 11-speed groupset. Features hydraulic disc brakes, tubeless-ready 700c wheels with 28mm tires, and internal cable routing. Weighs 8.2kg (18.1lbs) in size medium.",
        "This monitor utilizes IPS panel technology with 27\" screen size, 2560x1440 resolution, 165Hz refresh rate, and 1ms GtG response time. Supports HDR10, 95% DCI-P3 color space, AMD FreeSync Premium Pro, and includes DisplayPort 1.4, HDMI 2.0, and USB 3.0 hub."
      ]
    },
    {
      id: uuidv4(),
      name: "Marketing",
      type: "Style",
      description: "Marketing-focused product descriptions",
      contextHint: "Generate persuasive marketing product descriptions",
      exampleValues: [
        "Discover unparalleled comfort with our revolutionary memory foam mattress. Wake up refreshed and energized every morning as the adaptive foam contours perfectly to your body, relieving pressure points and providing optimal spinal alignment. Say goodbye to restless nights and hello to the sleep of your dreams!",
        "Elevate your kitchen experience with the chef-approved Culinary Pro Mixer. Whip up gourmet creations with ease thanks to the powerful 750-watt motor and 10 versatile speed settings. From fluffy meringues to hearty bread dough, this kitchen essential handles it all while looking stunning on your countertop.",
        "Transform your skincare routine with our breakthrough Radiance Renewal Serum. Infused with potent antioxidants and peptides, this luxurious formula visibly reduces fine lines and restores your skin's natural glow. Clinically proven to improve skin texture and firmness in just two weeks - your path to ageless beauty starts here.",
        "Take your fitness journey to new heights with the Elite Performance Smart Watch. Track your workouts with pinpoint accuracy, monitor your heart rate 24/7, and receive personalized coaching directly on your wrist. With 7-day battery life and sleek, water-resistant design, it's the perfect companion for crushing your fitness goals."
      ]
    }
  ]
};

export const productMaterialTemplate: TemplateData = {
  id: uuidv4(),
  name: "productMaterial",
  category: "Commerce",
  description: "Materials used in products",
  fieldType: "VARCHAR",
  defaultLength: 50,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common product materials",
      contextHint: "Generate product materials",
      exampleValues: [
        "Steel",
        "Wooden",
        "Concrete",
        "Plastic",
        "Cotton",
        "Granite",
        "Rubber",
        "Metal",
        "Soft",
        "Fresh"
      ]
    },
    {
      id: uuidv4(),
      name: "Furniture",
      type: "Category",
      description: "Furniture materials",
      contextHint: "Generate furniture materials",
      exampleValues: [
        "Oak",
        "Maple",
        "Walnut",
        "Leather",
        "Velvet",
        "Tempered Glass",
        "Rattan",
        "Marble"
      ]
    },
    {
      id: uuidv4(),
      name: "Clothing",
      type: "Category",
      description: "Clothing materials",
      contextHint: "Generate clothing materials",
      exampleValues: [
        "Cotton",
        "Wool",
        "Silk",
        "Linen",
        "Polyester",
        "Cashmere",
        "Denim",
        "Nylon"
      ]
    },
    {
      id: uuidv4(),
      name: "Electronics",
      type: "Category",
      description: "Electronics materials",
      contextHint: "Generate electronics materials",
      exampleValues: [
        "Aluminum",
        "Polycarbonate",
        "Tempered Glass",
        "Silicone",
        "ABS Plastic",
        "Carbon Fiber",
        "Ceramic"
      ]
    },
    {
      id: uuidv4(),
      name: "Premium",
      type: "Quality",
      description: "Premium product materials",
      contextHint: "Generate premium product materials",
      exampleValues: [
        "Italian Leather",
        "Solid Mahogany",
        "Aircraft-Grade Aluminum",
        "Japanese Steel",
        "Merino Wool",
        "Organic Cotton",
        "Carbon Fiber"
      ]
    }
  ]
};

export const productNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "productName",
  category: "Commerce",
  description: "Product name with adjective and material",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Combined product names with adjective and material",
      contextHint: "Generate product names with adjective and material",
      exampleValues: [
        "Sleek Wooden Chair",
        "Ergonomic Steel Computer",
        "Handcrafted Cotton Gloves",
        "Intelligent Granite Table"
      ]
    },
    {
      id: uuidv4(),
      name: "Electronics",
      type: "Category",
      description: "Electronic product names with adjective and material",
      contextHint: "Generate electronic product names with adjective and material",
      exampleValues: [
        "Sleek Aluminum Smartphone",
        "Wireless Carbon Fiber Headphones",
        "Smart Glass Tablet",
        "Ergonomic Metal Keyboard"
      ]
    },
    {
      id: uuidv4(),
      name: "Furniture",
      type: "Category",
      description: "Furniture product names with adjective and material",
      contextHint: "Generate furniture product names with adjective and material",
      exampleValues: [
        "Modern Oak Dining Table",
        "Ergonomic Leather Office Chair",
        "Rustic Walnut Bookshelf",
        "Elegant Marble Coffee Table"
      ]
    },
    {
      id: uuidv4(),
      name: "Clothing",
      type: "Category",
      description: "Clothing product names with adjective and material",
      contextHint: "Generate clothing product names with adjective and material",
      exampleValues: [
        "Comfortable Cotton T-Shirt",
        "Durable Denim Jeans",
        "Luxurious Silk Scarf",
        "Waterproof Nylon Jacket"
      ]
    },
    {
      id: uuidv4(),
      name: "Premium",
      type: "Quality",
      description: "Premium product names with adjective and material",
      contextHint: "Generate premium product names with adjective and material",
      exampleValues: [
        "Handcrafted Italian Leather Wallet",
        "Premium Japanese Steel Chef's Knife",
        "Luxury Merino Wool Sweater",
        "Artisanal Solid Oak Desk"
      ]
    }
  ]
};