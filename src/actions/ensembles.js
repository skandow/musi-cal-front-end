export const loadEnsembles = ensembles => {
    return {
        type: "LOAD_ENSEMBLES",
        ensembles
    }
}

export const clearEnsembles = () => {
    return {
        type: "CLEAR_ENSEMBLES"
    }
}