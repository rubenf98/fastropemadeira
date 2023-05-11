import { Row } from 'antd'
import React from 'react'
import styled from "styled-components";
import { colors, dimensions, maxWidth } from '../../../helper';
import { team } from "../../../images"
import { Link } from 'react-router-dom';

const MemberList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 70%;

    @media (max-width: ${dimensions.md}){
        width: 100%;
        margin: 30px 0px;
    }

    @media (max-width: ${dimensions.sm}){
        flex-wrap: wrap;
    }
`;
const Title = styled.div`
    width: 30%;

    h3 {
        color: ${colors.main};
        font-family: 'Allura', cursive;
        font-size: clamp(26px, 4vw, 40px);
    }

    h2 {
        font-weight: 900;
        font-size: clamp(30px, 4vw, 50px);
        line-height: 100%;
    }

    p {
        font-size: 20px;
    }

    button {
        box-sizing: border-box;
        cursor: pointer;
        background: ${colors.main};
        padding: 16px 30px;
        font-size: 18px;
        transition: .4s;
        font-weight: bold;
        color: white;
        border: 0px;

        &:hover {
            background: ${colors.mainHover};
        }
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;

const Member = styled.div`
    width: 33%;

    img {
        width: 100%;
        height: 600px;
        object-fit: cover;
    }

    h3 {
        text-align: center;
        font-weight: bold;
        font-size: clamp(20px, 3vw, 24px);
    }

    @media (max-width: ${dimensions.sm}){
        width: 100%;
        
         img {
            height: 300px;
         }
    }

    
`;

const Container = styled.section`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${dimensions.md}){
        margin-top: 50px;
        
    }
`;

const Content = styled.div`
    max-width: ${maxWidth};
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;

    @media (max-width: ${dimensions.md}){
        flex-wrap: wrap;
        margin-top: 50px;
        gap: 0px;
        
    }
`;

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
`;

function Team({ text }) {
    return (
        <Container>
            <Background src="/images/team_background.jpg" />
            <Content>
                <Title>
                    <h3>{text.subtitleSection[2]}</h3>
                    <h2>{text.titleSection[2]}</h2>

                    <p>{text.team}</p>
                    <Link to="/about"><button>View more</button></Link>

                </Title>

                <MemberList type="flex" justify="space-around" align="middle">
                    <Member><img src={team.alves} alt="João Alves" /><h3>João Alves</h3></Member>
                    <Member><img src={team.david} alt="David Rodrigues" /><h3>David Rodrigues</h3></Member>
                    <Member><img src={team.pedro} alt="Pedro Faria" /><h3>Pedro Faria</h3></Member>
                </MemberList>
            </Content>
        </Container>
    )
}

export default Team
