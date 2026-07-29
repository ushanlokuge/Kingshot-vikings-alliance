import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const groupsRef = collection(db, "groups");

export async function getGroups() {

    const snapshot = await getDocs(groupsRef);

    return snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));

}

export async function addGroup(group) {

    return addDoc(groupsRef, group);

}

export async function updateGroup(id, group) {

    return updateDoc(doc(db, "groups", id), group);

}

export async function deleteGroup(id) {

    return deleteDoc(doc(db, "groups", id));

}
