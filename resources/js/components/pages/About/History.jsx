import React from "react";
import styled from "styled-components";
import Col from "antd/es/col";
import Row from "antd/es/row";
import { colors, dimensions } from "../../../helper";
import AnimationContainer from "../../common/AnimationContainer";

const Container = styled(Row)`
    /* div {
        padding: 20px;
        box-sizing: border-box;
    } */

    .text-container {
        padding: 100px 50px 0px 50px;
        box-sizing: border-box;

        h2 {
            font-size: clamp(30px, 5vw, 50px);
            line-height: 100%;
            font-weight: bold;
            font-family: "Caveat Brush", serif;

            @media (max-width: ${dimensions.lg}) {
                text-align: center;
            }
        }

        h3 {
            font-family: "Caveat Brush", serif;
            font-size: clamp(24px, 4vw, 36px);
            font-weight: bold;
        }

        p {
            font-size: 16px;
            width: 100%;
        }

        ul {
            padding: 0px;
        }

        li {
            font-size: 16px;
            list-style: none;
        }

        @media (max-width: ${dimensions.md}) {
            padding: 20px 20px 0px 20px;
        }
    }
`;

const Title = styled.h2`
    font-family: "Caveat Brush", serif;
    margin: auto;
    display: block;
    text-align: center;
    font-weight: 900;
    font-size: clamp(30px, 5vw, 70px);
`;

const CanyoningContainer = styled.div`
    p {
        font-size: 16px;
        width: 80%;
        margin: 10px auto;
        display: block;
        text-align: center;
    }

    button {
        margin: 30px auto;
        display: block;
        color: white;
        box-sizing: border-box;
        cursor: pointer;
        background: ${colors.main};
        border: 0px;
        padding: 16px 18px;
        font-size: 16px;
        transition: 0.4s;
        font-weight: bold;
        border-radius: 16px;
        text-transform: uppercase;

        &:hover {
            background: ${colors.mainHover};
        }
    }

    @media (max-width: ${dimensions.md}) {
        padding: 20px;
        box-sizing: border-box;

        p {
            text-align: left;
            width: 100%;
        }

        button {
            margin: 30px 0px;
        }
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    height: calc(100vh + 20px);

    object-fit: cover;

    border-bottom-right-radius: 70px;

    @media (max-width: ${dimensions.md}) {
        height: 70vh;
        border-radius: 0px;
    }
`;

function History(props) {
    const { text } = props;
    return (
        <Container type="flex" justify="space-around" align="middle">
            <Col md={24} lg={12}>
                <Image src="/about/history.jpg" alt="history" />
            </Col>
            <Col md={24} lg={12}>
                <AnimationContainer animation="fadeIn">
                    <div className="text-container">
                        <h2>
                            {text.historytitle} - {text.historysubtitle}
                        </h2>
                        <p>
                            {text.historyParagraph.map((paragraph, index) => (
                                <div key={index}>{paragraph}</div>
                            ))}
                        </p>

                        <h3>{text.choicesubtitle}</h3>
                        <ul>
                            {text.choiceitems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </AnimationContainer>
            </Col>
            <Col span={24}>
                <CanyoningContainer>
                    <Title>{text.canyoningsubtitle}</Title>

                    {text.canyoningParagraph.map((paragraph, index) => (
                        <div key={index}>{paragraph}</div>
                    ))}

                    <button onClick={() => props.setFormVisibility(true)}>
                        {text.canyoningButton}
                    </button>
                </CanyoningContainer>
            </Col>
        </Container>
    );
}

export default History;
