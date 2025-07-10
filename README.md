CRM System - Proof of Concept (POC)

Overview
This project is a Customer Relationship Management (CRM) Proof of Concept (POC) designed to demonstrate a scalable, modern web application for managing customer interactions. It features a Node.js backend built with hexagonal architecture, an Angular frontend with a polished UI, and integration with Hugging Face's Large Language Model (LLM) for advanced text processing (e.g., summarizing customer interactions). The entire system is containerized using Docker and orchestrated with Docker Compose for easy setup and deployment.
The application allows users to:

Create and list customers.
Record and manage interactions with customers.
Leverage LLM for generating summaries and automated responses.
Access a responsive, user-friendly interface with Tailwind CSS styling.


Technologies Used



Technology
Version
Purpose



Node.js
20
Backend runtime


TypeScript
5.8
Static typing for backend and frontend


Express.js
5.1
Backend web framework


Mongoose
8.16
MongoDB ORM for data modeling


Angular
18
Frontend SPA framework


Tailwind CSS
3.x
Styling for a modern UI


Hugging Face LLM
API
Text summarization and responses


MongoDB
7.0
NoSQL database for data storage


Docker & Docker Compose
Latest
Containerization and orchestration



Project Structure
crm-project/
├── backend/                     # Node.js backend
│   ├── src/
│   │   ├── adapters/           # Controllers, repositories, services
│   │   ├── domain/             # Business logic (entities, use cases)
│   │   ├── infrastructure/      # Config, database, environment
│   │   └── app.ts              # Entry point
│   ├── Dockerfile              # Backend container configuration
│   ├── package.json
│   └── tsconfig.json
├── frontend/crm-frontend/       # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Customer form, navigation, etc.
│   │   │   ├── services/       # API services
│   │   │   └── app.component.* # Main app component (navbar)
│   │   ├── styles.css          # Tailwind CSS setup
│   │   └── index.html
│   ├── Dockerfile              # Frontend container configuration
│   ├── angular.json
│   └── tailwind.config.js
├── docker-compose.yml           # Orchestrates MongoDB, backend, frontend
├── .env                        # Environment variables (e.g., HUGGINGFACE_API_KEY)
└── README.md                   # This file


Architecture
The project follows a hexagonal architecture (ports and adapters pattern) to ensure modularity, testability, and maintainability. Below is a detailed breakdown of the architecture, including frontend, backend, and integration layers.
Architecture Diagram
graph TD
    A[User] -->|HTTP| B[Frontend: Angular]
    B -->|HTTP /api| C[Backend: Node.js]
    C -->|MongoDB URI| D[MongoDB]
    C -->|API Calls| E[Hugging Face LLM]
    B -->|Docker Network| C
    C -->|Docker Network| D

Components
1. Frontend (Angular)

Purpose: Provides a responsive, single-page application (SPA) for user interaction.
Key Features:
Navigation: A sleek navbar (app.component.html) styled with Tailwind CSS, featuring a gradient background, hover animations, and a mobile-friendly menu.
Customer Form: A polished form (customer-form.component.html) for creating customers, with real-time validation, loading spinners, and Tailwind styling.
Routing: Uses Angular’s Router for client-side navigation (/customers, /add-customer, /all-interactions).
API Integration: Communicates with the backend via a proxy (proxy.conf.json) to http://backend:3000.


Technologies: Angular 18, Tailwind CSS, TypeScript, RxJS for HTTP requests.
Styling: Tailwind CSS provides a modern, responsive UI with custom colors (primary, secondary, accent) defined in tailwind.config.js.

2. Backend (Node.js with Hexagonal Architecture)

Purpose: Handles business logic, data persistence, and LLM integration.
Structure:
Domain Layer:
Entities: Customer and Interaction define the core data models.
Use Cases: Business logic (e.g., CreateCustomerUseCase, CreateInteractionUseCase) encapsulated as services.
Ports: Interfaces (e.g., InteractionRepository, LLMServicePort) define contracts for repositories and external services.


Adapters Layer:
Controllers: CustomerController and InteractionController handle HTTP requests and map to use cases.
Repositories: CustomerMongoRepository and InteractionMongoRepository implement data access using Mongoose.
Services: HuggingFaceService integrates with the Hugging Face API for text summarization and response generation.


