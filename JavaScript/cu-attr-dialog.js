document.addEventListener("DOMContentLoaded", () => {
    const dialogButtons = document.querySelectorAll('[data-cu-dialog-btn]');
    dialogButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Dein Code hier
            const val = btn.getAttribute('data-cu-dialog-target-id');

            console.log(val, btn);
        });
    });
});