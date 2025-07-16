# german_verb_practice

App to practice verbs with prepositions in German


A web application to help you practice German verbs with prepositions and their required grammatical cases. The app allows you to:
- Add, edit, and remove verbs with their prepositions, meanings, and cases
- Practice by selecting the correct preposition, meaning, and case for each verb
- Track your progress and view recent practice statistics
- Store your data persistently using PostgreSQL

## Backend Setup (Spring Boot)

1. **Install PostgreSQL** (if not already installed):
   - On macOS: `brew install postgresql@15`
   - Start PostgreSQL: `brew services start postgresql@15`
   - Create user and database:
     ```sh
     createuser -s postgres
     createdb german_verb_practice
     ```
   - Default credentials are set in `backend/src/main/resources/application.properties`:
     - user: `postgres`
     - password: `postgres`
     - database: `german_verb_practice`
   - You can change these in the properties file if needed.

2. **Build and run the backend:**
   ```sh
   cd backend
   ./mvnw spring-boot:run
   ```
   The backend will run on `http://localhost:8080`.

## Frontend Setup (React)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the frontend:**
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Usage
- Open the frontend in your browser.
- If there are no verbs, click "Add Your First Verb" to add one.
- Practice German verbs with prepositions and track your progress.

## Notes
- The backend uses PostgreSQL for data persistence.
- Make sure PostgreSQL is running before starting the backend.
- You can change database credentials in `application.properties` as needed.

## TODO
- User Authentication: Add login/register functionality
- Different Practice Modes: Timed quizzes, difficulty levels
~~- Import/Export: CSV import/export for verb lists~~
- Mobile App: React Native version
- Advanced Statistics: Progress charts, streak tracking
- Spaced Repetition: Algorithm-based learning
- Audio Pronunciation: Text-to-speech integration
