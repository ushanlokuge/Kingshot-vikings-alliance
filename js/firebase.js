import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfXkeO1jgmKWxGlnPur2XlWOOI_znefUc",
  authDomain: "kingshot-viking-manager.firebaseapp.com",
  projectId: "kingshot-viking-manager",
  storageBucket: "kingshot-viking-manager.firebasestorage.app",
  messagingSenderId: "1051812651833",
  appId: "1:1051812651833:web:38326d6b91353a4c2cfee8",
  measurementId: "G-QZF7DBBJGX"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
