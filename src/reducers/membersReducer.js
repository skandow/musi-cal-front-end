export default function membersReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_MEMBERS":
                return action.members
            case "CLEAR_MEMBERS":
                let array = []
                return array
        default:
            return state
    }
}