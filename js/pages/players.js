export function renderPlayers() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>👥 Players</h2>

            <button class="btn btn-success" id="addPlayerBtn">
                + Add Player
            </button>
        </div>

        <table class="table table-dark table-striped">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Marches</th>
                    <th></th>
                </tr>
            </thead>

            <tbody id="playerTable">

            </tbody>

        </table>
    `;
}
