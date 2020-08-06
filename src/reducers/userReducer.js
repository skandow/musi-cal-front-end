export default function userReducer(
    state = null,
    action) {
        switch (action.type) {
            case "LOGIN_USER":
                console.log(action.user)
                return action.user;
            case "EDIT_USER":
                return action.user
            case "LOGOUT_USER":
                return null
        default:
            return state
    }
}