import { Row, Button } from 'antd';
import React from 'react'
import { dimensions } from '../../../helper';
import styled, { keyframes } from "styled-components";
import AnimationContainer from '../../common/AnimationContainer';


const Section = styled.div`
    width: ${props => props.image ? "36%" : "32%"};
    padding: ${props => props.image ? "0px" : "30px"};

    p {
        font-size: 16px;

        @media (max-width: ${dimensions.md}) {
            font-size: 14px;
        }
    }

    

    @media (max-width: ${dimensions.lg}) {
        width: ${props => props.items ? "100%" : "50%"};
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;        
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
    font-size: 16px;
    margin: 20px 0px;
    padding-left: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        padding-left: 0px;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 14px;
    }


    img {
        width: 55px;
        height: 55px;
        object-fit: cover;
        margin-right: 10px;
    }
    

    
`;


const Image = styled.img`

        width: 100%;
        margin: auto;
        display: block;

        @media (max-width: ${dimensions.sm}) {
            width: 90% !important;
        }
    
    

    
`;



function About({ text }) {
    return (
        <Container type="flex" justify="space-between" gutter={16} align="middle">
            <Section id="a" items>
                <Row type="flex" >
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem><img src="/icon/about-list.svg" alt="icon list" />{text.about.item[0]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem><img src="/icon/about-list.svg" alt="icon list" />{text.about.item[1]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem><img src="/icon/about-list.svg" alt="icon list" />{text.about.item[2]}</ListItem>
                    </AnimationContainer>
                    <AnimationContainer animation="fadeInLeft">
                        <ListItem><img src="/icon/about-list.svg" alt="icon list" />{text.about.item[3]}</ListItem>
                    </AnimationContainer>
                </Row>
            </Section>
            <Section image id="b">
                <AnimationContainer animation="fadeIn">
                    <Image decoding='async' loading="lazy" src="/about.webp" alt="about-image" />
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
