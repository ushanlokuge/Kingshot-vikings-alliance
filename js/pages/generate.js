export function renderGenerate() {

    return `

        <div class="card bg-dark border-secondary">

            <div class="card-header">

                <h3 class="mb-0">
                    ⚔ Viking Reinforcement Generator
                </h3>

            </div>

            <div class="card-body">

                <div class="row">

                    <div class="col-md-4">

                        <label class="form-label">
                            Group
                        </label>

                        <select
                            class="form-select"
                            id="generateGroup">

                        </select>

                    </div>

                    <div class="col-md-4">

                        <label class="form-label">
                            Event Date
                        </label>

                        <input
                            type="date"
                            class="form-control"
                            id="eventDate">

                    </div>

                </div>

                <hr>

                <div class="row text-center">

                    <div class="col">

                        <h5>Players</h5>

                        <h3 id="playerCount">0</h3>

                    </div>

                    <div class="col">

                        <h5>Heroes</h5>

                        <h3 id="heroCount">0</h3>

                    </div>

                </div>

                <hr>

                <button
                    class="btn btn-success"
                    id="generateBtn">

                    🚀 Generate Reinforcements

                </button>

                <button
                    class="btn btn-primary ms-2"
                    id="saveSnapshotBtn"
                    disabled>

                    💾 Save Snapshot

                </button>

                <hr>

                <div id="generatePreview">

                    <div class="text-secondary">

                        No reinforcement plan generated.

                    </div>

                </div>

            </div>

        </div>

    `;

}
