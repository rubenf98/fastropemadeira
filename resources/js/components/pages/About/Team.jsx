import React from 'react'
import styled from "styled-components";
import Row from "antd/es/row"
import { team } from "../../../images";
import { dimensions } from "../../../helper"
import AnimationContainer from '../../common/AnimationContainer';

const Container = styled.div`
    margin: 50px 0px 0px 0px;
    width: 90%;
    max-width: 1600px;
    margin: auto;
    display: block;

    h3 {
        margin: 80px auto 50px auto;
        font-size: 2.6em;
        width: 60%;
        text-align: center;

        @media (max-width: ${dimensions.lg}) {
            width: 70%;
        }

    @media (max-width: ${dimensions.md}) {
            width: 90%;
        }

    @media (max-width: ${dimensions.sm}) {
            font-size: 2em;
            width: 100%;
        }

    }

   
    

        
`;

const Member = styled.div`
    width: 25%;
    border-radius: 6px;
    box-shadow: 0px -6px 20px 4px rgba(0,0,0,0.1);
    position: relative;

    @media (max-width: ${dimensions.lg}) {
        width: 32%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 90%;
        margin: 40px auto;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 100%;
        margin: 20px auto;
    }

`;

const Picture = styled.div`
    height: 350px;
    width: 100%;
    background: ${props => "url(" + props.image + ")"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
`;

const Information = styled.div`
    padding: 10px;
    position: absolute;
    bottom: -50px;
    right: 0px; left: 0px; margin: 0px auto;
    width: 60%;
    background: white;
    min-height: 120px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    font-weight: bold;
    font-size: 1.8em;
    text-align: center;
  
`;
const Card = ({ name, image }) => (
    <Member>
        <Picture image={image} />
        <Information>
            {name}
        </Information >
    </Member>
)

function Team({ text }) {
    return (
        <Container>

            <AnimationContainer animation="fadeInLeft">
                <h3>{text.team.title}</h3>
            </AnimationContainer>


            <Row type="flex" justify="space-around" >
                <Card name="João Alves" image={team.alves} />
                <Card name="Pedro Faria" image={team.pedro} />
                <Card name="David Rodrigues" image={team.davidAbout} />
            </Row>
        </Container>
    )
}

export default Team
