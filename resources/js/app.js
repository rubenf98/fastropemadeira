import { render } from 'react-dom'
import React from 'react'
import Routes from "./routes";
import 'antd/dist/antd.css';
import 'react-multi-carousel/lib/styles.css';

import moment from 'moment';

let decodedCookie = decodeURIComponent(document.cookie);



if (!decodedCookie.includes('language')) {
    document.cookie = "language=en; path=/; expires=" + moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") + " GMT";
    localStorage.setItem("language", "en");
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
    <Routes />,
    document.getElementById('index')
)
