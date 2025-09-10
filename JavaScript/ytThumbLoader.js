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

    function pickVariant(width) {
        if (width <= 320) return 'mqdefault'
        if (width < 1420) return 'sddefault'
        return 'maxresdefault'
    }

    const variant = pickVariant(width)
    img.src = ytThumbUrl(id, variant)
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-yt-id]').forEach(img => {
        const id = img.dataset.ytId
        const width = Math.round(img.getBoundingClientRect().width)
        console.log(`[ytThumb] id=${id} width=${width}px`)
    })
})
