const YT_VARIANTS = [
    { name: 'default', width: 120 },
    { name: 'mqdefault', width: 320 },
    { name: 'hqdefault', width: 480 },
    { name: 'sddefault', width: 640 },
    { name: 'maxresdefault', width: 1280 },
];

document.querySelectorAll('img[data-yt-id]').forEach(img => {
    const id = img.dataset.ytId
    const width = Math.round(img.getBoundingClientRect().width || img.clientWidth || 0)

    img.decoding ||= 'async'
    img.loading ||= 'lazy'

    if (width < 1420) {
        img.src = `https://i.ytimg.com/vi/${id}/sddefault.jpg`
        console.log(`id=${id}`)
    } else {
        // Optional: was laden wir sonst? Z.B. maxresdefault
        img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-yt-id]').forEach(img => {
        const id = img.dataset.ytId
        const width = Math.round(img.getBoundingClientRect().width)
        console.log(`[ytThumb] id=${id} width=${width}px`)
    })
})
