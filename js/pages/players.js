export function renderPlayers() {
    return `
        <div class="card bg-dark border-secondary">

            <div class="card-header d-flex justify-content-between align-items-center">

                <h3 class="mb-0">👥 Players</h3>

                <button class="btn btn-success" id="addPlayerBtn">
                    + Add Player
                </button>

            </div>

            <div class="card-body">

                <table class="table table-dark table-hover align-middle">

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Marches</th>
                            <th width="180">Actions</th>
                        </tr>

                    </thead>

                    <tbody id="playerTable">

                        <tr>
                            <td colspan="4" class="text-center">
                                Loading players...
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    `;
}
