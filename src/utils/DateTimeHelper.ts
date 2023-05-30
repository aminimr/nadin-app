export function getCurrentTimeStatus() {
    let hours = new Date().getHours();

    if (hours < 12) return "Morning"
    else if (hours > 18) return "Evening"
    return "Afternoon"
}