import React, { useEffect } from "react";
import styled from "styled-components";
import { colors, dimensions } from "../../../helper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setVideoSrc } from "../../../redux/application/actions";
import { fetchExperiences } from "../../../redux/experience/actions";
import { setFormFields, setFormVisibility } from "../../../redux/form/actions";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 40,
    },
    tablet: {
        breakpoint: { max: 1024, min: 567 },
        items: 2,
        partialVisibilityGutter: 30,
    },
    mobile: {
        breakpoint: { max: 567, min: 0 },
        items: 1,
        partialVisibilityGutter: 50,
    },
};

const Container = styled.section`
    width: 100%;
    display: block;
    padding: 100px 50px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.md}) {
        padding: 100px 0px;
    }
`;

const CarouselContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 25%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); */

    .header {
        background-image: ${(props) => "url(" + props.background + ")"};
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;

        h3 {
            color: white;
            font-size: clamp(20px, 4vw, 50px);
            text-transform: capitalize;
            font-family: "Palestine Border", sans-serif;
            margin: 0px;
            line-height: 100%;
        }

        div {
            flex: 1;

            button {
                background-color: white;
                border-radius: 45px;
                width: 45px;
                height: 45px;
                float: right;
                cursor: pointer;
                border: 0px;
                box-shadow: 0px;

                .video-button {
                    width: 20px;
                    margin: auto;
                    display: block;
                }
            }
        }

        .sticker {
            width: 150px;
            margin: auto;
            display: block;
            position: absolute;
            top: -30px;
            left: -50px;
            rotate: 18deg;
        }
    }

    .content {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        padding-bottom: 10px;
        box-sizing: border-box;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .chars {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 1px solid black;
            padding: 20px 0px;
            box-sizing: border-box;

            .side-border {
                border-left: 1px solid black;
                border-right: 1px solid black;
            }

            .char {
                width: 33%;
                gap: 5px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 17px;
                    height: 17px;
                }

                span {
                    color: black;
                    opacity: 0.6;
                    font-size: clamp(16px, 2vw, 18px);
                }
            }
        }

        p {
            text-align: justify;
            color: black;
            opacity: 0.6;
            font-size: clamp(16px, 2vw, 18px);
            padding: 20px;
            box-sizing: border-box;
            width: 100%;
            flex: 1;
        }

        .button-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;

            .price {
                color: black;
                font-size: 28px;

                span {
                    opacity: 0.6;
                    font-size: 16px;
                }
            }

            .buttons {
                display: flex;
                justify-content: center;
                gap: 10px;

                button {
                    cursor: pointer;
                    display: block;
                    background-color: transparent;
                    color: ${colors.main};
                    border: 2px solid ${colors.main};
                    border-radius: 8px;
                    padding: 6px 12px;
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                    font-weight: bold;

                    &:hover {
                        color: ${colors.mainHover};
                        border: 2px solid ${colors.mainHover};
                    }
                }

                .primary {
                    color: white;
                    background-color: ${colors.main};

                    &:hover {
                        color: white;
                        background-color: ${colors.mainHover};
                    }
                }
            }
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 50%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
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

function Tours({
    text,
    setVideoSrc,
    fetchExperiences,
    experiences,
    setFormVisibility,
    setFormFields,
}) {
    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleExperienceClick = (experience) => {
        setFormFields({ experience: experience, skip: 0 });
        setFormVisibility(true);
    };

    return (
        <Container id="activities">
            <Title>{text.titleSection[0]}</Title>
            <CarouselContainer
                ssr
                partialVisible
                itemClass="image-item"
                responsive={responsive}
            >
                {experiences.map((experience, index) => (
                    <Card key={index} background={experience.images[0].image}>
                        <div className="header">
                            {experience.video && (
                                <div>
                                    <button
                                        onClick={() =>
                                            setVideoSrc(experience.video)
                                        }
                                    >
                                        <img
                                            className="video-button"
                                            src="/icon/activities/play.svg"
                                            alt="play button"
                                        />
                                    </button>
                                </div>
                            )}

                            {experience.id == 2 && (
                                <img
                                    className="sticker"
                                    src="/icon/activities/sticker.png"
                                    alt="best seller"
                                />
                            )}

                            <h3>
                                {
                                    experience.name[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </h3>
                        </div>
                        <div className="content">
                            <div className="chars">
                                <div className="char">
                                    <img
                                        src="/icon/activities/time.svg"
                                        alt="play button"
                                    />
                                    <span>
                                        {
                                            experience.duration[
                                                localStorage.getItem("language")
                                            ]
                                        }
                                    </span>
                                </div>
                                <div className="char side-border">
                                    <img
                                        src="/icon/activities/type.svg"
                                        alt="play button"
                                    />
                                    <span>
                                        {
                                            experience.target[
                                                localStorage.getItem("language")
                                            ]
                                        }
                                    </span>
                                </div>
                                <div className="char">
                                    <img
                                        src="/icon/activities/age.svg"
                                        alt="play button"
                                    />
                                    <span>
                                        {experience.age
                                            ? experience.age +
                                              " " +
                                              text.tours.age
                                            : text.tours.ageAll}{" "}
                                    </span>
                                </div>
                            </div>

                            <p>
                                {
                                    experience.description[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </p>

                            <div className="button-container">
                                <div className="price">
                                    {experience.price}€ <span>/p</span>
                                </div>
                                <div className="buttons">
                                    <button
                                        onClick={() =>
                                            handleExperienceClick(experience)
                                        }
                                        className="primary"
                                    >
                                        {text.tours.primaryButton}
                                    </button>
                                    {(experience.activity_id === "1" ||
                                        experience.activity_id === 1) && (
                                        <Link
                                            to={
                                                "/tour/" +
                                                experience.name.en +
                                                "/" +
                                                experience.id
                                            }
                                        >
                                            <button className="secundary">
                                                {text.tours.secundaryButton}
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </CarouselContainer>
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVideoSrc: (data) => dispatch(setVideoSrc(data)),
        fetchExperiences: (data) => dispatch(fetchExperiences(data)),
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
        setFormFields: (data) => dispatch(setFormFields(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.experience.loading,
        experiences: state.experience.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours);
