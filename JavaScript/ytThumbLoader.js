const ytThumbnailImages = document.querySelectorAll('img[data-yt-id]')

ytThumbnailImages.forEach(img => {
  const id = img.dataset.ytId
  img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  img.loading = img.loading || 'lazy'
})