import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


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
    },

    getData: async function () {
        const querySnapshot = await getDocs(collection(db, "counting"));
        let dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            userName: doc.get("name"),
        }));
        return dataArray;
    }
}