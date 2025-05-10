# Quotes Application

A full-stack application for retrieving, displaying, and filtering quotes using the FavQs API.

## Features

- Browse quotes with pagination
- Filter quotes by tags

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Axios for API requests with retry functionality

### Frontend
- React
- TypeScript
- Vite build tool
- CSS for styling

## Project Structure

```
quotes/
├── server/             # Backend code
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── service/        # Business logic services
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.ts        # Entry point
│   ├── .gitignore          # Git ignore rules
│   └── package.json
└── fe/                 # Frontend code
    ├── src/
    │   ├── components/     # Components of the application
    │   ├── pages/          # Pages of the application
    │   ├── types/          # TypeScript type definitions
    │   ├── App.tsx         # Main application component
    │   └── index.css       # Styles
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd quotes
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../fe
npm install
```

4. Set up environment variables:
```bash
# In the server directory
cd ../server
# Create a .env file with the following contents:
# PORT=3000
# FAVQS_API_KEY=your_favqs_api_key_here
```

## Running the Application

### Backend
```bash
cd server
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The server will run on http://localhost:3000 by default.

### Frontend
```bash
cd fe
npm run dev
```

The frontend development server will run on http://localhost:5173 by default.

## API Endpoints

### `GET /quotes`
Retrieves quotes with optional filtering and pagination.

Query Parameters:
- `tag` (optional): Filter quotes by tag
- `page` (optional): Page number for pagination (default: 1)
- `count` (optional): Number of quotes to return

Response:
```json
{
  "quotes": [
    {
      "quote": "Quote text",
      "author": "Author name",
      "tags": ["tag1", "tag2"]
    }
  ],
  "page": 1,
  "hasMore": true
}
```

## Usage

- Browse quotes using the pagination controls
- Clear filters using the "x" button
- Adjust the number of quotes per page using the input field
- The UI automatically adapts to dark mode based on your system preferences
