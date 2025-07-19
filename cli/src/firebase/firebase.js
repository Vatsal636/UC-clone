// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYqDbcdr5I6q4L-N0_5lAM5Zy2Eyxcioc",
    authDomain: "urban-services-db57b.firebaseapp.com",
    projectId: "urban-services-db57b",
    storageBucket: "urban-services-db57b.firebasestorage.app",
    messagingSenderId: "468039016921",
    appId: "1:468039016921:web:fc240ded73ff1d0248f9c8",
    measurementId: "G-8JWL3DFNTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export auth
const auth = getAuth(app);
export { auth }; 
