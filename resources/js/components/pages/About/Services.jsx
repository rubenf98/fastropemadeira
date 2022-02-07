import React from 'react'
import styled from "styled-components";
import Row from "antd/es/row"
import { services } from "../../../images"
import SectionTitle from '../../common/SectionTitle';
import { dimensions } from "../../../helper"
import AnimationContainer from '../../common/AnimationContainer';

const Container = styled.div`
    width: 90%;
    max-width: 1600px;
    margin: 50px auto 100px auto;
    display: block;
`;

const ServiceContainer = styled.div`
    width: 30%;
    z-index: 1;
    background: #fafafa;
    margin: 20px 0px;
    padding: 30px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.lg}) {
        width: 48%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 90%;
    }

    &:hover {
        img {
            box-sizing: border-box;
            transform: scale(1.2);
        }
    }

    img {
        width: 100px;
        margin: auto;
        display: block;
        margin-bottom: 1.5rem;
        transition: .3s ease-in-out;
        box-sizing: border-box;
    }
    h4 {
        font-weight: bold;
        margin-bottom: .5rem;
        font-size: 1.5rem;
        text-align: center;
        box-sizing: border-box;
        margin-top: 0;
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 1rem;
    }
`;

const Service = ({ title, description, image }) => (

    <ServiceContainer>
        <AnimationContainer animation="fadeInUp">
            <img loading="lazy" src={image} alt={title} />

            <h4>{title}</h4>
            <p>{description}</p>
        </AnimationContainer>
    </ServiceContainer>
)

function Services({ text }) {
    return (
        <Container>
            <SectionTitle title={text.services.title} />

            <Row type="flex" justify="space-around">
                <Service
                    title={text.services.items[0].title}
                    image={services.transport}
                    description={text.services.items[0].paragraph}
                />
                <Service
                    title={text.services.items[1].title}
                    image={services.snack}
                    description={text.services.items[1].paragraph}
                />
                <Service
                    title={text.services.items[2].title}
                    image={services.insurance}
                    description={text.services.items[2].paragraph}
                />
                <Service
                    title={text.services.items[3].title}
                    image={services.photo}
                    description={text.services.items[3].paragraph}
                />
                <Service
                    title={text.services.items[4].title}
                    image={services.language}
                    description={text.services.items[4].paragraph}
                />
                <Service
                    title={text.services.items[5].title}
                    image={services.surprise}
                    description={text.services.items[5].paragraph}
                />
            </Row>
        </Container>
    )
}

export default Services
