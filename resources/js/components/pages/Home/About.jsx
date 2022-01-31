import { Row, Button } from 'antd';
import React from 'react'
import { dimensions } from '../../../helper';
import styled, { keyframes } from "styled-components";
import AnimationContainer from '../../common/AnimationContainer';


const Section = styled.div`
    width: ${props => props.image ? "36%" : "32%"};
    padding: ${props => props.image ? "0px" : "30px"};

    p {
        font-size: 1.6em;

        @media (max-width: ${dimensions.md}) {
            font-size: 1.1em;
        }
    }

    img {
        width: 100%;
        margin: auto;
        display: block;

        @media (max-width: ${dimensions.sm}) {
            width: 90% !important;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: ${props => props.items ? "100%" : "50%"};
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;

        img {
            width: 60%;
        }
    }

    
`;


const Container = styled(Row)`
    width: 100%;
    margin: auto;

    h1 {
        font-size: 3.6em;
        font-weight: bold;
        margin-bottom: 20px;
        line-height: 50px;
        @media (max-width: ${dimensions.md}) {
                text-align:center;
        }
        
    }

    #a {
        order:1;
    }
    #b {
        order:2;
    }
    #c {
        order:3;

        @media (max-width: ${dimensions.md}) {
            text-align: center;
            font-size: 1.2em;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        #a {
            order:3;
        }
        #b {
            order:1;
        }
        #c {
            order:2;
        }
    }
`;

const ListItem = styled.div`
    font-size: 1.6em;
    background-image: url("/icon/about-list.svg");
    background-size: 50px 50px;
    margin: 20px 0px;
    background-repeat: no-repeat;
    background-position-y: 50%;
    padding-left: 60px;

    @media (max-width: ${dimensions.lg}) {
        width: 50%;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 1.2em;
        width: 100%;
    }
`;



function About({ text }) {
    return (
        <Container type="flex" justify="space-between" gutter={16} align="middle">
            <Section id="a" items>
                <Row type="flex" >
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem>{text.about.item[0]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem>{text.about.item[1]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem>{text.about.item[2]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem>{text.about.item[3]}</ListItem>
                    </AnimationContainer>
                </Row>
            </Section>
            <Section image id="b">
                <AnimationContainer animation="fadeIn">
                    <img decoding='async' loading="lazy" src="/about.webp" alt="about-image" />
                </AnimationContainer>
            </Section>

            <Section id="c">
                <AnimationContainer animation="fadeIn">
                    <h1>{text.about.title}</h1>
                    <p>{text.about.paragraph}</p>
                </AnimationContainer>
            </Section>
        </Container>
    )
}

export default About
