export default function eventsReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_EVENTS":
                return action.events
            case "CLEAR_EVENTS":
                let array = []
                return array
        default:
            return state
    }
}