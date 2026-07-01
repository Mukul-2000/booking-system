Session Booking API
A robust RESTful API built with Node.js, TypeScript, Express.js, and MongoDB to manage teacher availability and user booking lifecycles.

🚀 Features
Teacher & User Management: Register teachers and users.

Session Scheduling: Teachers can create available time slots.

Booking System: Users can book available sessions.

Aggregation Pipelines: Complex data retrieval (Available sessions & User history) implemented via MongoDB aggregation.

Validation: Input sanitized and validated using Joi.

Global Error Handling: Centralized middleware for consistent API responses.

🛠 Tech Stack
Runtime: Node.js

Language: TypeScript

Framework: Express.js

Database: MongoDB with Mongoose ODM

Validation: Joi

Environment: dotenv

⚙️ Setup Instructions
1. Prerequisites
Ensure you have Node.js (v18+) and MongoDB installed.

2. Installation

# Clone the repository
git clone <your-repo-url>
cd booking-system

# Install dependencies
npm install

3. Environment Configuration
Create a .env file in the root directory and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string

4. Running the Application

# Start in development mode
npm run dev


Testing Workflow
Register: Call POST /teachers and POST /users to get IDs.

Create: Use the teacherId to call POST /sessions.

Find: Use GET /sessions/available?dateTimestamp=1782950400000 to find the session.

Book: Use the session id from the URL and userId in the body to call POST /sessions/:id/book.

Complete: Use PATCH /sessions/:id/complete to finish the session.

History: Call GET /users/:id/sessions to view your dashboard.

🏗 Project Structure
/src/controllers: Request handlers.

/src/models: Mongoose schemas.

/src/routes: API endpoint definitions.

/src/middleware: Validation logic and error handling.

/src/config: Database connection and environment config.

/src/validations: Joi request schemas.