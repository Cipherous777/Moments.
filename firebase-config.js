import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEuygVxZYRlPxREKnWBXbw7GrmRg_ynvw",
  authDomain: "momentsv2-e821b.firebaseapp.com",
  projectId: "momentsv2-e821b",
  storageBucket: "momentsv2-e821b.firebasestorage.app",
  messagingSenderId: "208548873373",
  appId: "1:208548873373:web:7129f1de014831afd20074",
  measurementId: "G-9SH7927M6E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, query, orderBy, limit };