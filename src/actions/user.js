export const loginUser = user => {
    return {
        type: "LOGIN_USER", 
        user
    }
}

export const editUser = user => {
    return {
        type: "EDIT_USER",
        user
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}