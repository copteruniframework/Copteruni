const YT_VARIANTS = [
  { name: 'default',      width: 120 },
  { name: 'mqdefault',    width: 320 },
  { name: 'hqdefault',    width: 480 },
  { name: 'sddefault',    width: 640 },
  { name: 'maxresdefault',width: 1280 },
];

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
