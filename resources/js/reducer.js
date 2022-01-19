import { combineReducers } from 'redux'

import auth from './redux/auth'
import reservation from './redux/reservation'
import feedback from './redux/feedback'
import contact from './redux/contact'

const reducer = combineReducers({
    auth,
    reservation,
    feedback,
    contact
})

export default reducer