export const loadMembers = members => {
    return {
        type: "LOAD_MEMBERS",
        members
    }
}

export const clearMembers = () => {
    return {
        type: "CLEAR_MEMBERS"
    }
}