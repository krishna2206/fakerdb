// filepath: /Users/krishna/Dev/fakerdb/src/templates/finance.ts
import { TemplateData } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const accountNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "accountName",
  category: "Finance",
  description: "Bank account name or type",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common bank account names",
      contextHint: "Generate bank account names",
      exampleValues: [
        "Checking Account",
        "Savings Account",
        "Money Market Account",
        "Certificate of Deposit",
        "Individual Retirement Account"
      ]
    },
    {
      id: uuidv4(),
      name: "Personal",
      type: "Category",
      description: "Personal bank account names",
      contextHint: "Generate personal bank account names",
      exampleValues: [
        "Personal Checking",
        "Premier Savings",
        "Student Checking",
        "High-Yield Savings",
        "Vacation Fund"
      ]
    },
    {
      id: uuidv4(),
      name: "Business",
      type: "Category",
      description: "Business bank account names",
      contextHint: "Generate business bank account names",
      exampleValues: [
        "Business Checking",
        "Corporate Savings",
        "Merchant Services Account",
        "Business Growth Fund",
        "Payroll Account"
      ]
    }
  ]
};

export const accountNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "accountNumber",
  category: "Finance",
  description: "Bank account number",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard bank account number format",
      contextHint: "Generate bank account numbers",
      exampleValues: [
        "1234567890",
        "9876543210",
        "5678901234",
        "3456789012"
      ]
    },
    {
      id: uuidv4(),
      name: "US",
      type: "Country",
      description: "US bank account number format (typically 10-12 digits)",
      contextHint: "Generate US bank account numbers",
      exampleValues: [
        "123456789012",
        "567890123456",
        "901234567890",
        "345678901234"
      ]
    },
    {
      id: uuidv4(),
      name: "UK",
      type: "Country",
      description: "UK bank account number format (typically 8 digits)",
      contextHint: "Generate UK bank account numbers",
      exampleValues: [
        "12345678",
        "87654321",
        "23456789",
        "98765432"
      ]
    }
  ]
};

export const amountTemplate: TemplateData = {
  id: uuidv4(),
  name: "amount",
  category: "Finance",
  description: "Monetary amount",
  fieldType: "DECIMAL",
  defaultLength: 10,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard monetary amount with decimal",
      contextHint: "Generate monetary amounts with two decimal places",
      exampleValues: [
        "125.00",
        "899.99",
        "1250.50",
        "75.25"
      ]
    },
    {
      id: uuidv4(),
      name: "Small",
      type: "Range",
      description: "Small monetary amounts (under 100)",
      contextHint: "Generate small monetary amounts under 100",
      exampleValues: [
        "12.99",
        "45.50",
        "7.25",
        "99.99"
      ]
    },
    {
      id: uuidv4(),
      name: "Medium",
      type: "Range",
      description: "Medium monetary amounts (100-1000)",
      contextHint: "Generate medium monetary amounts between 100 and 1000",
      exampleValues: [
        "199.99",
        "525.50",
        "750.00",
        "899.95"
      ]
    },
    {
      id: uuidv4(),
      name: "Large",
      type: "Range",
      description: "Large monetary amounts (1000+)",
      contextHint: "Generate large monetary amounts over 1000",
      exampleValues: [
        "1250.00",
        "5499.99",
        "10000.00",
        "25750.50"
      ]
    }
  ]
};

export const bicTemplate: TemplateData = {
  id: uuidv4(),
  name: "bic",
  category: "Finance",
  description: "Bank Identifier Code (BIC/SWIFT code)",
  fieldType: "VARCHAR",
  defaultLength: 11,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard BIC/SWIFT code format",
      contextHint: "Generate BIC/SWIFT codes",
      exampleValues: [
        "DEUTDEFF",
        "CHASUS33",
        "BARCGB22",
        "BNPAFRPP"
      ]
    },
    {
      id: uuidv4(),
      name: "Extended",
      type: "Format",
      description: "BIC/SWIFT code with branch code (11 characters)",
      contextHint: "Generate extended BIC/SWIFT codes with branch codes",
      exampleValues: [
        "DEUTDEFF500",
        "CHASUS33XXX",
        "BARCGB22LAD",
        "BNPAFRPPXXX"
      ]
    }
  ]
};

