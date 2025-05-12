// fire.js

import { auth } from "./firebaseconfig"; // Adjust the path as necessary
import { db } from "./firebaseconfig";  // Adjust the path as necessary
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

// Register
export const registerUser = async (email, password, fullName, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString()
    });

    console.log("User registered: ", user);
    console.log("User data stored in Firestore");

  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error(error.message);
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};