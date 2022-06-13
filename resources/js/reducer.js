import { combineReducers } from 'redux'

import auth from './redux/auth'
import reservation from './redux/reservation'
import feedback from './redux/feedback'
import contact from './redux/contact'
import activity from './redux/activity'
import date from './redux/date'

const reducer = combineReducers({
    auth,
    reservation,
    feedback,
    contact,
    activity,
    date
})

export default reducer