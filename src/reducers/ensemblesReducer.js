export default function ensemblesReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_ENSEMBLES":
                return action.ensembles
            case "CLEAR_ENSEMBLES":
                let array = []
                return array
        default:
            return state
    }
}