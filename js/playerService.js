import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const playerCollection = collection(db, "players");

export async function getPlayers() {

    const q = query(playerCollection, orderBy("group"), orderBy("name"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
    }));

}

export async function createPlayer(player){

    await addDoc(playerCollection, player);

}

export async function removePlayer(id){

    await deleteDoc(doc(db,"players",id));

}

export async function updatePlayer(id, player){

    await updateDoc(doc(db,"players",id),player);

}
