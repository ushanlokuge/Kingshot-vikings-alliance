import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";
import { loadPlayers, addPlayer } from "./playersCrud.js";

const content = document.getElementById("content");

const pages = {
    players: renderPlayers,
    heroes: renderHeroes,
    groups: renderGroups,
    generate: renderGenerate
};

function loadPage(page){

    content.innerHTML = pages[page]();

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
