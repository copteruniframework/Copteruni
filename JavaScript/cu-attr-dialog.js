document.addEventListener("DOMContentLoaded", () => {
    const dialogButtons = document.querySelectorAll('[data-cu-dialog-btn]');
    dialogButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Dein Code hier
            
            const dialogID = btn.dataset.cuDialogTargetId; //oder: const dialogID = btn.getAttribute('data-cu-dialog-target-id');
            //console.log(dialogID, btn);

            const dialog = document.querySelector(`dialog[data-cu-dialog-id="${dialogID}"]`);
            //console.log(dialogID, dialog);

            if (dialog) {
                dialog.showModal();
            }
        });
    });
});