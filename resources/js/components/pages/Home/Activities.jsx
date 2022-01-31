import { Col, Row } from 'antd';
import React from 'react'
import styled from "styled-components";
import Carousel from 'react-multi-carousel';
import { getCarouselBreakpoints, maxWidth, dimensions } from "../../../helper";

const Container = styled.div`
    width: 100%;
    margin: auto;

    h3 {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.2em;
    }
`;

const Section = styled.div`
    max-width: ${maxWidth};
    margin: 100px auto;
    display: block;
`;

const Activity = styled(Row)`
    border-radius: 3px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    margin-bottom: 50px;

    .image {
        background: ${props => "url(" + props.background + ")"};
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
        display: block;
        margin: auto;    
        min-height: 300px;
    }

    h1, p {
        color: white;
    }

    h1{
        font-weight: bold;
        font-size: 3em;
    }

    p{
        font-size: 1.2em;
    }
        
    .price {    
        text-align: right;
        color: whitesmoke;

        span{
            color: white;
            font-weight: bold;
        }
    }

    
    
`;

const Texture = styled(Col)`
    background: url("/vintage-wallpaper.png");
`;

const ActivityBackground = styled.div`
    padding: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    @media (max-width: ${dimensions.md}) {
            p:nth-child(4) {
                display: none;
            }
    }
`;

const CarouselContainer = styled(Carousel)`
    max-height: 600px;
    margin: 50px 0px;

    .image-item {
        padding: 20px 0 20px 20px;

        @media (max-width: ${dimensions.md}) {
            padding: 0 0 3px 3px;
        }
    }

    .react-multiple-carousel__arrow {
        z-index: 8 !important;
    }

    img {
        width: 100%;
        height: auto;
    }
`;

const hiking = [
    "/hiking/1.webp",
    "/hiking/2.webp",
    "/hiking/3.webp",
    "/hiking/4.webp",
    "/hiking/5.webp",
    "/hiking/6.webp",
    "/hiking/7.webp",
    "/hiking/8.webp",
    "/hiking/9.webp",
];

const canyoning = [
    "/canyoning/1.webp",
    "/canyoning/2.webp",
    "/canyoning/3.webp",
    "/canyoning/4.webp",
    "/canyoning/5.webp",
    "/canyoning/6.webp",
    "/canyoning/7.webp",
    "/canyoning/8.webp",
    "/canyoning/9.webp",
    "/canyoning/10.webp",
    "/canyoning/11.webp",
    "/canyoning/12.webp"
];

function Activities({ text }) {
    return (
        <Container>
            <Section>
                <Activity type="flex" justify="space-around" background="/hiking.webp">
                    <Col xs={24} md={12}>
                        <div className="image" />
                    </Col>
                    <Texture xs={24} md={12}>
                        <ActivityBackground >
                            <div>
                                <h1>{text.activities.title[0]}</h1>
                                <p>{text.activities.hikingParagraph[0]}</p>
                                <p>{text.activities.hikingParagraph[1]}</p>
                                <p>{text.activities.hikingParagraph[2]}</p>
                                <p className="price">{text.activities.price} <span>40€</span></p>
                            </div>
                        </ActivityBackground>
                    </Texture>
                </Activity>
            </Section>

            <CarouselContainer autoPlay itemClass="image-item" centerMode infinite swipeable responsive={getCarouselBreakpoints([1, 1, 2, 2, 3])}>
                {hiking.map((image, index) => {
                    return (
                        <img loading="lazy" key={index} src={image} alt="" />
                    );
                })}
            </CarouselContainer>

            <Section>
                <Activity type="flex" justify="space-around" background="/canyoning.webp">
                    <Texture xs={{ span: 24, order: 2 }} md={12}>
                        <ActivityBackground >
                            <div>
                                <h1>{text.activities.title[1]}</h1>
                                <p>{text.activities.canyoningParagraph[0]}</p>
                                <p>{text.activities.canyoningParagraph[1]}</p>
                                <p>{text.activities.canyoningParagraph[2]}</p>
                                <p className="price">{text.activities.price} <span>60€</span></p>
                            </div>
                        </ActivityBackground>
                    </Texture>
                    <Col xs={{ span: 24, order: 1 }} md={12}>
                        <div className="image" />
                    </Col>
                </Activity>
            </Section>

            <CarouselContainer autoPlay itemClass="image-item" centerMode infinite swipeable responsive={getCarouselBreakpoints([1, 1, 2, 2, 3])}>
                {canyoning.map((image, index) => {
                    return (
                        <img loading="lazy" key={index} src={image} alt="" />
                    );
                })}
            </CarouselContainer>
        </Container>
    )
}

export default Activities
