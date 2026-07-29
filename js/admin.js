import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";

import {
    getPlayers,
    addPlayer
} from "./services/playerService.js";

// ----------------------------
// Main Content
// ----------------------------

const content = document.getElementById("content");

// ----------------------------
// Available Pages
// ----------------------------

const pages = {
    players: renderPlayers,
    heroes: renderHeroes,
    groups: renderGroups,
    generate: renderGenerate
};

// ----------------------------
// Load Player Table
// ----------------------------

async function loadPlayerTable() {

    const tbody = document.getElementById("playerTable");

    if (!tbody) return;

    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">
                Loading...
            </td>
        </tr>
    `;

    try {

        const players = await getPlayers();
        console.log(players);
        tbody.innerHTML = "";

        if (players.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No Players Found
                    </td>
                </tr>
            `;

            return;

        }

        players.forEach(player => {

            tbody.innerHTML += `
                <tr>

                    <td>${player.name}</td>

                    <td>${player.group}</td>

                    <td>${player.marches}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm editPlayer"
                            data-id="${player.id}">

                            ✏ Edit

                        </button>

                        <button
                            class="btn btn-danger btn-sm deletePlayer"
                            data-id="${player.id}">

                            🗑 Delete

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-danger text-center">
                    Failed to load players.
                </td>
            </tr>
        `;

    }

}

// ----------------------------
// Player Modal
// ----------------------------

let playerModal;

function showPlayerModal() {

    document.getElementById("playerName").value = "";
    document.getElementById("playerGroup").selectedIndex = 0;
    document.getElementById("playerMarches").value = 5;

    if (!playerModal) {
        playerModal = new bootstrap.Modal(
            document.getElementById("playerModal")
        );
    }

    playerModal.show();

}
// ----------------------------
// Save Player
// ----------------------------
async function savePlayer() {

    const name = document.getElementById("playerName").value.trim();
    const group = document.getElementById("playerGroup").value;
    const marches = parseInt(
        document.getElementById("playerMarches").value
    );

    if (!name) {

        alert("Please enter a player name.");
        return;

    }

    await addPlayer({
        name,
        group,
        marches
    });

    playerModal.hide();

    await loadPlayerTable();

}




// ----------------------------
// Load Selected Page
// ----------------------------

async function loadPage(page) {

    content.innerHTML = pages[page]();

    switch (page) {

        case "players":

            await loadPlayerTable();

            document
                .getElementById("addPlayerBtn")
                .addEventListener("click", showPlayerModal);
            
            document
                .getElementById("savePlayerBtn")
                .onclick = savePlayer;
            break;

        case "heroes":

            console.log("Heroes");

            break;

        case "groups":

            console.log("Groups");

            break;

        case "generate":

            console.log("Generate");

            break;

    }

}

// ----------------------------
// Sidebar Navigation
// ----------------------------

document.querySelectorAll(".list-group-item").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".list-group-item")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        loadPage(button.dataset.page);

    });

});

// ----------------------------
// Start App
// ----------------------------

loadPage("players");
