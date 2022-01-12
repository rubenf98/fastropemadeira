import { Row } from 'antd'
import React from 'react'
import styled from "styled-components";
import { dimensions } from '../../../helper';
import { team } from "../../../images"

const MemberList = styled(Row)`
   height: 500px;

   @media (max-width: ${dimensions.md}) {
        height: 380px;
    }

   img {
        height: 360px;

        &:nth-child(1) {
            margin-top: auto
        }

        &:nth-child(3) {
            margin-bottom: auto
        }
   }
`;

const Member = styled.div`
    height: 400px;
    max-width: 333px;
    width: 33%;
    background: ${props => "url(" + props.background + ")"};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &:nth-child(1) {
        margin-top: auto
    }

    &:nth-child(3) {
        margin-bottom: auto
    }

    @media (max-width: ${dimensions.md}) {
        height: 260px;
    }
`;

const Container = styled.div`
    position: relative;
    max-width: 1000px;
    margin: auto;
    display: block;
`;


function Team() {
    return (
        <Container>
            <MemberList type="flex" justify="space-around" align="middle">
                <Member background={team.alves} />
                <Member background={team.david} />
                <Member background={team.pedro} />
            </MemberList>
        </Container>
    )
}

export default Team
