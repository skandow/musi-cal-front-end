export const loadMembers = members => {
    return {
        type: "LOAD_MEMBERS",
        members
    }
}

export const addMember = member => {
    return {
        type: "ADD_MEMBER", 
        member
    }
}

export const editMember = member => {
    return {
        type: "EDIT_MEMBER",
        member
    }
}

export const deleteMember = id => {
    return {
        type: "DELETE_ENSEMBLE",
        id
    }
}

export const clearMembers = () => {
    return {
        type: "CLEAR_MEMBERS"
    }
}