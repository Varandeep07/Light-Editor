import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeEAmoY-YGpCHuhbxZ4v-w88d2CJubz3g",
  authDomain: "docs-acd63.firebaseapp.com",
  projectId: "docs-acd63",
  storageBucket: "docs-acd63.appspot.com",
  messagingSenderId: "561863652393",
  appId: "1:561863652393:web:07e07a7cd19503bf99d838"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
