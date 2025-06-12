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
    - Example `.env` file:
      ```
        HOST=examplehost
        PORT=1234
        NODE_ENV=development

        MONGODB_URI=mongodb+srv://username:password@cluster0.example.mongodb.net/dbname

        # JWT configuration
        JWT_SECRET=example_jwt_secret
        JWT_EXPIRES_IN=1h

        # GitHub OAuth configuration
        GITHUB_CLIENT_ID=example_github_client_id
        GITHUB_CLIENT_SECRET=example_github_client_secret
        GITHUB_CALLBACK_URL=http://localhost:1234/auth/github/callback

        # Origin 
        ORIGIN=http://localhost:8080

      ```
4. Run the app: `npm start` or `npm run dev` for development mode
