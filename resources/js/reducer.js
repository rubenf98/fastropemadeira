import { combineReducers } from 'redux'

import auth from './redux/auth'
import reservation from './redux/reservation'

const reducer = combineReducers({
    auth,
    reservation
})

export default reducer