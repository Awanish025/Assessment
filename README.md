# 👥 User Management System

A full-stack **MERN** application for managing user records with full CRUD operations, search & filter, pagination, profile image upload, and CSV export.

## ✨ Features

- **User Registration** — Create users with profile picture upload
- **View All Users** — Paginated list with search by name
- **Filter & Sort** — Filter users by gender and status
- **Edit User** — Update user details and profile image
- **Delete User** — Remove users from the database
- **Status Toggle** — Mark users as Active / InActive
- **CSV Export** — Export user data to a downloadable CSV file
- **Profile View** — Detailed view of individual user profiles

## 🛠️ Tech Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Frontend  | React 19, Vite, Tailwind CSS, React Router v7   |
| Backend   | Node.js, Express 5, Mongoose                    |
| Database  | MongoDB                                         |
| Other     | Multer (file upload), Formik + Yup (forms), Axios, Moment.js |

## 📁 Project Structure

```
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── pages/          # Home, Register, Edit, Profile
│       ├── components/     # Reusable UI components
│       ├── services/       # API service layer
│       └── context/        # React context
├── server/                 # Express backend
│   ├── controllers/        # Request handlers (CRUD, export)
│   ├── db/                 # Database connection
│   ├── models/             # Mongoose schemas
│   ├── multerconfig/       # File upload configuration
│   ├── routes/             # API route definitions
│   └── uploads/            # Uploaded profile images
└── vercel.json             # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/Awanish025/Assessment.git
cd Assessment
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:5000`.

## 📡 API Endpoints

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| POST   | `/api/users/register`   | Register a new user  |
| GET    | `/api/users/details`    | Get all users (paginated, filterable) |
| GET    | `/api/users/export`     | Export users to CSV  |
| GET    | `/api/users/:id`        | Get single user      |
| PUT    | `/api/users/edit/:id`   | Update a user        |
| DELETE | `/api/users/delete/:id` | Delete a user        |
| PUT    | `/api/users/status/:id` | Toggle user status   |

## 🌐 Deployment

This project includes a `vercel.json` for deploying to [Vercel](https://vercel.com). The config routes `/api/*` requests to the Express server and serves the React client for all other routes.

## 📝 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
