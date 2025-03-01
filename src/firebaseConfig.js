// Importa Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0bQEtYqdpd4asPFCDNnYxGipp0wjOSSo",
  authDomain: "ebooks-22250.firebaseapp.com",
  projectId: "ebooks-22250",
  storageBucket: "ebooks-22250.appspot.com",
  messagingSenderId: "963032498939",
  appId: "1:963032498939:web:b60bcda2a122ad36b4a65e",
  measurementId: "G-LF5R2J3SDT"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
