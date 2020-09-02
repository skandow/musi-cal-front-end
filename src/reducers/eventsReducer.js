export default function eventsReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_EVENTS":
                return action.events
        default:
            return state
    }
}