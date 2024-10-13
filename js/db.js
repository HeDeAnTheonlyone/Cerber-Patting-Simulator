import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase configuration details
// replace this configuration with your own configuration details
const firebaseConfig = {
    apiKey: "AIzaSyDKHQaqPsMsEG4YkUsAZ1MNea2GfalEupE",
    authDomain: "cerber-cd211.firebaseapp.com",
    projectId: "cerber-cd211",
    storageBucket: "cerber-cd211.appspot.com",
    messagingSenderId: "786115739250",
    appId: "1:786115739250:web:3ff8104b5ebc7387604ceb"
};

// Initialize Firebase with the configuration details
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Define a function to add a new user to the Firestore database
window.db = {
    addData: async function (data) {
        try {
            const docRef = await addDoc(collection(db, "counting"), data);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}