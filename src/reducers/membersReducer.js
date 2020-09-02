export default function membersReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_MEMBERS":
                return action.members
        default:
            return state
    }
}