document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-cu-dialog-btn]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget.dataset.cuDialogTargetId
                || e.currentTarget.getAttribute('data-cu-dialog-target-id')
                || '').replace(/^#/, '');
            const safe = window.CSS?.escape ? CSS.escape(id) : id;
            const dlg = document.querySelector(`dialog[data-cu-dialog-id="${safe}"]`);
            dlg?.showModal?.(); // öffnet modalen Dialog, falls vorhanden
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.nodeName !== 'DIALOG') return;
        e.target.close();
    });

    // document.addEventListener('click', (e) => {
    //     console.log('Clicked element:', e.target);
    // });
});