export default function userReducer(
    state = null,
    action) {
        switch (action.type) {
            case "LOGIN_USER":
                return action.user;
            case "EDIT_USER":
                return action.user
            case "DELETE_USER":
                return null
        default:
            return state
    }
}