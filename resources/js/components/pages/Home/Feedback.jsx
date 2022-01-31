import React from 'react'
import styled from "styled-components";
import { Col, Row, Card } from 'antd';
import { dimensions } from '../../../helper';
import AnimationContainer from '../../common/AnimationContainer';

const Container = styled(Row)`
    //
`;

const Star = styled.div`
    display: inline-block;
    width: 15px;
    height: 15px;
    background: rgb(52,60,94);
    border-radius: 50%;
    margin: 5px;
`;

const ItemContainer = styled.div`
    width: 25%;
    padding: 15px 10px;
    border: 1px solid #dbdbdb;
    display: flex;
    flex-direction: column;

    @media (max-width: ${dimensions.md}) {
        width: 50%;
    }

    &:first-child{
        border-left: none;
    }

    &:last-child{
        border-right: none;
    }

    p{
        font-size: 1.4em;
        color: black;
        flex-grow: 1;
    }

    h3 {
        font-size: 1.3em;
        margin: 0px;
    }

    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .user{
 
    }
    
`;

const Item = ({ stars, comment, user, avatar }) => (
    <ItemContainer>
        <AnimationContainer animation="fadeInUp">
            <div>
                {[...Array(stars)].map((star, index) =>
                    <Star key={index} />
                )}
            </div>
            <p>"{comment}"</p>

            <Row className="user" type="flex" align="middle">
                <img loading="lazy" src={"/feedback/" + avatar + ".webp"} alt="avatar" />
                <h3>{user}</h3>
            </Row>
        </AnimationContainer>
    </ItemContainer>
)

export default function Feedback({ text }) {
    return (
        <Container type="flex" justify="space-between">

            <Item
                stars={5}
                comment={text.feedback[0]}
                user="Mónica Luís"
                avatar="monica"
            />

            <Item
                stars={5}
                comment={text.feedback[1]}
                user="Gonçalo Pinto"
                avatar="goncalo"
            />

            <Item
                stars={5}
                comment={text.feedback[2]}
                user="Maria Nunes"
                avatar="maria"
            />

            <Item
                stars={5}
                comment={text.feedback[3]}
                user="Mécia Andrade"
                avatar="mecia"
            />
        </Container>
    )
}