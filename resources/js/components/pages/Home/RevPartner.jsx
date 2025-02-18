import React, { useEffect } from "react";
import styled from "styled-components";
import AnimationContainer from "../../common/AnimationContainer";
import Carousel from "react-multi-carousel";
import { colors, dimensions, maxWidth } from "../../../helper";
import { Rate } from "antd";
import { fetchReviews } from "../../../redux/review/actions";
import { connect } from "react-redux";

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
    },
};

const Container = styled.section`
    min-height: ${(props) => (props.hasReviews ? "100vh" : "80vh")};
    width: 100vw;
    position: relative;
    padding: 100px 20px;

    .style1 {
        width: 50%;

        img {
            width: 70%;
            height: 400px;
        }

        .comment {
            left: calc(70% - 50px);
            top: 70px;
            width: 70%;
        }
    }

    .style2 {
        width: 50%;

        img {
            width: 40%;
            height: 600px;
            float: right;
            padding-right: 50px;
            box-sizing: border-box;
        }

        .comment {
            left: 0;
            bottom: 0px;
            width: calc(70% + 70px);
        }
    }

    .style3 {
        width: 50%;
        margin-top: -100px;

        img {
            width: 40%;
            height: 500px;
            padding-left: 50px;
            box-sizing: border-box;
        }

        .comment {
            left: calc(40% - 20px);
            top: 200px;
            width: calc(60% + 50px);
        }
    }

    .style4 {
        width: 50%;

        img {
            margin-top: 100px;
            width: 70%;
            height: 400px;
            float: right;
            padding: 0px;
        }

        .comment {
            left: -50px;
            bottom: 20px;
            width: calc(50% + 50px);
        }
    }

    @media (max-width: ${dimensions.lg}) {
        .style1,
        .style2,
        .style3,
        .style4 {
            width: 100%;
            margin: 0px;

            img {
                width: 100%;
                height: 300px;
                float: none;
                padding: 0px;
                margin: 0px;
            }

            .comment {
                position: relative;
                left: 0px;
                top: 0px;
                width: 100%;
                padding: 20px;
                box-sizing: border-box;

                .name {
                    float: none;
                }
            }
        }
    }
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

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Card = styled.div`
    padding: 20px;
    box-sizing: border-box;
    position: relative;

    img {
        object-fit: cover;
    }

    .comment {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        position: absolute;
        background-color: white;
        padding: 20px;
        box-sizing: border-box;

        p {
            font-size: 16px;
            margin: 0px;
            opacity: 0.7;
        }

        .name {
            margin-top: 10px;
            font-weight: bold;
            float: right;
        }
    }
`;

const Title = styled.h2`
    font-family: "Caveat Brush", serif;
    margin: auto;
    display: block;
    text-align: center;
    font-weight: 900;
    font-size: clamp(30px, 5vw, 70px);
`;

function RevPartner({ reviews, fetchReviews, hasReviews = true }) {
    const { text } = require("../../../../assets/" +
        localStorage.getItem("language") +
        "/homepage");

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <Container hasReviews={hasReviews}>
            <Title>{text.titleSection[3]}</Title>
            <Background src="/images/review_background.jpg" />
            {hasReviews && (
                <AnimationContainer animation="fadeInUp">
                    <Content>
                        {reviews.map((review, index) => (
                            <Card
                                className={"style" + review.year}
                                key={review.id}
                            >
                                <img src={review.image} alt="user" />
                                <div className="comment">
                                    <p>{review.comment}</p>
                                    <p className="name">{review.name}</p>
                                </div>
                            </Card>
                        ))}
                    </Content>
                </AnimationContainer>
            )}
            <Partner>
                <img
                    loading="lazy"
                    src="/partner/thisismadeiraisland.webp"
                    alt="thisismadeiraisland"
                />
                <img
                    loading="lazy"
                    src="/partner/tripadvisor.webp"
                    alt="tripadvisor"
                />
                <img
                    loading="lazy"
                    src="/partner/rebolo.webp"
                    alt="rebolo gym"
                />
            </Partner>
        </Container>
    );
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
