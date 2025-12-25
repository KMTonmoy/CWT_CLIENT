import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: "AIzaSyCPLq2oam0-DSaFZK4VYYSh_cdL9sgibG4",
  authDomain: "cwt-auth.firebaseapp.com",
  projectId: "cwt-auth",
  storageBucket: "cwt-auth.firebasestorage.app",
  messagingSenderId: "844191088424",
  appId: "1:844191088424:web:d022de1e937c8829619a1d",
  measurementId: "G-SBJ16F8EQJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 