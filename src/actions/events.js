export const loadEvents = events => {
    return {
        type: "LOAD_EVENTS",
        events
    }
}

export const clearEvents = () => {
    return {
        type: "CLEAR_EVENTS"
    }
}

