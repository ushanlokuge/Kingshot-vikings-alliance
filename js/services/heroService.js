import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const heroesRef = collection(db, "heroes");

export async function getHeroes() {

     const q = query(heroesRef, orderBy("order"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));

}

export async function addHero(hero) {

    return addDoc(heroesRef, hero);

}

export async function updateHero(id, hero) {

    return updateDoc(doc(db, "heroes", id), hero);

}

export async function deleteHero(id) {

    return deleteDoc(doc(db, "heroes", id));

}
