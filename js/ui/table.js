export function createTable(options) {

    const {
        columns = [],
        data = [],
        emptyMessage = "No records found.",
        renderRow
    } = options;

    let html = `
        <table class="table table-dark table-hover align-middle">
            <thead>
                <tr>
    `;

    columns.forEach(column => {
        html += `<th>${column}</th>`;
    });

    html += `
                </tr>
            </thead>
            <tbody>
    `;

    if (data.length === 0) {

        html += `
            <tr>
                <td colspan="${columns.length}" class="text-center text-secondary">
                    ${emptyMessage}
                </td>
            </tr>
        `;

    } else {

        data.forEach(item => {
            html += renderRow(item);
        });

    }

    html += `
            </tbody>
        </table>
    `;

    return html;

}
