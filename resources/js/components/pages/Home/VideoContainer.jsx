import React from 'react'
import styled from "styled-components";
import { colors, dimensions, maxWidth } from '../../../helper';

const Container = styled.section`
    width: 100%;
    margin: auto;
    position: relative;
    display: block;
    padding: 100px 0px 0px 0px;

    video {
        width: 100%;
        max-width: ${maxWidth};
        height: 70%;
        object-fit: cover;
        margin: auto;
        display: block;
        margin-top: 40px;
        cursor: pointer;
    }

    @media (max-width: ${dimensions.md}){
        padding: 50px 0px 0px 0px;
    }
`;

const Background = styled.img`
    width: 100%;
    height: 60%;
    object-fit: cover;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;

    @media (max-width: ${dimensions.sm}){
        display: none;
    }
`;

const Title = styled.div`
    width: 100%;

    h3, h2 {
        color: white;
        margin: auto;display: block;
        text-align: center;
    }

    h3 {
        
        font-family: 'Allura', cursive;
        font-size: clamp(26px, 4vw, 40px);
    }

    h2 {
        font-weight: 900;
        font-size: clamp(30px, 4vw, 50px);
    }

    @media (max-width: ${dimensions.sm}){
        h3 {
            color: ${colors.main};
        }
        h2 { 
            color: black;
        }
    }
`;

function VideoContainer({ text }) {
    return (
        <Container>
            <Background src="/images/video_background.jpg" />
            <Title>
                <h2>{text.titleSection[1]}</h2>
                <h3>{text.subtitleSection[1]}</h3>


            </Title>

            <video controls>
                <source media="(min-width: 1281px)" srcSet="/header_1920.mp4" />
                <source media="(min-width: 721px) and (max-width: 1280px)" srcSet="/header_1280.mp4" />
                <source media="(max-width: 541px) and (max-width: 720px)" srcSet="/header_720.mp4" />
                <source media="(max-width: 540px)" srcSet="/header_540.mp4" />
                <source src="/header_1920.mp4" type="video/mp4" />

                Erro
            </video>
        </Container>
    )
}

export default VideoContainer
