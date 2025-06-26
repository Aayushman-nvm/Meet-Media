# 📱 Meet Media

Meet Media is a social media clone app built to explore and understand:

- User registration, login, and authentication
- Authorization with protected routes
- Adding and removing friends
- Liking and commenting on posts
- Feed manipulation based on location (e.g., feed posts vs. user-only posts)

---

## 💻 Tech Stack

### 🗄️ Backend (Node.js + Express + MongoDB)

**Core:**
- **express** – Handles routing and middleware for API endpoints.
- **mongoose** – ODM for MongoDB to define schemas and interact with the database.
- **dotenv** – Loads environment variables from `.env` into `process.env`.
- **body-parser** – Parses incoming JSON and URL-encoded data.
- **cors** – Enables Cross-Origin Resource Sharing for frontend-backend communication.
- **helmet** – Sets secure HTTP headers for basic security.
- **morgan** – Logs HTTP requests for debugging purposes.
- **bcrypt** – Hashes passwords for secure authentication.
- **jsonwebtoken** – Manages JWT-based authentication and access control.

**File Uploads:**
- **multer** – Handles `multipart/form-data` for file uploads.

---

### 🌐 Frontend (React + Vite + Tailwind CSS)

**Core:**
- **react** – Builds component-based user interfaces.
- **react-router-dom** – Provides client-side routing.

**State Management:**
- **@reduxjs/toolkit** – Simplifies Redux state management.
- **react-redux** – Connects React components with the Redux store.
- **redux-persist** – Persists Redux state across page reloads.

**UI & Styling:**
- **tailwindcss** – Utility-first CSS framework for rapid UI development.
- **@mui/icons-material and react-icons** – Button icons derived from here.

**Forms & Validation:**
- **formik** – Handles form state and submission in React.
- **yup** – Schema validation library used with Formik for form validation.

**File Upload UI:**
- **react-dropzone** – Enables drag-and-drop file upload zones in React components.

---

## 🐞 Known Bugs

- **Friend Removal Bug**  
  Removing a friend while viewing a different user's profile causes the app to crash and removes all friends from the frontend state.
  - **Frontend**: `friends` becomes `undefined`
  - **Backend**: The database remains unaffected

---
