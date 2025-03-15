# HealthCare Claims Management System

## Project Overview
This project implements an authorization-based system for managing health insurance claims. The system supports two roles:

- **Patient**: Can view the status of claims they have submitted previously and post new claims.
- **Insurer**: Can view all claims, accept or reject them, and apply filters based on submission date, status, and claim amount.

## Technologies Used
### Frontend:
- React
- Axios
- Tailwind CSS

### Backend:
- Node.js
- NestJS
- TypeScript
- JWT Authentication

## Installation & Running Instructions

### Frontend:
1. Navigate to the frontend folder:
   ```sh
   cd HealthCare
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the frontend server:
   ```sh
   npm run dev
   ```

### Backend:
1. Navigate to the backend folder:
   ```sh
   cd HealthCare
   cd healthclaims
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the backend server:
   ```sh
   npm run start
   ```

## Features Implemented
- **Authorization with JWT**
- **Role-based access control (Patients & Insurers)**
- **Claim submission by patients**
- **Claim review and decision-making by insurers**
- **Filtering claims based on submission date, status, and claim amount**

## License
This project is for educational and learning purposes.

