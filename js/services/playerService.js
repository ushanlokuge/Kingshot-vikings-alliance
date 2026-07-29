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

const playersRef = collection(db, "players");

// ----------------------------
// Get All Players
// ----------------------------
export async function getPlayers() {

    try {

        const q = query(
            playersRef,
            orderBy("group"),
            orderBy("name")
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {

        console.error("Error loading players:", error);

        // Fallback if composite index doesn't exist
        const snapshot = await getDocs(playersRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    }

}

// ----------------------------
// Add Player
// ----------------------------
export async function addPlayer(player) {
    return await addDoc(playersRef, player);
}

// ----------------------------
// Delete Player
// ----------------------------
export async function deletePlayer(id) {
    return await deleteDoc(doc(db, "players", id));
}

// ----------------------------
// Edit Player
// ----------------------------
export async function editPlayer(id, player) {
    return await updateDoc(doc(db, "players", id), player);
}
