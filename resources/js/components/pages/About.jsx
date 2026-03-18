import React from "react";
import styled from "styled-components";
import Team from "./About/Team";
import History from "./About/History";
import Services from "./About/Services";
import RevPartner from "./Home/RevPartner";
import { connect } from "react-redux";
import { setFormVisibility } from "../../redux/form/actions";

const Container = styled.div`
    margin-top: -20px;
`;

function About(props) {
    const { text } = require("../../../assets/" + props.language + "/about");
    console.log(text);
    return (
        <Container>
            <History setFormVisibility={props.setFormVisibility} text={text} />
            <Team text={text} />
            <Services text={text} />
            <RevPartner />
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
