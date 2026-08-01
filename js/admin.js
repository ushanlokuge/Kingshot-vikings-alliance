import { renderPlayers } from "./pages/players.js";
import { renderHeroes } from "./pages/heroes.js";
import { renderGroups } from "./pages/groups.js";
import { renderGenerate } from "./pages/generate.js";

import {
    getPlayers,
    addPlayer,
    editPlayer,
    deletePlayer
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
        const groups = await getGroups();

        players.forEach(player => {

            const group = groups.find(g => g.id === player.groupId);

            player.groupName = group ? group.name : "-";

            });

        content.innerHTML = renderPlayers(players);
    

        document
            .getElementById("addPlayerBtn")
            .addEventListener("click", showPlayerModal);
        document.querySelectorAll(".editPlayer").forEach(button => {

            button.addEventListener("click", async () => {
        
                const players = await getPlayers();
        
                const player =
                    players.find(p => p.id === button.dataset.id);
        
                showPlayerModal(player);
        
            });
        
        });
        
        document.querySelectorAll(".deletePlayer").forEach(button => {
        
            button.addEventListener("click", async () => {
        
                const playerName =
                    button.closest("tr").children[0].textContent;
        
                if (!confirm(`Delete "${playerName}"?`))
                    return;
        
                await deletePlayer(button.dataset.id);
        
                await loadPlayerTable();
        
            });
        
        });
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

            document.querySelectorAll(".editGroup").forEach(button => {
                button.addEventListener("click", async () => {
                    console.log("Edit clicked:", button.dataset.id);
                    const groups = await getGroups();
                    const group = groups.find(g => g.id === button.dataset.id);
                    console.log(group);
                    showGroupModal(group);
                });
            });
        document
            .querySelectorAll(".deleteGroup").forEach(button => {
                button.addEventListener("click", async () => {
                const GroupName = button.closest("tr")
                    .children[1]
                    .textContent;
                const confirmed = confirm(
                    `Delete Group "${GroupName}"?`
                );
                if (!confirmed)
                    return;
                try {
                    await deleteGroup(button.dataset.id);
                    await loadGroupTable();
                } catch (error) {
                    console.error(error);
                    alert("Failed to delete Group.");
                    }
                });
            });
       const groupTableBody = document.getElementById("groupTableBody");

        new Sortable(groupTableBody, {
    animation: 150,
    ghostClass: "table-active",
    onEnd: async () => {
        const rows = groupTableBody.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].children[0].textContent = i + 1;
            await updateGroup(rows[i].dataset.id, {
                order: i + 1
            });
        }
        await loadGroupTable();
    }
});

} catch (error) {

        console.error(error);

        content.innerHTML = `
            <div class="alert alert-danger">
                Failed to load Groups.
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

            document.querySelectorAll(".editHero").forEach(button => {
                button.addEventListener("click", async () => {
                    const heroes = await getHeroes();
                    const hero = heroes.find(h => h.id === button.dataset.id);
                showHeroModal(hero);
                });
            });
        document
            .querySelectorAll(".deleteHero").forEach(button => {
                button.addEventListener("click", async () => {
                const heroName = button.closest("tr")
                    .children[1]
                    .textContent;
                const confirmed = confirm(
                    `Delete hero "${heroName}"?`
                );
                if (!confirmed)
                    return;
                try {
                    await deleteHero(button.dataset.id);
                    await loadHeroTable();
                } catch (error) {
                    console.error(error);
                    alert("Failed to delete hero.");
                    }
                });
            });
       const heroTableBody = document.getElementById("heroTableBody");

new Sortable(heroTableBody, {
    animation: 150,
    ghostClass: "table-active",
    onEnd: async () => {
        const rows = heroTableBody.querySelectorAll("tr");

        for (let i = 0; i < rows.length; i++) {
            rows[i].children[0].textContent = i + 1;

            await updateHero(rows[i].dataset.id, {
                order: i + 1
            });
        }

        await loadHeroTable();
    }
});
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

async function loadPlayerGroups(selectedGroup = "") {

    const groups = await getGroups();

    const groupSelect = document.getElementById("playerGroup");

    groupSelect.innerHTML = "";

    groups.forEach(group => {

        groupSelect.innerHTML += `
            <option value="${group.id}">
                ${group.name}
            </option>
        `;

    });

    if (selectedGroup) {
         select.value = selectedGroupId;
        //groupSelect.value = selectedGroup;

    }

}
async function showPlayerModal(player = null) {

    if (!playerModal) {

        playerModal = new bootstrap.Modal(
            document.getElementById("playerModal")
        );

    }

    if (player) {

        // Edit
        document.getElementById("playerId").value = player.id;
        document.getElementById("playerName").value = player.name;
        //document.getElementById("playerGroup").value = player.group;
        await loadPlayerGroups(player.groupId);
        document.getElementById("playerAccountType").value = player.accountType ?? "Main";
        document.getElementById("playerMarches").value = player.marches;
        document.getElementById("playerNotes").value = player.notes ?? "";
        document.getElementById("playerActive").checked = player.active ?? true;

    } else {

        // Add
        document.getElementById("playerId").value = "";
        document.getElementById("playerName").value = "";
        //document.getElementById("playerGroup").selectedIndex = 0;
        await loadPlayerGroups();
        document.getElementById("playerAccountType").value = "Main";
        document.getElementById("playerMarches").value = 5;
        document.getElementById("playerNotes").value = "";
        document.getElementById("playerActive").checked = true;

    }

    playerModal.show();

}
// ----------------------------
// Save Player
// ----------------------------
async function savePlayer() {
    const id = document.getElementById("playerId").value || "";
    console.log("Player ID:", `"${id}"`);
const player = {

    name: document.getElementById("playerName").value.trim(),

    groupId: document.getElementById("playerGroup").value,

    accountType:
        document.getElementById("playerAccountType").value,

    marches:
        parseInt(document.getElementById("playerMarches").value),

    notes:
        document.getElementById("playerNotes").value,

    active:
        document.getElementById("playerActive").checked

};

if (!id || id === "undefined") {

    await addPlayer(player);

}
else {

    await editPlayer(id, player);

}

playerModal.hide();
}

// ----------------------------
// Group Modal
// ----------------------------
let groupModal;

function showGroupModal(group = null) {

    if (!groupModal) {

        groupModal = new bootstrap.Modal(
            document.getElementById("groupModal")
        );

    }

    if (group) {

        document.getElementById("groupId").value = group.id;
        document.getElementById("groupName").value = group.name;
        

    } else {

        document.getElementById("groupId").value = "";
        document.getElementById("groupName").value = "";
        

    }

    groupModal.show();

}
// ----------------------------
// Save Group
// ----------------------------
async function saveGroup() {
    console.log("Save Group clicked");
    const id = document.getElementById("groupId").value;

    const group = {

        name: document.getElementById("groupName").value.trim(),

        

    };

    if (!group.name) {

        alert("Please enter a group name.");
        return;

    }

    if (id === "") {

        const groups = await getGroups();

        group.order = groups.length + 1;

        await addGroup(group);

    } else {

        await updateGroup(id, {
            name: group.name
        });

    }

    groupModal.hide();

    await loadGroupTable();

}        
// ----------------------------
// Hero Modal
// ----------------------------
let heroModal;

function showHeroModal(hero = null) {

    if (!heroModal) {
        heroModal = new bootstrap.Modal(
            document.getElementById("heroModal")
        );
    }

    if (hero) {
        // Edit mode
        document.getElementById("heroId").value = hero.id;
        document.getElementById("heroName").value = hero.name;
        document.getElementById("heroOrder").value = hero.order;
    } else {
        // Add mode
        document.getElementById("heroId").value = "";
        document.getElementById("heroName").value = "";
        document.getElementById("heroOrder").value = "";
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