Infrastructure Layer:
Database: Connects to MongoDB via mongoose (mongodb://mongo:27017/crm).
Environment: Configured via .env (e.g., HUGGINGFACE_API_KEY, MONGO_URI).




Technologies: Node.js 20, Express.js 5.1, Mongoose 8.16, TypeScript 5.8, Axios for HTTP requests.
Endpoints:
POST /customers: Create a customer.
GET /customers: List all customers.
POST /interactions: Create an interaction with LLM-generated summary and response.
GET /interactions/:customerId: List interactions for a customer.
GET /interactions: List all interactions.
GET /interactions/id/:id: Get a specific interaction.
PUT /interactions/:id: Update an interaction.
DELETE /interactions/:id: Delete an interaction.



3. Database (MongoDB)

Purpose: Stores customer and interaction data.
Setup: Runs in a Docker container (mongo:7) with a persistent volume (mongo-data).
Schema:
Customers: { _id: String, name: String, email: String, phone: String }
Interactions: { customerId: String, content: String, timestamp: Date, summary: String, autoResponse: String }


Healthcheck: Ensures MongoDB is ready (db.adminCommand('ping')).

4. Hugging Face LLM

Purpose: Enhances interactions with text summarization and automated responses.
Integration: HuggingFaceService sends requests to https://router.huggingface.co/together/v1/chat/completions using the mistralai/Mixtral-8x7B-Instruct-v0.1 model.
Configuration: Uses HUGGINGFACE_API_KEY from .env.

5. Docker & Networking

Docker Compose: Orchestrates three services (mongo, backend, frontend) on a bridge network (crm-network).
Networking: Ensures the frontend can reach the backend (http://backend:3000) and the backend can reach MongoDB (mongodb://mongo:27017/crm).
Volumes: Persists MongoDB data (mongo-data) and mounts source code for development.


Prerequisites

Docker: Install from https://docs.docker.com/get-docker/.
Docker Compose: Included with Docker Desktop or install separately.
Hardware: Minimum 4GB RAM, 2 CPUs recommended.
Node.js & npm: Optional for local development outside Docker (Node.js 20+).
Environment Variables:
Create a .env file in the project root:HUGGINGFACE_API_KEY=your_huggingface_api_key_here






Setup Instructions

Clone the Repository:
git clone <REPOSITORY_URL>
cd crm-project/crm-hexagonal


Create MongoDB Data Directory:
sudo mkdir -p /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data
sudo chmod -R 777 /home/weslleyprado/Desktop/companies/portfolio-weslley/crm-project/crm-project/crm-hexagonal/mongo-data


Start Services:
docker-compose up -d --build


Access the Application:

Frontend: http://localhost:4200
Backend API: http://localhost:3000
MongoDB: mongodb://localhost:27017/crm (accessible via mongosh)


Verify Setup:
docker ps -a
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo




Usage

Navigate the UI:

Customers: View and manage customers at /customers.
Add Customer: Create a new customer at /add-customer.
All Interactions: View all interactions at /all-interactions.


API Testing:

Create a customer:curl -X POST http://localhost:3000/customers \
-H "Content-Type: application/json" \
-d '{"name":"Test Customer","email":"test@example.com","phone":"1234567890"}'


Create an interaction:curl -X POST http://localhost:3000/interactions \
-H "Content-Type: application/json" \
-d '{"customerId":"686ebcd376c8bdb67f7c335c","content":"bom dia","timestamp":"2025-07-09T19:29:25.852Z"}'


Test Hugging Face API:curl -X POST https://router.huggingface.co/together/v1/chat/completions \
-H "Authorization: Bearer $HUGGINGFACE_API_KEY" \
-H "Content-Type: application/json" \
-d '{"model":"mistralai/Mixtral-8x7B-Instruct-v0.1","messages":[{"role":"user","content":"Summarize: bom dia"}]}'




MongoDB Access:
docker exec -it crm-hexagonal-mongo-1 mongosh
use crm
db.customers.find()
db.interactions.find()




Debugging Common Issues

getaddrinfo EAI_AGAIN backend
- **Cause**: The frontend cannot resolve `backend` hostname.
- **Fix**:
  - Ensure `proxy.conf.json` points to `http://backend:3000`.
  - Verify all services are on `crm-network` in `docker-compose.yml`.
  - Check backend logs:
    ```bash
    docker-compose logs backend
    ```



POST /api/* 500 (Internal Server Error)
- **Cause**: Likely an issue in `HuggingFaceService` or `CreateInteractionUseCase`.
- **Fix**:
  - Check backend logs for errors:
    ```bash
    docker-compose logs backend
    ```
  - Verify `HUGGINGFACE_API_KEY` in `.env`.
  - Test the API directly:
    ```bash
    curl -X POST http://localhost:3000/interactions ...
    ```
  - Inspect MongoDB:
    ```bash
    docker exec -it crm-hexagonal-mongo-1 mongosh
    use crm
    db.interactions.find()
    ```



MongoDB Connection Issues
- **Cause**: Backend cannot connect to `mongodb://mongo:27017/crm`.
- **Fix**:
  - Ensure MongoDB is healthy:
    ```bash
    docker ps -a
    ```
  - Check backend logs for connection errors.
  - Verify `MONGO_URI` in `.env` or `environment.ts`.



Development Notes

Frontend: Run locally without Docker:cd frontend/crm-frontend
npm install
ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.json


Backend: Run locally without Docker:cd backend
npm install
npm run build
node dist/app.js


MongoDB Warnings: Ignore vm.max_map_count, XFS, and access control warnings for local development.


Future Improvements

Add authentication (e.g., JWT) for secure API access.
Implement advanced LLM features (e.g., sentiment analysis).
Enhance UI with dark mode toggle and additional components.
Add unit and integration tests for backend and frontend.


Contact
For questions, suggestions, or contributions, contact:
Weslley Prado - Solutions Architect and Software Engineer
Email: weslleyrprado@syttechnology.com