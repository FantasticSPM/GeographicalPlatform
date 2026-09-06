export function getPublicUrl(path) {
    if (path.startsWith('/')) {
        path = `.${path}`
    }
    const baseUrl = import.meta.env.BASE_URL
    const url = new URL(baseUrl, import.meta.url).href

    return new URL(path, url).href
}