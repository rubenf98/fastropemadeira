import { render } from 'react-dom'
import React from 'react'
import Routes from "./routes";
import reducer from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { Provider } from 'react-redux'
import jwtDecode from "jwt-decode";
import {
    loginSuccess,
    setAuthorizationToken,
    refreshAuthorizationToken
} from "./redux/auth/actions";
import 'antd/dist/antd.css';
import 'react-multi-carousel/lib/styles.css';
import "../assets/animate.css";
import moment from 'moment';

let decodedCookie = decodeURIComponent(document.cookie);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            promise,
        )
    )
)

if (!decodedCookie.includes('language')) {
    document.cookie = "language=en; path=/; expires=" + moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") + " GMT";
    localStorage.setItem("language", "en");
}

if (localStorage.token) {
    const token = jwtDecode(localStorage.token);
    const tokenExp = token.exp < Date.now() / 1000;

    if (tokenExp) {
        store.dispatch(refreshAuthorizationToken(localStorage.token));
    } else {
        store.dispatch(loginSuccess());
        setAuthorizationToken(localStorage.token);
    }
}

else {
    let name = "language=";
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            localStorage.setItem("language", c.substring(name.length, c.length));
        }
    }
}

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('index')
)
