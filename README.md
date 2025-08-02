# MERN Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application to help users track their monthly expenses with user authentication, budgeting and expense management features.

---

## Features

- User registration and login with secure password hashing and JWT-based authentication
- Add, view, filter and manage expenses by category
- Set and track monthly budgets with progress indication
- Responsive and clean UI with React and React Router for SPA experience
- Backend API built with Express and MongoDB with Mongoose ODM
- Protected routes for authenticated users only

---

## Technologies Used

- Frontend: React, React Router, Axios, CSS (with custom theming)
- Backend: Node.js, Express, MongoDB, Mongoose, bcryptjs (password hashing), jsonwebtoken (JWT)
- Environment variables managed with dotenv
- Styling with CSS custom properties

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB server (local or cloud like MongoDB Atlas)
- Git (to clone the repo)

### Installation

1. Clone the repository

git clone https://github.com/yazhiniii20/expense-tracker.git
cd expense-tracker

2. Setup backend

cd server
npm install

3. Create a `.env` file in the `server` folder with MongoDB connection string:

MONGO_URI=mongodb://localhost:27017/expensetracker
JWT_SECRET=your_jwt_secret_key
PORT=5000

4. Start backend server:

npm start

5. Setup frontend

Open a new terminal/window and navigate to the client folder:

cd ../client
npm install
npm start

6. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## Usage

- Register a new user account
- Log in with your credentials
- Add expenses with date, amount, category and optional description
- View, filter and manage expenses
- Set monthly budget amount and track spending progress
- Logout when finished

---

## Folder Structure

expense-tracker/
├─ client/ # React frontend code
│ ├─ src/
│ │ ├─ App.js # Main app component and routing
│ │ ├─ components/ # ExpenseList, ExpenseForm, Dashboard, Budget, Login, Register etc.
│ │ └─ AuthForm.css # Styling and theming
│ └─ package.json
├─ server/ # Node.js backend
│ ├─ models/ # Mongoose models (User)
│ ├─ routes/ # Express routes (auth)
│ ├─ server.js # Express app and MongoDB connection
│ └─ package.json
└─ README.md # Project documentation


## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for signing JWT tokens
- `PORT` - Server running port (default 5000)

---

## Notes

- Passwords are hashed before storing in MongoDB using bcryptjs.
- JWT tokens expire in 1 hour for security; frontend manages token storage in `localStorage`.
- React Router is used for client-side routing with protected routes requiring authentication.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

Created by Yazhini S - feel free to reach out at yazhini.sankar20@gmail.com

---

## Acknowledgements

- Thanks to all open source libraries and their maintainers
- Inspiration from MERN stack tutorials and projects
