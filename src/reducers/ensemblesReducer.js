export default function ensemblesReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_ENSEMBLES":
                return action.ensembles
            case "ADD_ENSEMBLE":
                console.log(action.ensemble)
                return [...state, action.ensemble];
            case "EDIT_ENSEMBLE":
                return state.map(ensemble => {
                    if (ensemble.id === action.ensemble.id) {
                        return action.ensemble
                    } else {
                        return ensemble
                    }
                })
            case "DELETE_ENSEMBLE": 
                return state.filter(ensemble => ensemble.id !== action.id)
            case "CLEAR_ENSEMBLES":
                let array = []
                return array
        default:
            return state
    }
}