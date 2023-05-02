import React from 'react'
import Header from './Home/Header';
import Tours from './Home/Tours';
import VideoContainer from './Home/VideoContainer';
import Team from './Home/Team';
import RevPartner from './Home/RevPartner';

class Homepage extends React.Component {

    render() {
        const { text } = require('../../../assets/' + localStorage.getItem('language') + "/homepage");

        return (
            <div >


                <Header />

                <Tours />

                <VideoContainer />

                <Team />

                <RevPartner />
            </div>
        )
    }
}

export default Homepage
