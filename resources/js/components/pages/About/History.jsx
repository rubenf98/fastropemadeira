import React from 'react'
import styled from "styled-components";
import Col from "antd/es/col"
import Row from "antd/es/row"
import { texture } from "../../../images"
import { dimensions } from "../../../helper"
import AnimationContainer from '../../common/AnimationContainer';


const Container = styled(Row)`

    h2 {
        font-size: 3em;
        font-weight: bold;

        @media (max-width: ${dimensions.lg}) {
            text-align: center;
        }
    }

    p {
        font-size: 1.4em;
        width: 70%;

        @media (max-width: ${dimensions.lg}) {
            text-align: center;
            width: 90%;
            margin: auto;
        }
    }
`;
const ColWithBackground = styled(Col)`
    padding-top: 60px;
    padding-bottom: 60px;
    position: relative;
`;


const Background = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0px;
    background: ${() => "url(" + texture + ")"};
    height: 100%;
    width: 60%;
    z-index: -1;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    @media (max-width: ${dimensions.lg}) {
        width: 50%;
        margin: 0 0 auto 0;
    }
`;

const Image = styled.img`
    width: 70%;
    height: auto;
    display: block;
    margin-left: auto;
    border-radius: 6px;
    box-shadow: 0 0px 45px 0 rgba(0,0,0,.3);

    @media (min-width: ${dimensions.md}) {
        width: 80%;
        margin: auto;
    }

    @media (max-width: ${dimensions.lg}) {
        width: 80%;
        margin: auto;
    }
`;

function History({ text }) {
    return (
        <Container type="flex" justify="space-around" align="middle">
            <ColWithBackground md={24} lg={12}>
                <Background />
                <Image src="/about/history.webp" alt="history" />
            </ColWithBackground>
            <Col md={24} lg={12}>
                <AnimationContainer animation="fadeIn">
                    <h2>{text.history}</h2>
                    <p>{text.historyParagraph}</p>
                </AnimationContainer>
            </Col>
        </Container>
    )
}

export default History
