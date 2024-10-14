import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


window.db = {
    db: null,

    init: function (configString) {
        try {
            let confObj = JSON.parse(configString);
            let app = initializeApp(confObj);
            this.db = getFirestore(app);

            console.log("DB initalized");
        } catch (e) {
            console.log("Error initializing db: ", e);
        }
    },

    addData: async function (data) {
        try {
            const docRef = await addDoc(collection(this.db, "counting"), data);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },

    getData: async function () {
        const querySnapshot = await getDocs(collection(this.db, "counting"));
        let globCount = 0;
        querySnapshot.docs.map((doc) => (globCount += doc.count));
        return globCount;
    }
}

// window.addEventListener('beforeunload', async (event) => {
//     const count = await window.dotNetObjRef.invokeMethodAsync("GetPattingCount");
//     console.log(count);
//     await db.addData({ count: count });
//     console.log("finished adding data to db");
//     event.preventDefault();
// });