# EduSphere 🎓

EduSphere is a full-stack EdTech Learning Management System (LMS) platform where students can explore, purchase, and access courses, while instructors can create, manage, and sell their content. It provides a smooth experience for both learners and educators, making online learning accessible and scalable.

**🔗 Live Demo: [EduSphere](https://edu-sphere-l45e.vercel.app/)**

## 🚀 Features
### 👨‍🎓 For Students

- Browse and purchase courses securely.

- Access purchased courses anytime with structured video content.

- Seamless and responsive learning interface.

- Secure authentication and authorization.

### 👨‍🏫 For Instructors

- Create and manage courses with title, description, and pricing.

- Upload video lectures (integrated with Cloudinary).

- Track enrolled students.

## ⚙️ General

- Authentication with JWT for secure access.

- Payment integration (Razorpay API) for purchasing courses.

- Cloud storage (Cloudinary) for hosting course videos.

- Scalable APIs for course and user management.

- Modern responsive UI for smooth user experience.

## 🛠️ Tech Stack

### Frontend (client)

- React.js

- Tailwind CSS

- Redux (State Management)

### Backend (server)

- Node.js

- Express.js

- MongoDB (Database)

- JWT (Authentication)

- Cloudinary (Video Hosting)


## 📂 Project Structure
Root
```
EduSphere/
│── client/              # Frontend (React + Redux + Tailwind)
│── server/              # Backend (Node.js + Express + MongoDB)
│── .gitignore
│── package.json
│── package-lock.json
```
Client (Frontend)
```
client/
│── assets/              # Images, icons, static assets
│── components/          # Reusable UI components
│── data/                # Static data/constants
│── hooks/               # Custom React hooks
│── pages/               # Application pages (Home, Courses, Dashboard, etc.)
│── reducer/             # Reducers for state management
│── services/            # API calls (axios/fetch)
│── slices/              # Redux slices
│── utils/               # Utility functions
│── App.jsx              # Root React component
│── App.css
│── index.css
```
Server (Backend)
```
server/
│── config/              # Database and app configuration
│── controllers/         # Business logic for routes
│── mail/templates/      # Email templates (welcome, purchase confirmation, etc.)
│── middlewares/         # Auth middleware, error handling
│── models/              # Mongoose schemas (User, Course, Order, etc.)
│── routes/              # API endpoints
│── utils/               # Helper utilities
│── index.js             # Server entry point
│── vercel.json          # Deployment configuration

```

## ⚡ Getting Started (Local Setup)

Follow these steps to run EduSphere locally:

**1️. Clone the Repository**
```
git clone https://github.com/your-username/EduSphere.git
cd EduSphere
```

**2️. Install Dependencies**

From the root folder, install both frontend and backend dependencies:

```
// Install root dependencies
npm install

// Install frontend dependencies
cd client
npm install

// Install backend dependencies
cd ../server
npm install
```

**3️. Set Up Environment Variables**

This project uses environment variables for configuration.

An .env.example file is provided inside both the client and server folders.

To set up your environment variables, copy the example files and rename them to .env:
```
# For client
cp client/.env.example client/.env

# For server
cp server/.env.example server/.env
```

Fill in the required values in each .env file before running the application.

**4️. Run the Application**

From the root directory:

```
npm run dev
```

This will start both frontend and backend servers concurrently.

Frontend: http://localhost:5871

Backend: http://localhost:4000

## 🌐 Deployment

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atlas
