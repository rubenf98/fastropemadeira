import { Row } from "antd";
import React from "react";
import styled from "styled-components";
import { colors, dimensions, maxWidth } from "../../../helper";
import { team } from "../../../images";
import { Link } from "react-router-dom";

const MemberList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 20px;

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        margin: 30px 0px;
    }

    @media (max-width: ${dimensions.sm}) {
        flex-wrap: wrap;
    }
`;

const Title = styled.div`
    margin-bottom: 50px;
    h2 {
        font-family: "Caveat Brush", serif;
        margin: auto;
        display: block;
        text-align: center;
        font-weight: 900;
        font-size: clamp(30px, 5vw, 70px);
    }

    p {
        width: 40%;
        text-align: center;
        margin: auto;
        font-size: clamp(16px, 2vw, 20px);
    }

    button {
        margin: 20px auto;
        display: block;
        box-sizing: border-box;
        cursor: pointer;
        background: ${colors.main};
        padding: 8px 16px;
        font-size: clamp(16px, 2vw, 20px);
        transition: 0.4s;
        font-weight: bold;
        color: white;
        border: 0px;

        &:hover {
            background: ${colors.mainHover};
        }
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;

        p {
            width: 100%;
        }
    }
`;

const Member = styled.div`
    width: 33%;
    position: relative;

    img {
        width: 100%;
        height: 600px;
        object-fit: cover;
    }

    h3 {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: clamp(20px, 3vw, 30px);
    }

    @media (max-width: ${dimensions.sm}) {
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
    padding: 100px 20px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.md}) {
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

    @media (max-width: ${dimensions.md}) {
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
            <Title>
                <h2>{text.titleSection[2]}</h2>

                <p>{text.team}</p>
                <Link to="/about">
                    <button>View more</button>
                </Link>
            </Title>
            <Content>
                <MemberList type="flex" justify="space-around" align="middle">
                    <Member>
                        <img src={team.alves} alt="João Alves" />
                        <h3>João Alves</h3>
                    </Member>
                    <Member>
                        <img src={team.david} alt="David Rodrigues" />
                        <h3>David Rodrigues</h3>
                    </Member>
                    <Member>
                        <img src={team.pedro} alt="Pedro Faria" />
                        <h3>Pedro Faria</h3>
                    </Member>
                </MemberList>
            </Content>
        </Container>
    );
}

export default Team;
