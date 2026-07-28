import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const playersCollection = collection(db, "players");

export async function loadPlayers() {

    const table = document.getElementById("playerTable");

    table.innerHTML = "";

    const snapshot = await getDocs(playersCollection);

    snapshot.forEach(playerDoc => {

        const player = playerDoc.data();

        table.innerHTML += `
            <tr>

                <td>${player.name}</td>

                <td>${player.group}</td>

                <td>${player.marches}</td>

                <td>

                    <button
                        class="btn btn-danger btn-sm deletePlayer"
                        data-id="${playerDoc.id}">

                        Delete

                    </button>

                </td>

            </tr>
        `;

    });

    document.querySelectorAll(".deletePlayer").forEach(btn => {

        btn.onclick = async () => {

            await deleteDoc(doc(db, "players", btn.dataset.id));

            loadPlayers();

        };

    });

}

export async function addPlayer(name, group, marches) {

    await addDoc(playersCollection, {

        name,
        group,
        marches

    });

}
