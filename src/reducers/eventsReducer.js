export default function eventsReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_EVENTS":
                return action.events
            case "ADD_EVENTS":
                return [...state, action.events];
            case "EDIT_EVENTS":
                return state.map(event => {
                    if (event.id === action.event.id) {
                        return action.event
                    } else {
                        return event
                    }
                })
            case "DELETE_EVENT": 
                return state.filter(event => event.id !== action.id)
            case "CLEAR_EVENTS":
                let array = []
                return array
        default:
            return state
    }
}