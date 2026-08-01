import { createTable } from "../ui/table.js";

export function renderPlayers(players = []) {

    const tableHtml = createTable({

        columns: [
            "Name",
            "Group",
            "Account",
            "Marches",
            "Actions"
        ],

        data: players,

        emptyMessage: "No players found.",

        renderRow: player => `
            <tr>

                <td>${player.name}</td>

                <td>${player.groupName ?? "-"}</td>

                <td>${player.accountType ?? "Main"}</td>

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
        `

    });

    return `
        <div class="card bg-dark border-secondary">

            <div class="card-header d-flex justify-content-between align-items-center">

                <h3 class="mb-0">👥 Players</h3>

                <button class="btn btn-success" id="addPlayerBtn">
                    + Add Player
                </button>

            </div>

            <div class="card-body">

                ${tableHtml}

            </div>

        </div>
    `;

}
