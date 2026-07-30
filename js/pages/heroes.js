import { createTable } from "../ui/table.js";

export function renderHeroes(heroes = []) {

    const table = createTable({
        tbodyId: "heroTableBody",
        columns: [
            "Order",
            "Hero Name",
            "Actions"
        ],

        data: heroes,

        emptyMessage: "No heroes found.",

        renderRow: hero => `

            <tr data-id="${hero.id}">

                <td>${hero.order}</td>

                <td>${hero.name}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm editHero"
                        data-id="${hero.id}">

                        ✏ Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm deleteHero"
                        data-id="${hero.id}">

                        🗑 Delete

                    </button>

                </td>

            </tr>

        `

    });

    return `

        <div class="card bg-dark border-secondary">

            <div class="card-header d-flex justify-content-between align-items-center">

                <h3 class="mb-0">

                    🛡 Heroes

                </h3>

                <button
                    class="btn btn-success"
                    id="addHeroBtn">

                    + Add Hero

                </button>

            </div>

            <div class="card-body">

                ${table}

            </div>

        </div>

    `;

}
