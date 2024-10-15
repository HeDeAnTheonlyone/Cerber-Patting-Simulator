import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import {
    getFirestore,
    updateDoc,
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


window.db = {
    db: null,
    dotNetObjRef: null,

    init: function (configString, dotNetObjRef) {
        this.dotNetObjRef = dotNetObjRef;

        window.addEventListener('beforeunload', (event) => {
            this.dotNetObjRef.invokeMethodAsync("IsAllDataSaved")
                .then((isSaved) => {
                    if (isSaved === false) event.preventDefault();
                });
        });

        try {
            const confObj = JSON.parse(configString);
            const app = initializeApp(confObj);
            this.db = getFirestore(app);
        
            this.loadData();
        } catch (e) {
            console.error("Error initializing db: ", e);
        }
    },

    updateData: async function (count) {
        const docRef = doc(this.db, "counting", "users");
        const userId = getUserId();

        try {
            await updateDoc(docRef, {
                [userId]: count
            });
        } catch (e) {
            console.error("Error adding field: ", e);
        }
    },

    loadData: async function () {
        const docSnapshot = await getDoc(doc(this.db, "counting", "users"));
        const data = docSnapshot.data();
        const userId = getUserId();

        let globalCount = 0;
        let localCount = 0;

        for (const key in data) {
            if (key === userId) {
                localCount = data[key];
            } else {
                globalCount += data[key];
            }
        }

        await this.dotNetObjRef.invokeMethodAsync("SetPattingCount", `${globalCount}`, `${localCount}`);
    }
}

function getUserId() {
    let userId = localStorage.getItem("userId");

    if (userId === null) {
        userId = `${Date.now()}-${crypto.randomUUID()}`
        localStorage.setItem("userId", userId);
    }

    return userId;
}
