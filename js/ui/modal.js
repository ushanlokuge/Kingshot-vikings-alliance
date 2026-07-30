let modal;

export function openModal({
    title,
    body,
    onSave
}) {

    const modalElement = document.getElementById("appModal");

    if (!modal) {
        modal = new bootstrap.Modal(modalElement);
    }

    modalElement.querySelector(".modal-title").textContent = title;

    modalElement.querySelector(".modal-body").innerHTML = body;

    const saveBtn = modalElement.querySelector("#modalSaveBtn");

    saveBtn.onclick = async () => {
        await onSave();
    };

    modal.show();

}

export function closeModal() {

    if (modal) {
        modal.hide();
    }

}
