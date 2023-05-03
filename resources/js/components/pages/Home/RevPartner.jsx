import React, { useEffect } from 'react'
import styled from "styled-components";
import AnimationContainer from '../../common/AnimationContainer';
import Carousel from 'react-multi-carousel';
import { colors, maxWidth } from '../../../helper';
import { Rate } from 'antd';
import { fetchReviews } from '../../../redux/review/actions';
import { connect } from 'react-redux';

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
    height: 100%;
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

function RevPartner({ reviews, fetchReviews, hasReviews = true }) {

    useEffect(() => {
        fetchReviews();

    }, [])

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
                        {reviews.map((review) => (
                            <Card key={review.id}>
                                <Rate allowHalf defaultValue={review.rating} />
                                <p className='description'>{review.comment}</p>
                                <div className="user">
                                    <img src={review.image} alt="user" />
                                    <div className='name'>
                                        <h3>{review.name}</h3>
                                        <p>{review.year}</p>
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
const mapDispatchToProps = (dispatch) => {
    return {
        fetchReviews: (page, filters) => dispatch(fetchReviews(page, filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.review.loading,
        reviews: state.review.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevPartner);
