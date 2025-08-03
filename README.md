# 🧑‍💼🌐 Mini LinkedIn Platform

A minimal social networking platform built with the MERN stack that allows users to register/login with OTP, create and view posts, connect with other users, and manage profiles — similar to a basic version of LinkedIn.

---

### 📌 Features

- ✅ **User Authentication**: Secure email-based registration and login using a one-time password (OTP).
- 🔐 **JWT-based Login**: Uses JSON Web Tokens for secure authentication and session management.
- 👤 **User Profiles**: Users can create and manage their personal profiles, including name, email, and a bio.
- 📝 **Public Post Feed**: A feed where users can create, edit, delete, and view posts.
- 🤝 **Suggested Connections**: Find and connect with other users on the platform.
- 🧑‍💻 **Profile Page**: Each user has a dedicated profile page showcasing their information and all their posts.
- 🔍 **Search Functionality**: Users can search for posts by their content.
- 📱 **Responsive Layout**: Designed to be mobile-friendly using Material UI (MUI).

---

### 🛠 Tech Stack

**Frontend**
- **React + Vite**: A modern and fast build tool for the frontend.
- **React Router DOM**: For handling client-side routing.
- **Material UI (MUI)**: A popular React UI framework for a responsive design.
- **Axios**: A promise-based HTTP client for making API requests.

**Backend**
- **Node.js + Express**: A robust and scalable backend server framework.
- **MongoDB (Mongoose)**: A NoSQL database and an ODM for elegant data modeling.
- **JWT**: For secure authentication.
- **Bcrypt**: For hashing passwords to ensure they are securely stored.
- **Nodemailer**: To handle the sending of OTP emails for user verification.

---

### 🚀 Getting Started

Follow these steps to set up and run the project locally.

#### 🖥️ Frontend Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/mpremkumar9999/Mini_Linkedin_frontend.git](https://github.com/mpremkumar9999/Mini_Linkedin_frontend.git)
    ```

2.  **Navigate to the Frontend Directory**
    ```bash
    cd Mini_Linkedin_frontend
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Create a `.env` file**
    In the root of the frontend directory, create a `.env` file and add the following line.
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

5.  **Start the Frontend Server**
    ```bash
    npm run dev
    ```
    Your frontend application will now be running and accessible at: `http://localhost:5173`

#### ⚙️ Backend Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/mpremkumar9999/Mini_Linkedin_backend.git](https://github.com/mpremkumar9999/Mini_Linkedin_backend.git)
    ```

2.  **Navigate to the Backend Directory**
    ```bash
    cd Mini_Linkedin_backend
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Create a `.env` file**
    In the root of the backend directory, create a `.env` file and add the required environment variables.
    ```env
    PORT=5000
    MONGO_URL=your_mongodb_connection_url
    JWT_SECRET=your_secret_key_for_jwt
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password
    ```
    > 📧 **Note:** If you're using a service like Gmail with Two-Factor Authentication, you'll need to generate and use an **App Password** for `EMAIL_PASS` instead of your regular password.

5.  **Start the Backend Server**
    ```bash
    nodemon server.js
    ```
    Your backend API will now be running and listening for requests on: `http://localhost:5000`

---

### 🤝 Connect with the Developer

- [GitHub Profile](https://github.com/mpremkumar9999)