export const bitcoinAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "bitcoinAddress",
  category: "Finance",
  description: "Bitcoin wallet address",
  fieldType: "VARCHAR",
  defaultLength: 42,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Bitcoin address format",
      contextHint: "Generate Bitcoin wallet addresses",
      exampleValues: [
        "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
        "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
        "14qViLJfdGaP4EeHnDyJbEGQysnCpwk3gd"
      ]
    }
  ]
};

export const creditCardCVVTemplate: TemplateData = {
  id: uuidv4(),
  name: "creditCardCVV",
  category: "Finance",
  description: "Credit card CVV security code",
  fieldType: "VARCHAR",
  defaultLength: 4,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard 3-digit CVV code (Visa, Mastercard, Discover)",
      contextHint: "Generate 3-digit CVV codes",
      exampleValues: [
        "123",
        "456",
        "789",
        "012"
      ]
    },
    {
      id: uuidv4(),
      name: "AmEx",
      type: "Provider",
      description: "4-digit CVV code (American Express)",
      contextHint: "Generate 4-digit American Express CVV codes",
      exampleValues: [
        "1234",
        "5678",
        "9012",
        "3456"
      ]
    }
  ]
};

export const creditCardIssuerTemplate: TemplateData = {
  id: uuidv4(),
  name: "creditCardIssuer",
  category: "Finance",
  description: "Credit card issuing company",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common credit card issuers",
      contextHint: "Generate credit card issuer names",
      exampleValues: [
        "Visa",
        "Mastercard",
        "American Express",
        "Discover"
      ]
    },
    {
      id: uuidv4(),
      name: "Extended",
      type: "Extended",
      description: "Extended list of credit card issuers",
      contextHint: "Generate extended list of credit card issuer names",
      exampleValues: [
        "Visa",
        "Mastercard",
        "American Express",
        "Discover",
        "JCB",
        "Diners Club",
        "UnionPay",
        "Maestro"
      ]
    }
  ]
};

export const creditCardNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "creditCardNumber",
  category: "Finance",
  description: "Credit card number",
  fieldType: "VARCHAR",
  defaultLength: 19,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Formatted credit card number with separators",
      contextHint: "Generate formatted credit card numbers",
      exampleValues: [
        "4532-7645-3456-9878",
        "5423-8765-9876-5432",
        "3412-567890-12345",
        "6011-0087-6543-2109"
      ]
    },
    {
      id: uuidv4(),
      name: "Visa",
      type: "Provider",
      description: "Visa card numbers",
      contextHint: "Generate Visa credit card numbers",
      exampleValues: [
        "4539-7645-3456-9878",
        "4916-7483-9273-6154",
        "4916-5734-8163-9562",
        "4024-0071-5336-7634"
      ]
    },
    {
      id: uuidv4(),
      name: "Mastercard",
      type: "Provider",
      description: "Mastercard credit card numbers",
      contextHint: "Generate Mastercard credit card numbers",
      exampleValues: [
        "5423-8765-9876-5432",
        "5253-6743-9813-5642",
        "5489-7652-3461-9081",
        "5323-8734-5671-9283"
      ]
    },
    {
      id: uuidv4(),
      name: "AmEx",
      type: "Provider",
      description: "American Express credit card numbers",
      contextHint: "Generate American Express credit card numbers",
      exampleValues: [
        "3412-567890-12345",
        "3715-894562-73841",
        "3489-765432-98761",
        "3715-894526-18973"
      ]
    },
    {
      id: uuidv4(),
      name: "Discover",
      type: "Provider",
      description: "Discover credit card numbers",
      contextHint: "Generate Discover credit card numbers",
      exampleValues: [
        "6011-0087-6543-2109",
        "6011-1624-5789-0123",
        "6011-3456-7890-1234",
        "6011-9087-6543-2109"
      ]
    },
    {
      id: uuidv4(),
      name: "Unformatted",
      type: "Format",
      description: "Unformatted credit card numbers (no separators)",
      contextHint: "Generate unformatted credit card numbers",
      exampleValues: [
        "4532764534569878",
        "5423876598765432",
        "341256789012345",
        "6011008765432109"
      ]
    }
  ]
};

