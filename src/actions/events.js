export const loadEvents = events => {
    return {
        type: "LOAD_EVENTS",
        events
    }
}

export const addEvent = event => {
    return {
        type: "ADD_EVENT", 
        event
    }
}

export const editEvent = event => {
    return {
        type: "EDIT_EVENT",
        event
    }
}

export const deleteEvent = id => {
    return {
        type: "DELETE_EVENT",
        id
    }
}

export const clearEvents = () => {
    return {
        type: "CLEAR_EVENTS"
    }
}