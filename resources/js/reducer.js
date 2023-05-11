import { combineReducers } from 'redux'

import auth from './redux/auth'
import reservation from './redux/reservation'
import feedback from './redux/feedback'
import contact from './redux/contact'
import experience from './redux/experience'
import activity from './redux/activity'
import date from './redux/date'
import review from './redux/review'
import form from './redux/form'
import application from './redux/application'

const reducer = combineReducers({
    auth,
    reservation,
    feedback,
    contact,
    activity,
    date,
    experience,
    review,
    form,
    application
})

export default reducer