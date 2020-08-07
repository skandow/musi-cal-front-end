export const loadEnsembles = ensembles => {
    return {
        type: "LOAD_ENSEMBLES",
        ensembles
    }
}

export const addEnsemble = ensemble => {
    return {
        type: "ADD_ENSEMBLE", 
        ensemble
    }
}

export const editEnsemble = ensemble => {
    return {
        type: "EDIT_ENSEMBLE",
        ensemble
    }
}

export const deleteEnsemble = id => {
    return {
        type: "DELETE_ENSEMBLE",
        id
    }
}

export const clearEnsembles = () => {
    return {
        type: "CLEAR_ENSEMBLES"
    }
}