import costs from './res/costs.json'

export function getLastYearCost() {
    return costs.reduce((prev, current) => prev.year > current.year ? prev : current)
}

export function vhToKvh(vh) {
    return vh * 0.001
}


export function vibrate(ms) {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
        // vibration API supported
        navigator.vibrate(ms);
    }
}