export const currencyTemplate: TemplateData = {
  id: uuidv4(),
  name: "currency",
  category: "Finance",
  description: "Currency name and code",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Currency with code and name",
      contextHint: "Generate currency codes with names",
      exampleValues: [
        "USD (US Dollar)",
        "EUR (Euro)",
        "GBP (Pound Sterling)",
        "JPY (Japanese Yen)"
      ]
    }
  ]
};

export const currencyCodeTemplate: TemplateData = {
  id: uuidv4(),
  name: "currencyCode",
  category: "Finance",
  description: "Three-letter ISO currency code",
  fieldType: "VARCHAR",
  defaultLength: 3,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Three-letter ISO currency codes",
      contextHint: "Generate ISO currency codes",
      exampleValues: [
        "USD",
        "EUR",
        "GBP",
        "JPY"
      ]
    },
    {
      id: uuidv4(),
      name: "Major",
      type: "Category",
      description: "Major world currency codes",
      contextHint: "Generate major world currency codes",
      exampleValues: [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "CAD",
        "AUD",
        "CHF",
        "CNY"
      ]
    },
    {
      id: uuidv4(),
      name: "European",
      type: "Category",
      description: "European currency codes",
      contextHint: "Generate European currency codes",
      exampleValues: [
        "EUR",
        "GBP",
        "CHF",
        "SEK",
        "NOK",
        "DKK",
        "PLN",
        "CZK"
      ]
    },
    {
      id: uuidv4(),
      name: "Asian",
      type: "Category",
      description: "Asian currency codes",
      contextHint: "Generate Asian currency codes",
      exampleValues: [
        "JPY",
        "CNY",
        "HKD",
        "SGD",
        "INR",
        "KRW",
        "THB",
        "IDR"
      ]
    }
  ]
};

export const currencyNameTemplate: TemplateData = {
  id: uuidv4(),
  name: "currencyName",
  category: "Finance",
  description: "Full currency name",
  fieldType: "VARCHAR",
  defaultLength: 30,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Full currency names",
      contextHint: "Generate full currency names",
      exampleValues: [
        "US Dollar",
        "Euro",
        "Pound Sterling",
        "Japanese Yen"
      ]
    },
    {
      id: uuidv4(),
      name: "Major",
      type: "Category",
      description: "Major world currency names",
      contextHint: "Generate major world currency names",
      exampleValues: [
        "US Dollar",
        "Euro",
        "Pound Sterling",
        "Japanese Yen",
        "Canadian Dollar",
        "Australian Dollar",
        "Swiss Franc",
        "Chinese Yuan"
      ]
    }
  ]
};

export const currencyNumericCodeTemplate: TemplateData = {
  id: uuidv4(),
  name: "currencyNumericCode",
  category: "Finance",
  description: "Three-digit ISO numeric currency code",
  fieldType: "VARCHAR",
  defaultLength: 3,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Three-digit ISO numeric currency codes",
      contextHint: "Generate ISO numeric currency codes",
      exampleValues: [
        "840",
        "978",
        "826",
        "392"
      ]
    }
  ]
};

export const currencySymbolTemplate: TemplateData = {
  id: uuidv4(),
  name: "currencySymbol",
  category: "Finance",
  description: "Currency symbol",
  fieldType: "VARCHAR",
  defaultLength: 5,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common currency symbols",
      contextHint: "Generate currency symbols",
      exampleValues: [
        "$",
        "€",
        "£",
        "¥"
      ]
    },
    {
      id: uuidv4(),
      name: "Extended",
      type: "Extended",
      description: "Extended list of currency symbols",
      contextHint: "Generate extended list of currency symbols",
      exampleValues: [
        "$",
        "€",
        "£",
        "¥",
        "₹",
        "₩",
        "₽",
        "₿"
      ]
    }
  ]
};

export const ethereumAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "ethereumAddress",
  category: "Finance",
  description: "Ethereum wallet address",
  fieldType: "VARCHAR",
  defaultLength: 42,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Ethereum address format",
      contextHint: "Generate Ethereum wallet addresses",
      exampleValues: [
        "0xb794f5ea0ba39494ce839613fffba74279579268",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf",
        "0x742d35cc6634c0532925a3b844bc454e4438f44e"
      ]
    }
  ]
};

