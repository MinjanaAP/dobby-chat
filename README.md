# Dobby~Chat - Real-Time Messaging App

A **real-time messaging application** built with **React, Vite, and Firebase**. This app allows users to sign in using **Google or email/password**, search for other registered users, and engage in real-time conversations.

## ✨ Features

- 🔐 **Authentication**: Sign in with Google or email/password
- 👥 **User Search**: Find and message other registered users
- 💬 **Real-time Messaging**: Instant message delivery using Firebase Firestore
- 📅 **Date Grouping**: Messages organized by date (Today, Yesterday, etc.)
- 🟢 **Online Status**: See when other users are online
- 🎨 **Modern UI**: Built with Material-UI for a polished look
- 📱 **Responsive Design**: Works on mobile and desktop devices

---

## 🛠 Tech Stack

### **Frontend**
- React + Vite
- Material-UI (MUI) for UI components
- React Router for routing
- React Context (optional) for state management

### **Backend**
- Firebase Authentication (Google & Email/Password)
- Firestore Database
- Realtime Database (for presence tracking)

---

## 🚀 Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/MinjanaAP/dobby-chat.git
cd dobby-chat
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Firebase**
- Create a project in [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password and Google Sign-In)
- Enable **Firestore Database**
- Enable **Realtime Database**
- Add your Firebase config to `.env`

### **4️⃣ Run the Development Server**
```bash
npm run dev
```

---

## 🚢 Deployment

### **Deploy to Firebase Hosting**

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login & Initialize Firebase Hosting:**
```bash
firebase login
firebase init
```
   - Select **Hosting**
   - Choose your Firebase project
   - Set **build directory** as "dist"
   - Configure as **single-page app**: **Yes**

3. **Build & Deploy:**
```bash
npm run build
firebase deploy
```

---

## 📂 Project Structure
```
src/
├── components/       # Reusable components
│   ├── Auth/         # Authentication components
│   ├── Message/      # Message-related components
│   └── UI/           # General UI components
├── pages/            # Main page components
├── firebase.js       # Firebase configuration
├── App.jsx           # Main app component with routing
└── main.jsx          # App entry point
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the project**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

## 📞 Contact

**Your Name** – [@pasan-athuluwage] – pasanathuluwage28@gmail.com

Project Link: [https://github.com/MinjanaAP/dobby-chat](https://github.com/MinjanaAP/dobby-chat)

---

## 🙌 Acknowledgments

- **Firebase** for backend services
- **Material-UI** for UI components
- **Vite** for a fast development environment
- **React** for the frontend framework

