import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadHeroes() {

    const snapshot = await getDocs(collection(db,"heroes"));

    snapshot.forEach(doc=>{

        console.log(doc.data());

    });

}

loadHeroes();
