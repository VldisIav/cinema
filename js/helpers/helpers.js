


export function getRatingClass(rating) {
    if (rating >= 8) return 'high'
    if (rating >= 5) return 'medium'
    return 'low'
}

export function durationToMinutes(durationString) {
    if (!durationString) return "Неизвестно"
    const parts = String(durationString).split(':')
    if (parts.length !== 2) return durationString
    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    if (isNaN(hours) || isNaN(minutes)) return durationString
    return (hours * 60 + minutes) + " минут"
}

