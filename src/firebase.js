import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBv4n1-FIEephkZkmuzORZMZEgY0J1AZK8",
  authDomain: "booksansa-auth.firebaseapp.com",
  projectId: "booksansa-auth",
  storageBucket: "booksansa-auth.appspot.com",
  messagingSenderId: "674836149969",
  appId: "1:674836149969:web:8f3ef1735e3374b63837f0",
  measurementId: "G-F7SBCXPCS0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
