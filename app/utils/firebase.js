import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEO8e0CSd_Nsb7q7XZD3ZDTVcYqXRpGYA",
  authDomain: "final-exam-52d0c.firebaseapp.com",
  projectId: "final-exam-52d0c",
  storageBucket: "final-exam-52d0c.appspot.com",  
  messagingSenderId: "634019993761",
  appId: "1:634019993761:web:a6a9aac972c8bd1e4cb8e0",
  measurementId: "G-L3F21FM7XW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; 
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};
