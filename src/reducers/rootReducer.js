import userReducer from './userReducer'
import ensemblesReducer from './ensemblesReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    ensembles: ensemblesReducer,
})

export default rootReducer