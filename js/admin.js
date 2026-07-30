import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";

import {
    getPlayers,
    addPlayer
} from "./services/playerService.js";

import {
    getGroups,
    addGroup,
    updateGroup,
    deleteGroup
} from "./services/groupService.js";
import {
    getHeroes,
    addHero,
    updateHero,
    deleteHero
} from "./services/heroService.js";
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

    try {

        const players = await getPlayers();

        content.innerHTML = renderPlayers(players);

        document
            .getElementById("addPlayerBtn")
            .addEventListener("click", showPlayerModal);

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <div class="alert alert-danger">
                Failed to load players.
            </div>
        `;

    }

}

// ----------------------------
// Load Group Table
// ----------------------------
async function loadGroupTable() {

    try {

        const groups = await getGroups();

        content.innerHTML = renderGroups(groups);

        document
            .getElementById("addGroupBtn")
            .addEventListener("click", showGroupModal);

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <div class="alert alert-danger">

                Failed to load groups.

            </div>
        `;

    }

}
// ----------------------------
// Load Hero Table
// ----------------------------
async function loadHeroTable() {

    try {

        const heroes = await getHeroes();

        content.innerHTML = renderHeroes(heroes);

        document
            .getElementById("addHeroBtn")
            .addEventListener("click", showHeroModal);

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <div class="alert alert-danger">
                Failed to load heroes.
            </div>
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
// Group Modal
// ----------------------------
let groupModal;

function showGroupModal() {

    document.getElementById("groupId").value = "";
    document.getElementById("groupName").value = "";

    if (!groupModal) {
        groupModal = new bootstrap.Modal(
            document.getElementById("groupModal")
        );
    }

    groupModal.show();

}
// ----------------------------
// Save Group
// ----------------------------
async function saveGroup() {

    const name = document
        .getElementById("groupName")
        .value
        .trim();

    if (!name) {

        alert("Please enter a group name.");

        return;

    }

    await addGroup({ name });

    groupModal.hide();

    await loadGroupTable();

}
// ----------------------------
// Hero Modal
// ----------------------------
let heroModal;

function showHeroModal() {

    document.getElementById("heroId").value = "";
    document.getElementById("heroName").value = "";
    document.getElementById("heroOrder").value = "";

    if (!heroModal) {

        heroModal = new bootstrap.Modal(
            document.getElementById("heroModal")
        );

    }

    heroModal.show();

}

// ----------------------------
// Save Hero
// ----------------------------
async function saveHero() {
    console.log("Save Hero clicked");
    const id = document.getElementById("heroId").value;

    const hero = {

        name: document.getElementById("heroName").value.trim(),

        order: parseInt(document.getElementById("heroOrder").value)

    };

    if (!hero.name) {

        alert("Please enter a hero name.");
        return;

    }

    if (id === "") {

        await addHero(hero);

    } else {

        await updateHero(id, hero);

    }

    heroModal.hide();

    await loadHeroTable();

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
                .getElementById("savePlayerBtn")
                .onclick = savePlayer;
            break;

        case "heroes":
             await loadHeroTable();

            document
                .getElementById("saveHeroBtn")
                .onclick = saveHero;
            break;

        case "groups":
            await loadGroupTable();
            document
                .getElementById("saveGroupBtn")
                .onclick = saveGroup;
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
