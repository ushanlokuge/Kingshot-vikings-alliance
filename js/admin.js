import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";
import {
    getPlayers,
    addPlayer,
    deletePlayer,
    editPlayer
} from "./services/playerService.js";

const content = document.getElementById("content");

const pages = {
    players: renderPlayers,
    heroes: renderHeroes,
    groups: renderGroups,
    generate: renderGenerate
};
async function loadPlayerTable() {

    const players = await getPlayers();

    const tbody = document.getElementById("playerTable");

    tbody.innerHTML = "";

    if (players.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    No players found.
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

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm deletePlayer"
                        data-id="${player.id}">

                        Delete

                    </button>

                </td>

            </tr>
        `;

    });

}

async function loadPage(page) {

    content.innerHTML = pages[page]();

    if (page === "players") {

        await loadPlayerTable();

       document
        .getElementById("addPlayerBtn")
        .addEventListener("click", showPlayerModal);

    }

}
function showPlayerModal(){

    const modal = new bootstrap.Modal(
        document.getElementById("playerModal")
    );

    modal.show();

}
loadPage("players");

document.querySelectorAll(".list-group-item").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".list-group-item")
            .forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        loadPage(btn.dataset.page);

    });

});
