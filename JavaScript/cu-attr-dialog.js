// document.addEventListener("DOMContentLoaded", () => {
//     const dialogButtons = document.querySelectorAll('[data-cu-dialog-btn]');
//     dialogButtons.forEach((btn) => {
//         btn.addEventListener('click', (e) => {
//             e.preventDefault();
//             // Dein Code hier

//             const dialogID = btn.dataset.cuDialogTargetId; //oder: const dialogID = btn.getAttribute('data-cu-dialog-target-id');
//             //console.log(dialogID, btn);

//             const dialog = document.querySelector(`dialog[data-cu-dialog-id="${dialogID}"]`);
//             //console.log(dialogID, dialog);

//             if (dialog) {
//                 dialog.showModal();
//             }
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cu-dialog-btn]');
        if (!btn) return;

        if (btn.tagName === 'A') e.preventDefault();

        const raw = btn.dataset.cuDialogTargetId || btn.getAttribute('data-cu-dialog-target-id');
        if (!raw) return console.warn('Missing data-cu-dialog-target-id on:', btn);

        const id = raw.replace(/^#/, '');
        const selector = `dialog[data-cu-dialog-id="${CSS.escape(id)}"]`;
        const dialog = document.querySelector(selector);

        if (!dialog) return console.warn('Dialog not found for:', selector);

        // Aktion steuern: open | close | toggle (default)
        const action = (btn.dataset.cuDialogAction || 'toggle').toLowerCase();
        const isOpen = dialog.open;

        if (action === 'open' || (action === 'toggle' && !isOpen)) {
            if (dialog.showModal) dialog.showModal();
            else dialog.show && dialog.show();
        } else if (action === 'close' || (action === 'toggle' && isOpen)) {
            dialog.close();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.nodeName !== 'DIALOG') return;
        e.target.close();
    });

    // document.querySelectorAll('dialog').forEach((dlg) => {
    //     dlg.addEventListener('click', () => dlg.close());
    // });

    // document.querySelectorAll('dialog').forEach((dlg) => {
    //     dlg.addEventListener('click', (e) => {
    //         if (e.target === dlg) dlg.close();
    //     });
    // });



    document.addEventListener('click', (e) => {
        console.log('Clicked element:', e.target);
    });
});