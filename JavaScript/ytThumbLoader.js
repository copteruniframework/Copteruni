document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    img.loading = 'lazy'
    img.decoding = 'async'
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    const width = Math.round(img.getBoundingClientRect().width)
    console.log(`[ytThumb] id=${id} width=${width}px`)
  })
})
