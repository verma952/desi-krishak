// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoP_iJxAuyL6z9NJp4RMs-uYXdajxqLjM",
  authDomain: "agrohaat-d442b.firebaseapp.com",
  projectId: "agrohaat-d442b",
  storageBucket: "agrohaat-d442b.firebasestorage.app",
  messagingSenderId: "626917614871",
  appId: "1:626917614871:web:a63158cb2f3108590bc352"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
