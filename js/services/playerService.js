import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const playersRef = collection(db, "players");

export async function getPlayers() {
    const snapshot = await getDocs(playersRef);

    return snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));
}

export async function addPlayer(player) {
    return addDoc(playersRef, player);
}

export async function deletePlayer(id) {
    return deleteDoc(doc(db, "players", id));
}

export async function editPlayer(id, player) {
    return updateDoc(doc(db, "players", id), player);
}
