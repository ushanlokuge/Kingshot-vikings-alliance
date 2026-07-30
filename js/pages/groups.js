import { createTable } from "../ui/table.js";

export function renderGroups(groups = []) {

    const table = createTable({
        tbodyId: "groupTableBody",
        columns: [
            "Order",
            "Group Name",
            "Actions"
        ],

        data: groups,

        emptyMessage: "No groups found.",

        renderRow: group => `

            <tr data-id="${group.id}">
              <td>${group.order}</td>
                <td>${group.name}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm editGroup"
                        data-id="${group.id}">

                        ✏ Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm deleteGroup"
                        data-id="${group.id}">

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

                    📂 Groups

                </h3>

                <button
                    class="btn btn-success"
                    id="addGroupBtn">

                    + Add Group

                </button>

            </div>

            <div class="card-body">

                ${table}

            </div>

        </div>

    `;

}
