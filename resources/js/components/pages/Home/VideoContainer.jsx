import React from "react";
import styled from "styled-components";
import { colors, dimensions, maxWidth } from "../../../helper";

const Container = styled.section`
    width: 100%;
    margin: auto;
    position: relative;
    display: block;
    padding: 100px 0px 0px 0px;

    video {
        width: 100%;
        height: 80vh;
        object-fit: cover;
        margin: auto;
        display: block;
        margin-top: 40px;
        cursor: pointer;
    }

    @media (max-width: ${dimensions.md}) {
        padding: 50px 0px 0px 0px;
    }
`;

function VideoContainer({ text }) {
    return (
        <Container>
            <video poster="/images/video_thumbnail.jpg" controls>
                <source media="(min-width: 1281px)" srcSet="/header_1920.mp4" />
                <source
                    media="(min-width: 721px) and (max-width: 1280px)"
                    srcSet="/header_1280.mp4"
                />
                <source
                    media="(max-width: 541px) and (max-width: 720px)"
                    srcSet="/header_720.mp4"
                />
                <source media="(max-width: 540px)" srcSet="/header_540.mp4" />
                <source src="/header_1920.mp4" type="video/mp4" />
                Erro
            </video>
        </Container>
    );
}

export default VideoContainer;
