import React from 'react'
import styled from "styled-components";
import AnimationContainer from '../../common/AnimationContainer';
import Carousel from 'react-multi-carousel';
import { colors, maxWidth } from '../../../helper';
import { Rate } from 'antd';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 567 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 567, min: 0 },
        items: 1,
    }
};

const Container = styled.section`
    min-height: ${props => props.hasReviews ? "100vh" : "80vh"};
    width: 100vw;
    position: relative;
    padding: 100px 20px;
`;

const Partner = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: ${maxWidth};
    margin: 100px auto;

    img {
        width: 20%;
        filter: contrast(0);
    }
`;

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
`;

const CarouselContainer = styled(Carousel)`
    width: 100%;
    max-width: ${maxWidth};
    padding: 50px 0px;
    box-sizing: border-box;
    margin: auto;
    background-color: white;
`;

const Card = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    /* box-shadow: 0px 0px 10px 0px rgba(0,0,0,.2); */

    .description {
        opacity: .7;
        font-size: 18px;
        margin-top: 10px;
    }

    .user {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 50px;

        img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 70px;
        }

        .name {
            h3 {
                font-size: 20px;
                margin: 0px;
            }

            p {
                font-size: 18px;
                margin: 0px;
                opacity: .7;
            }
        }
    }

    

`;
const reviews = [
    { teste: 1 },
    { teste: 1 },
    { teste: 1 },
    { teste: 1 },
]
function RevPartner({ hasReviews = true }) {
    return (

        <Container hasReviews={hasReviews}>
            <Background src="/images/review_background.jpg" />
            {hasReviews &&
                <AnimationContainer animation="fadeInUp">
                    <CarouselContainer
                        ssr
                        infinite
                        itemClass="image-item"
                        responsive={responsive}
                    >
                        {reviews.map((review, index) => (
                            <Card key={index}>
                                <Rate allowHalf defaultValue={2.5} />
                                <p className='description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum provident sequi sunt necessitatibus a error velit nihil esse cumque placeat possimus tenetur vero rerum sit, perferendis illo deserunt dolorem pariatur?</p>
                                <div className="user">
                                    <img src="/images/reviews/1.jpg" alt="user" />
                                    <div className='name'>
                                        <h3>name</h3>
                                        <p>2020</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CarouselContainer>
                </AnimationContainer>
            }
            <Partner>
                <img loading="lazy" src="/partner/thisismadeiraisland.webp" alt="thisismadeiraisland" />
                <img loading="lazy" src="/partner/tripadvisor.webp" alt="tripadvisor" />
                <img loading="lazy" src="/partner/rebolo.webp" alt="rebolo gym" />
            </Partner>
        </Container>
    )
}

export default RevPartner
