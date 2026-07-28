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

//export async function getPlayers() {

//    const q = query(
//        playersRef,
//        orderBy("group"),
//        orderBy("name")
 //   );
export async function getPlayers() {

    const snapshot = await getDocs(playersRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function addPlayer(player){

    return await addDoc(playersRef, player);

}

export async function deletePlayer(id){

    return await deleteDoc(doc(db,"players",id));

}

export async function editPlayer(id,player){

    return await updateDoc(doc(db,"players",id),player);

}
