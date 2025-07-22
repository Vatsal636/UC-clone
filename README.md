# 🌆 Urban Company - Clone

**UC-Clone** is a modern, feature-rich frontend web application for urban service booking, inspired by platforms like Urban Company. Built with React and Tailwind CSS, it provides a seamless, responsive user experience across devices. The project also includes a **basic backend setup** using Node.js and Express as a foundation for future expansion.

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [📦 Installation](#-Installation)
  - [▶️ Run the Application](#-run-the-application)
- [📜 Available Scripts](#-available-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- ✅ **Fully responsive** and sleek UI with modern animations
- 🛒 Service listing, cart, and checkout flow
- 🔐 Frontend UI for login/signup authentication
- 🎨 Integrated Lottie animations
- ⚛️ State management using Context API
- ⚙️ Backend boilerplate ready for future integration (Node.js + Express)

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- React Router
- Context API
- Lottie Web Animations

### **Backend** (Basic Setup)
- Node.js
- Express.js
- MongoDB (planned, not yet integrated)

---


## 📁 Project Structure

urban/
- │
- ├── client/ # Frontend (Fully Implemented)
- │ ├── public/
- │ └── src/
- │ ├── api/ # Axios/API methods (if used)
- │ ├── components/ # Reusable components (Navbar, Footer, Cards, etc.)
- │ ├── context/ # Global state management (Context API)
- │ ├── data/ # Static service data & dummy assets
- │ └── pages/ # Route-based views (Home, Services, Cart, etc.)
- │
- ├── server/ # Backend (Basic Setup)
- │ ├── controllers/
- │ ├── middleware/
- │ ├── models/
- │ ├── routes/
- │ └── config/


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14 or above)
- npm or yarn

---

### 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/urban.git
cd urban
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
```

---

### ▶️ Run the Application

#### Start the Frontend
```bash
cd client
npm start
```

#### Start the Backend
```bash
cd server
node server
```
