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
            let app = initializeApp(JSON.parse(configString));
            this.db = getFirestore(app);

            

            console.log("DB initalized");
        } catch (e) {
            console.log("confStr:", String.raw(configString));
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
        let dataArray = querySnapshot.docs.map((doc) => ({
            count: doc.count,
        }));
        return dataArray;
    }
}

// window.addBeforeUnloadListener = function () {
//     window.addEventListener('beforeunload', async (event) => {
//         event.preventDefault();

//         let count = window.dotNetObjRef.invokeMethodAsync("GetPattingCounter");
//         await db.addData(count);
//     });
// };