import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsXn8rNSWatdEquG98MUX5g8aKqiVlfpE",
  authDomain: "herkat-3290c.firebaseapp.com",
  projectId: "herkat-3290c",
  storageBucket: "herkat-3290c.appspot.com",
  messagingSenderId: "341678091521",
  appId: "1:341678091521:web:419f87571e0480d456ff00",
  measurementId: "G-GBNMXXCCC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider()