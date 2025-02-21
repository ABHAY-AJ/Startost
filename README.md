
## Video Demonstration
For a detailed walkthrough, watch this video: [https://www.loom.com/share/c1fd69133e6240739425c9f87afb3cc3?sid=d6a15eb4-a9d0-435e-81d6-aca5bfc7be45](https://www.loom.com/share/c1fd69133e6240739425c9f87afb3cc3?sid=d6a15eb4-a9d0-435e-81d6-aca5bfc7be45)

# Search System with Automated Normalization

This project is a fully automated search and normalization system using Node.js, Express, MongoDB, and OpenAI's GPT model. It applies phonetic matching and an LLM fallback mechanism to normalize input queries dynamically without requiring a separate endpoint.

## Features
- **Phonetic Matching:** Uses `metaphone` and `hebrew-transliteration` for phonetic key generation.
- **LLM Integration:** Queries OpenAI's GPT model to check if an input is a known variation of an existing entity.
- **Database Storage:** MongoDB stores canonical names, variations, and phonetic keys.
- **Frontend Interface:** A React-based UI for searching queries and displaying results.


## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- An OpenAI API key

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OpenAI_API=your_openai_api_key
   ```
4. Start the backend server:
   ```sh
   npx tsx src/index.ts
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

### Running the Project
Once both the backend and frontend are running, open `http://localhost:3000` to access the search system.

## Approach to Automated Normalization
This project automates normalization without requiring a separate endpoint. When a user submits a query:
1. **Phonetic Matching:**
   - The query is processed using `metaphone` and `hebrew-transliteration`.
   - If a match is found in MongoDB, the existing canonical entry is returned.
2. **LLM Fallback:**
   - If no match exists, an OpenAI GPT-4o-mini request is made.
   - The LLM determines whether the query is a known entity variation or a new entry.
3. **Database Update:**
   - If it matches an existing canonical entry, the query is added as a new variation.
   - If it's new, a fresh entry is created in the database.

This approach ensures that normalization is fully dynamic and self-learning.

## LLM Integration
The LLM is integrated using OpenAI's API:
- The query is sent with a prompt:  
  _"Is \"{query}\" a variation of any known entity? Respond with the canonical name if yes, or \"new\" if it's a new entity."_
- The response is processed to update MongoDB accordingly.
- The system adapts dynamically as more queries are processed.

## API Endpoints
### Search Endpoint
- **Method:** `GET /api/search?query=your-query`
- **Response:** Returns a JSON object with the canonical name and variations.

