document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    img.loading = 'lazy'
    img.decoding = 'async'
})