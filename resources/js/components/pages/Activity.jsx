import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarContainer from "./Activity/CalendarContainer";
import { dimensions, maxWidth } from "../../helper";
import RevPartner from "./Home/RevPartner";
import { setFormFields, setFormVisibility } from "../../redux/form/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchExperience } from "../../redux/experience/actions";
import { fetchBlockedDatesSelector } from "../../redux/date/actions";

import { Spin } from "antd";

const Container = styled.section`
    position: relative;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 600px;
    width: 100vw;
    z-index: -1;
    background: ${(props) => "url(" + props.background + ")"};
    background-position: left center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const Form = styled.div`
    width: 30%;
    margin-top: 250px;
    position: sticky;
    top: 150px;
    left: 0;

    @media (max-width: ${dimensions.lg}) {
        order: 2;
        position: relative;
        top: 0px;
        width: 100%;
        margin: 30px auto;
        padding: 0px 20px;
        box-sizing: border-box;
        position: relative;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }
`;

const Information = styled.div`
    width: 60%;

    p,
    li {
        font-size: 18px;
        opacity: 0.8;
    }

    h3 {
        font-family: "Caveat Brush", serif;
        font-weight: 900;
        font-size: clamp(20px, 3vw, 40px);
    }

    .title {
        padding-top: 100px;
        box-sizing: border-box;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        h1 {
            box-sizing: border-box;
            font-family: "Palestine Border";
            color: white;
            line-height: 80%;
            font-size: clamp(60px, 8vw, 110px);
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 90%;
        margin: auto;
        padding: 0px 20px;
        box-sizing: border-box;
        order: 3;

        .title {
            display: none;
        }
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    max-width: ${maxWidth};
    margin: auto;
    padding: 30px 0px 100px 0px;

    @media (max-width: ${dimensions.lg}) {
        flex-wrap: wrap;
    }
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;
    margin: 50px 0px;

    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    h3 {
        font-size: 20px;
    }
`;

const Title = styled.div`
    padding: 200px 20px 0px 20px;
    box-sizing: border-box;
    display: none;
    align-items: center;
    justify-content: flex-start;
    order: 1;

    h1 {
        box-sizing: border-box;
        font-family: "Palestine Border";
        color: white;
        line-height: 80%;
        font-size: clamp(70px, 8vw, 110px);
    }

    @media (max-width: ${dimensions.lg}) {
        display: flex;
    }
`;

function Activity(props) {
    const [activity, setActivity] = useState("beginner");
    const { text } = require("../../../assets/" +
        localStorage.getItem("language") +
        "/tour");
    const { experience, blockedDates } = props;

    const handlePeopleChange = (participants) => {
        props.fetchBlockedDatesSelector({
            experience: props.match.params.experience,
            participants: participants,
        });
    };

    useEffect(() => {
        props.fetchExperience(props.match.params.experience);
        setActivity(props.match.params.activity);
    }, []);

    const handleSelect = (fields) => {
        props.setFormFields({ ...fields, experience: experience, skip: 1 });
        props.setFormVisibility(true);
    };

    return (
        <Container>
            <Background
                background={
                    experience.id
                        ? "/images/activities/default_" +
                          experience.name.en +
                          ".jpg"
                        : "/images/activities/default_beginner.jpg"
                }
            />

            {experience.id && (
                <Title>
                    <h1>
                        Canyoning <br />
                        {experience.name[localStorage.getItem("language")]}
                    </h1>
                </Title>
            )}

            {/* <Background autoPlaySpeed={3000} autoPlay arrows={false} infinite partialVisible={false} responsive={responsive}>
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/1.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/2.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/3.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/4.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/5.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/6.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
                <img src={experience.id ? "/images/activities/" + experience.name.en + "/7.jpg" : "/images/activities/default_beginner.jpg"} alt="" />
            </Background> */}
            {!experience.id ? (
                <Spin />
            ) : (
                <Content>
                    <Information>
                        <div className="title">
                            <h1>
                                Canyoning <br />
                                {
                                    experience.name[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </h1>
                        </div>

                        <h3>{text.titles[0]}</h3>
                        <Details>
                            <div>
                                <img
                                    src="/icon/activities/activity_type.svg"
                                    alt="shoe"
                                />
                                {
                                    experience.duration[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </div>
                            <div>
                                <img
                                    src="/icon/activities/activity_time.svg"
                                    alt="shoe"
                                />
                                {
                                    experience.height[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </div>
                            <div>
                                <img
                                    src="/icon/activities/activity_height.svg"
                                    alt="shoe"
                                />
                                {
                                    experience.target[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </div>
                            <div>
                                <img
                                    src="/icon/activities/activity_age.svg"
                                    alt="shoe"
                                />
                                {text[activity].age}
                            </div>
                        </Details>

                        {text[activity].paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        <p>
                            {
                                experience.description[
                                    localStorage.getItem("language")
                                ]
                            }
                        </p>

                        <h3>{text.titles[1]}</h3>

                        <ul>
                            {text.included.map((element) => (
                                <li key={element}>{element}</li>
                            ))}
                        </ul>

                        <h3>{text.titles[2]}</h3>
                        <p>{text.need}</p>

                        <br />
                        <p>{text.disclaimer}</p>
                    </Information>
                    <Form>
                        <CalendarContainer
                            experience={experience}
                            blockedDates={blockedDates}
                            handlePeopleChange={handlePeopleChange}
                            image={experience.images[0].image}
                            handleSelect={handleSelect}
                            text={{ ...text.form, price: experience.price }}
                        />
                    </Form>
                </Content>
            )}
            <RevPartner />
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        blockedDates: state.date.selector,
        experience: state.experience.current,
        loading: state.experience.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
        fetchBlockedDatesSelector: (filters) =>
            dispatch(fetchBlockedDatesSelector(filters)),
        setFormFields: (data) => dispatch(setFormFields(data)),
        fetchExperience: (id) => dispatch(fetchExperience(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
