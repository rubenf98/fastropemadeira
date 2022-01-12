import React from 'react'
import styled from "styled-components";

const Title = styled.h2`
    text-align: center;
    margin: 80px auto 50px auto;
    font-size: 4em;
    font-weight: bold;
`;

const Underline = styled.div`
    width: 50%;
    max-width: 600px;
    height: 1px;
    margin: 10px auto 60px auto;
    display: block;
    position: relative;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 15%;
        right: 15%;
        width: 70%;
        height: 2px;
        background-image: linear-gradient(to right, transparent, #8f8f8f, transparent);
    }
`;

const SectionTitle = ({ title }) => {
    return (
        <Title>
            {title}
            <Underline />
        </Title>
    )
}

export default SectionTitle
