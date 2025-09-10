document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    img.loading = 'lazy'
    img.decoding = 'async'
})