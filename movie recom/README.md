# **CineVerse** - Movie Recommendation Platform Full Stack User Interface

CineVerse is a modern, responsive movie recommendation platform built with React, TypeScript, and Node.js. It features a Netflix-like interface with personalized movie recommendations, user authentication, and a seamless browsing experience.

## Features

- 🔍 Advanced movie search and filtering
- 👤 User authentication and profiles
- ⭐ Movie ratings and recommendations
- 🎯 Personalized movie suggestions
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 🔄 Real-time updates

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cineverse.git
cd cineverse
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
cineverse/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets
│
└── server/               # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── models/          # MongoDB models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    └── utils/           # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/top-rated` - Get top-rated movies
- `POST /api/movies/rate` - Rate a movie

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Movie data provided by [TMDb API](https://www.themoviedb.org/documentation/api)
- UI inspiration from Netflix
- Icons by [Lucide](https://lucide.dev/)
