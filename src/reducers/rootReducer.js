import userReducer from './userReducer'
import ensemblesReducer from './ensemblesReducer'
import membersReducer from './membersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    ensembles: ensemblesReducer,
    members: membersReducer
})

export default rootReducer