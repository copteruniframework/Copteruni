const YT_IMG_HOST = 'https://i.ytimg.com/vi/'

function ytThumbUrl(id, variant = 'sddefault') {
    if (!id) return ''
    return `${YT_IMG_HOST}${encodeURIComponent(id)}/${variant}.jpg` // Init: ytThumbUrl(id, 'sddefault')
}

document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    const width = Math.round(img.getBoundingClientRect().width || 0)

    img.decoding ||= 'async'
    img.loading ||= 'lazy'

    if (width <= 320) {
        img.src = ytThumbUrl(id, 'mqdefault')
    } else if (width < 1420) {
        img.src = ytThumbUrl(id, 'sddefault')
    } else {
        img.src = ytThumbUrl(id, 'maxresdefault')
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-yt-id]').forEach(img => {
        const id = img.dataset.ytId
        const width = Math.round(img.getBoundingClientRect().width)
        console.log(`[ytThumb] id=${id} width=${width}px`)
    })
})
