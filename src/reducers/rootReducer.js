import userReducer from './userReducer'
import ensemblesReducer from './ensemblesReducer'
import membersReducer from './membersReducer'
import eventsReducer from './eventsReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    user: userReducer,
    ensembles: ensemblesReducer,
    members: membersReducer, 
    events: eventsReducer
})

export default rootReducer