export const ibanTemplate: TemplateData = {
  id: uuidv4(),
  name: "iban",
  category: "Finance",
  description: "International Bank Account Number",
  fieldType: "VARCHAR",
  defaultLength: 34,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard IBAN format",
      contextHint: "Generate IBAN numbers",
      exampleValues: [
        "DE89 3704 0044 0532 0130 00",
        "GB29 NWBK 6016 1331 9268 19",
        "FR14 2004 1010 0505 0001 3M02 606",
        "IT60 X054 2811 1010 0000 0123 456"
      ]
    },
    {
      id: uuidv4(),
      name: "Germany",
      type: "Country",
      description: "German IBAN format",
      contextHint: "Generate German IBAN numbers",
      exampleValues: [
        "DE89 3704 0044 0532 0130 00",
        "DE42 5001 0517 9876 5432 10",
        "DE07 1234 5678 0123 4567 89",
        "DE55 1022 0000 1234 5678 90"
      ]
    },
    {
      id: uuidv4(),
      name: "UK",
      type: "Country",
      description: "UK IBAN format",
      contextHint: "Generate UK IBAN numbers",
      exampleValues: [
        "GB29 NWBK 6016 1331 9268 19",
        "GB82 WEST 1234 5698 7654 32",
        "GB33 BUKB 2020 1555 5555 55",
        "GB76 LOYD 3098 6754 1234 56"
      ]
    },
    {
      id: uuidv4(),
      name: "France",
      type: "Country",
      description: "French IBAN format",
      contextHint: "Generate French IBAN numbers",
      exampleValues: [
        "FR14 2004 1010 0505 0001 3M02 606",
        "FR76 3000 6000 0112 3456 7890 189",
        "FR33 2222 2222 2222 2222 2222 222",
        "FR76 1010 7001 0112 3456 7890 125"
      ]
    },
    {
      id: uuidv4(),
      name: "Unformatted",
      type: "Format",
      description: "Unformatted IBAN numbers (no spaces)",
      contextHint: "Generate unformatted IBAN numbers",
      exampleValues: [
        "DE89370400440532013000",
        "GB29NWBK60161331926819",
        "FR1420041010050500013M02606",
        "IT60X0542811101000000123456"
      ]
    }
  ]
};

export const litecoinAddressTemplate: TemplateData = {
  id: uuidv4(),
  name: "litecoinAddress",
  category: "Finance",
  description: "Litecoin wallet address",
  fieldType: "VARCHAR",
  defaultLength: 42,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard Litecoin address format",
      contextHint: "Generate Litecoin wallet addresses",
      exampleValues: [
        "LQWx2Hhgd5LrfuteUEfvJPE1mKaD4MTPiP",
        "LRTZBoLPJks7sMXh3zEAFDnb7psJU3cTFX",
        "M8T1B2Z4oJFw8HqkQS7CYyLmXBzCJKdT9H",
        "LfCe7e8dXj7Xf4FqzMPHmbP9NtB8iS96J1"
      ]
    }
  ]
};

export const maskedNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "maskedNumber",
  category: "Finance",
  description: "Masked credit card or account number",
  fieldType: "VARCHAR",
  defaultLength: 19,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard masked credit card format",
      contextHint: "Generate masked credit card numbers",
      exampleValues: [
        "****-****-****-4321",
        "****-****-****-9876",
        "****-****-****-1234",
        "****-****-****-5678"
      ]
    },
    {
      id: uuidv4(),
      name: "AmEx",
      type: "Provider",
      description: "Masked American Express format",
      contextHint: "Generate masked American Express card numbers",
      exampleValues: [
        "****-******-*5678",
        "****-******-*1234",
        "****-******-*9012",
        "****-******-*3456"
      ]
    },
    {
      id: uuidv4(),
      name: "LastFour",
      type: "Format",
      description: "Only displaying last four digits",
      contextHint: "Generate card numbers with only last four digits visible",
      exampleValues: [
        "************4321",
        "************9876",
        "************1234",
        "************5678"
      ]
    }
  ]
};

export const pinTemplate: TemplateData = {
  id: uuidv4(),
  name: "pin",
  category: "Finance",
  description: "Personal Identification Number (PIN)",
  fieldType: "VARCHAR",
  defaultLength: 4,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Standard 4-digit PIN",
      contextHint: "Generate 4-digit PINs",
      exampleValues: [
        "1234",
        "5678",
        "9012",
        "3456"
      ]
    },
    {
      id: uuidv4(),
      name: "6Digit",
      type: "Format",
      description: "6-digit PIN for higher security",
      contextHint: "Generate 6-digit PINs",
      exampleValues: [
        "123456",
        "567890",
        "901234",
        "345678"
      ]
    }
  ]
};

export const routingNumberTemplate: TemplateData = {
  id: uuidv4(),
  name: "routingNumber",
  category: "Finance",
  description: "US bank routing number",
  fieldType: "VARCHAR",
  defaultLength: 9,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "US bank routing number format (9 digits)",
      contextHint: "Generate US bank routing numbers",
      exampleValues: [
        "021000021",
        "121000358",
        "011401533",
        "091000022"
      ]
    },
    {
      id: uuidv4(),
      name: "Formatted",
      type: "Format",
      description: "Formatted US routing number with hyphens",
      contextHint: "Generate formatted US bank routing numbers with hyphens",
      exampleValues: [
        "021-000021",
        "121-000358",
        "011-401533",
        "091-000022"
      ]
    }
  ]
};

export const transactionDescriptionTemplate: TemplateData = {
  id: uuidv4(),
  name: "transactionDescription",
  category: "Finance",
  description: "Description of a financial transaction",
  fieldType: "VARCHAR",
  defaultLength: 100,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common transaction descriptions",
      contextHint: "Generate transaction descriptions",
      exampleValues: [
        "Monthly Subscription",
        "Grocery Store Purchase",
        "Restaurant Payment",
        "ATM Withdrawal"
      ]
    },
    {
      id: uuidv4(),
      name: "Retail",
      type: "Category",
      description: "Retail transaction descriptions",
      contextHint: "Generate retail transaction descriptions",
      exampleValues: [
        "Amazon.com Purchase",
        "Walmart Superstore #1234",
        "Target Store Purchase",
        "Best Buy Electronics"
      ]
    },
    {
      id: uuidv4(),
      name: "Subscription",
      type: "Category",
      description: "Subscription transaction descriptions",
      contextHint: "Generate subscription transaction descriptions",
      exampleValues: [
        "Netflix Monthly Subscription",
        "Spotify Premium Payment",
        "Adobe Creative Cloud Monthly",
        "Gym Membership Fee"
      ]
    },
    {
      id: uuidv4(),
      name: "Banking",
      type: "Category",
      description: "Banking transaction descriptions",
      contextHint: "Generate banking transaction descriptions",
      exampleValues: [
        "ATM Withdrawal Fee",
        "Monthly Account Fee",
        "Overdraft Protection Transfer",
        "Wire Transfer Fee"
      ]
    }
  ]
};

export const transactionTypeTemplate: TemplateData = {
  id: uuidv4(),
  name: "transactionType",
  category: "Finance",
  description: "Type of financial transaction",
  fieldType: "VARCHAR",
  defaultLength: 20,
  variations: [
    {
      id: uuidv4(),
      name: "Default",
      type: "Default",
      description: "Common transaction types",
      contextHint: "Generate transaction types",
      exampleValues: [
        "payment",
        "deposit",
        "withdrawal",
        "transfer",
        "refund"
      ]
    },
    {
      id: uuidv4(),
      name: "Banking",
      type: "Category",
      description: "Banking transaction types",
      contextHint: "Generate banking transaction types",
      exampleValues: [
        "ATM Withdrawal",
        "Direct Deposit",
        "Wire Transfer",
        "Check Deposit",
        "Overdraft Fee"
      ]
    },
    {
      id: uuidv4(),
      name: "Investment",
      type: "Category",
      description: "Investment transaction types",
      contextHint: "Generate investment transaction types",
      exampleValues: [
        "Stock Purchase",
        "Dividend Payment",
        "Bond Interest",
        "Security Sale",
        "Portfolio Rebalance"
      ]
    }
  ]
};