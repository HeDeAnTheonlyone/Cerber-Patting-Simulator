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
            const confObj = JSON.parse(configString);
            const app = initializeApp(confObj);
            this.db = getFirestore(app);
        
            this.getData();
        } catch (e) {
            console.error("Error initializing db: ", e);
        }
    },

    addData: async function (data) {
        try {
            await addDoc(collection(this.db, "counting"), { count: data });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },

    getData: async function () {
        const querySnapshot = await getDocs(collection(this.db, "counting"));
        let globCount = 0;
        let counters = 0;

        querySnapshot.docs.map((doc) => {
            globCount += doc.data().count;
            counters ++;
        });

        if (counters >= 10) {
            await this.deleteData();
            await this.addData({ count: globCount });
        }

        await window.dotNetObjRef.invokeMethodAsync("SetPattingCount", `${globCount}`);
    },

    deleteData: async function () {
        try {
            await deleteDoc(collection(this.db, "counting"))
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }
}

// window.addEventListener('beforeunload', async (event) => {
//     let count = await window.dotNetObjRef.invokeMethodAsync("GetPattingCount");
//     await db.addData(count);
//     console.log("finished adding data to db"); //DEBUG
//     event.preventDefault();
// });
