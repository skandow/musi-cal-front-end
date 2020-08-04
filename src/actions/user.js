export const addUser = user => {
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

export const deleteUser = () => {
    return {
        type: "DELETE_USER"
    }
}