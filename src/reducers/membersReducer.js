export default function membersReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_MEMBERS":
                return action.members
            case "ADD_MEMBER":
                return [...state, action.member];
            case "EDIT_MEMBER":
                return state.map(member => {
                    if (member.id === action.member.id) {
                        return action.member
                    } else {
                        return member
                    }
                })
            case "DELETE_MEMBER": 
                return state.filter(member => member.id !== action.id)
            case "CLEAR_MEMBERS":
                let array = []
                return array
        default:
            return state
    }
}