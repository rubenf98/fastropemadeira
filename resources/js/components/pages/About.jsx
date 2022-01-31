import React from 'react'
import styled from "styled-components";
import Team from './About/Team';
import History from './About/History';
import Services from './About/Services';

const Container = styled.div`
    margin-top: 120px;
`;

function About() {
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/about");

    return (
        <Container>
            <History text={text} />
            <Team text={text} />
            <Services text={text} />
        </Container>
    )
}

export default About
