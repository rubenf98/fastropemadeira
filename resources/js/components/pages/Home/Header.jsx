import React from 'react'
import styled from "styled-components";
import { dimensions } from '../../../helper';
import { connect } from 'react-redux';
import { setVideoSrc } from "../../../redux/application/actions";

const Container = styled.div`
    position: relative;
    min-height: 100vh;
    width: 100vw;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    box-sizing: border-box;

`;

const BackgroundImage = styled.div`
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${props => props.prio};


    img {
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        font-size: clamp(50px, 15vw, 200px);
        z-index: 2;
        color: white;
        display: block;
        line-height: 100%;
        margin: 0px auto;
        font-family: "Neutrons Demo";
    }

    button {
        font-size: 18px;
        font-weight: bold;
        color: white;
        margin: 0px auto;
        display: block;
        border: 3px solid white;
        background-color: transparent;
        padding: 25px 50px;
        box-sizing: border-box;
        z-index: 4;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            background-color: white;
            color: #345672;
        }
    }

    @media (max-width: ${dimensions.md}) {
        button {
            padding: 16px 30px;
            margin-top: 20px;
            border: 2px solid white;
        }
    }
`;

const Cloud = styled.img`
    position: absolute; 
    left: 0; 
    bottom: 0;
    width: 100%;
    height: auto;
    min-height: 150px;
    z-index: 3;
    object-fit: cover;    
`;

function Header(props) {
    return (
        <Container>
            <BackgroundImage prio={3}>
                <img src="/images/header.png" alt="madeira island wallpaper" loading="eager" />
            </BackgroundImage>
            <TitleContainer>
                <h1>Fast Rope</h1>
                <button onClick={() => props.setVideoSrc("https://www.youtube.com/embed/LpKfx60n5ds")}>
                    {props.text}
                </button>
            </TitleContainer>
            <BackgroundImage prio={-1}>
                <img src="/images/header.jpg" alt="madeira island wallpaper" loading="eager" />
            </BackgroundImage>
            <Cloud src="/images/cloud.png" alt="cloud transition" loading="eager" />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVideoSrc: (data) => dispatch(setVideoSrc(data)),
    };
};

export default connect(null, mapDispatchToProps)(Header);