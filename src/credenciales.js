// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0bQEtYqdpd4asPFCDNnYxGipp0wjOSSo",
  authDomain: "ebooks-22250.firebaseapp.com",
  projectId: "ebooks-22250",
  storageBucket: "ebooks-22250.firebasestorage.app",
  messagingSenderId: "963032498939",
  appId: "1:963032498939:web:b60bcda2a122ad36b4a65e",
  measurementId: "G-LF5R2J3SDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);