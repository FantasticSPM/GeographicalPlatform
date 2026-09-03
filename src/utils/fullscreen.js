function getFullscreenRequest(element) {
    return element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen ||
        element.msRequestFullscreen
}

function getFullscreenExit() {
    return document.exitFullscreen || document.webkitExitFullscreen || document.webkitCancelFullScreen ||
        document.mozCancelFullScreen || document.msExitFullscreen
}

// 返回当前处于全屏状态的元素，兼容主流浏览器的前缀 API。
export function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ||
        document.msFullscreenElement || null
}

export function supportsFullscreen(element = document.documentElement) {
    return Boolean(element && getFullscreenRequest(element) && getFullscreenExit())
}

// 进入全屏。element 可以传入 DOM 节点或选择器，默认让整个页面进入全屏。
export function fullScreen(element = document.documentElement) {
    const target = typeof element === 'string' ? document.querySelector(element) : element
    const request = target && getFullscreenRequest(target)

    if (!target || !request) {
        return Promise.reject(new Error('当前浏览器不支持全屏'))
    }

    return Promise.resolve(request.call(target))
}

// 退出全屏。
export function exitFullScreen() {
    const exit = getFullscreenExit()

    if (!exit) {
        return Promise.reject(new Error('当前浏览器不支持退出全屏'))
    }

    return Promise.resolve(exit.call(document))
}
