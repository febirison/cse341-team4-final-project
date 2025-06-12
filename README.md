# Campus Coordinator API
A backend API for managing campus activities, built for CSE341 Final Project.

## Team Members
- Anderson Okai
- Jorge Luis Sosa Nunez
- Andrew Omoniyi Mogbeyiromore
- Erwin Jared Larios
- Amornrat Dizon Howard
- David da Rocha Fernandes
- Ivan Sembatya

## Features
- Join clubs
- Book rooms and gyms
- View upcoming events
- Club leader tools
- Admin controls

## Setup
1. Clone the repo: `git clone https://github.com/your-username/cse341-team1-final-project.git`
2. Install dependencies: `npm install`
3. Set up `.env` with MongoDB URI and GitHub OAuth credentials
    # Example .env file

    # Server configuration
    HOST=examplehost                # Hostname or IP address for the server
    PORT=1234                       # Port number for the server
    NODE_ENV=development            # Environment: development or production

    # Database configuration
    MONGODB_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/dbname

    # JWT (Authentication) configuration
    JWT_SECRET=your_jwt_secret      # Secret key for signing JWT tokens
    JWT_EXPIRES_IN=1h               # Token expiration time (e.g., 1h, 7d)

    # GitHub OAuth configuration
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    GITHUB_CALLBACK_URL=http://localhost:1234/auth/github/callback

    # CORS configuration
    ORIGIN=http://localhost:8080    # Allowed origin for frontend requests
    
4. Run the app: `npm start` or npx nodemon start.js
