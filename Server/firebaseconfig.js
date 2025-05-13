// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- Import getAuth for Firebase Authentication
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAa6ycvAMbFb532RdHauycIL6k-kLaRko",
  authDomain: "home-security-c6c4d.firebaseapp.com",
  projectId: "home-security-c6c4d",
  storageBucket: "home-security-c6c4d.firebasestorage.app",
  messagingSenderId: "671382385117",
  appId: "1:671382385117:web:c48a26e06dcdb941d1c634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // <-- Initialize the Auth service
const db = getFirestore(app); // <-- Initialize Firestore (if you're using Firestore)
const storage = getStorage(app); // Initialize Firebase Storage


// Export auth and db if needed in other files
export { auth, db, storage };