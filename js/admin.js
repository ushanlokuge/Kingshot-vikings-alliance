import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";
import { loadPlayers, addPlayer } from "./playersCrud.js";
import { getPlayers } from "./services/playerService.js";

const content = document.getElementById("content");

const pages = {
    players: renderPlayers,
    heroes: renderHeroes,
    groups: renderGroups,
    generate: renderGenerate
};

async function loadPage(page) {

    content.innerHTML = pages[page]();

    if(page === "players"){

        await loadPlayers();

        document
            .getElementById("addPlayerBtn")
            .onclick = openPlayerDialog;

    }

}
async function openPlayerDialog(){

    const name = prompt("Player name");

    if(!name) return;

    const group = prompt("Group");

    if(!group) return;

    const marches = parseInt(prompt("Marches"));

    if(isNaN(marches)) return;

    await addPlayer(name, group, marches);

    loadPlayers();

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
