export function renderPlayers() {

    return `
        <h2>👥 Players</h2>

        <button class="btn btn-success mb-3">
            + Add Player
        </button>

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
