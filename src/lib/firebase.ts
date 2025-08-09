// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration from the Firebase console
const firebaseConfig = {
  "projectId": "nexus-learn-n2hef",
  "appId": "1:509059181154:web:13b5f1968f9e4bd9e13f3b",
  "storageBucket": "nexus-learn-n2hef.firebasestorage.app",
  "apiKey": "AIzaSyCQqByX-DpPXhpYaVfkEsflKYNkU57eGlA",
  "authDomain": "nexus-learn-n2hef.firebaseapp.com",
  "messagingSenderId": "509059181154"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
