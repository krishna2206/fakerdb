# <img src="https://github.com/user-attachments/assets/9aed213d-4630-4d4c-97fd-f3a53468150a" alt="FakerDB Logo" width="38" height="38" style="vertical-align: middle;"> FakerDB

FakerDB is an AI-powered SQL data generator that helps developers create realistic test data for database tables. Using Google's Gemini AI, it generates the ready to copy-paste SQL statements for both table schema and sample data across multiple SQL dialects.

## Application Screenshots

### Visual Database Design
![Visual Database Design](/public/visual-design-dark.png)

### Generate CREATE TABLE SQL
![CREATE SQL Statements](/public/create-sql-dark.png)

### Generate INSERT Data SQL
![INSERT SQL Statements](/public/insert-sql-dark.png)

## Features

- Generate ready-to-run SQL commands for both CREATE and INSERT statements
- Design either using **single table mode** or multiple related tables using **diagram view**
- Support for multiple SQL dialects:
  - MySQL
  - PostgreSQL
  - SQLite
  - Oracle
- AI-powered data generation based on field names and types
- Context-aware data generation for each field
- Copy or export SQL scripts

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Google Gemini API key (get it for free at [Google AI Studio](https://aistudio.google.com/apikey))
- Pocketbase

### Installation

1. Clone the repository:
```bash
git clone https://github.com/krishna2206/fakerdb.git
cd fakerdb
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```bash
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```
You can modify this URL if your Pocketbase instance is running on a different host or port.

4. Apply Pocketbase migrations:
```bash
pocketbase migrate
```

5. Start the development server:
```bash
npm run dev
```

6. Run the Pocketbase backend:
```bash
pocketbase serve
```

7. Open [http://localhost:8080](http://localhost:8080) in your browser.

8. Add your Gemini API key in the settings menu of the application.

### Setup OAuth (Optional)
The application supports 3 authentication methods : **Email, Google, GitHub**. You can login/register using email address and password, but if you want to connect using your Google or GitHub account, you must do some configurations.

#### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Set the application type to "Web application"
6. Add your application name
7. Add authorized JavaScript origins:
   - For development: `http://localhost:8080`
   - For production: Add your production URL
8. Add authorized redirect URIs:
   - For development: `http://localhost:8090/api/oauth2-redirect`
   - For production: `https://your-production-domain.com/api/oauth2-redirect`
9. Click "Create" and note your Client ID and Client Secret
10. In Pocketbase Admin UI (http://localhost:8090/_/), select the `users` collection and click on settings button
11. Enable Google auth provider and enter your Client ID and Client Secret
12. Save your changes

#### Setting up GitHub OAuth

1. Go to your GitHub account settings
2. Navigate to "Developer settings" > "OAuth Apps"
3. Click "New OAuth App"
4. Enter your application name
5. Set the homepage URL:
   - For development: `http://localhost:8080`
   - For production: Your production URL
6. Add the authorization callback URL:
   - For development: `http://localhost:8090/api/oauth2-redirect`
   - For production: `https://your-production-domain.com/api/oauth2-redirect`
7. Click "Register application" and note your Client ID
8. Generate a new Client Secret and note it down
9. In Pocketbase Admin UI (http://localhost:8090/_/), select the `users` collection and click on settings button
10. Enable GitHub auth provider and enter your Client ID and Client Secret
11. Save your changes

After configuring these providers, users will be able to log in using their Google or GitHub accounts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
