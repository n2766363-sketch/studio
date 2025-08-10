// This file is intended for server-side Firebase logic, if needed.
// For now, it is kept minimal to avoid build errors.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exporting the app is safe for server-side.
// Do not export getAuth() or getFirestore() here for now to avoid build issues.
export { app };
