import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import CalendarContainer from './Activity/CalendarContainer';
import { dimensions, maxWidth } from '../../helper';
import RevPartner from './Home/RevPartner';
import { setFormFields, setFormVisibility } from '../../redux/form/actions';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchExperience } from '../../redux/experience/actions';
import { fetchBlockedDatesSelector } from '../../redux/date/actions';
import Carousel from "react-multi-carousel";

import { Spin } from 'antd';

const Container = styled.section`
    position: relative;
    margin-top: 80px;
`;

const Background = styled(Carousel)`
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100vw;
    z-index: -1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;


const Form = styled.div`
    width: 30%;
    margin-top: 100px;
    position: sticky;
    top: 120px;
    left: 0;

    @media (max-width: ${dimensions.lg}) {
        display: none;
    }
`;

const Information = styled.div`
    width: 60%;

    p, li {
        font-size: 18px;
        opacity: .8;
    }

    h3 {
        font-size: 20px;
    }

    .title {
        height: 500px;
        display: flex;
        align-items: center;

        h1 {
            color: white;
            margin: auto;
            line-height: 100%;
            font-size: clamp(30px, 5vw, 90px);
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 90%;
        margin: auto;
        padding: 0px 20px;
        box-sizing: border-box;
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
    padding:0px 0px 100px 0px;

`;

const Details = styled.div`
    width: 100%;
    background-color: #e9e9e9;
    padding: 20px;
    margin: 50px 0px;

    h3 {
        font-size: 20px;
    }
`;


function Activity(props) {
    const [activity, setActivity] = useState("beginner");
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/tour");
    const { experience, blockedDates } = props;

    const handlePeopleChange = (participants) => {
        props.fetchBlockedDatesSelector({ experience: props.match.params.experience, participants: participants });
    }

    useEffect(() => {
        props.fetchExperience(props.match.params.experience);
        setActivity(props.match.params.activity);
    }, []);

    const handleSelect = (fields) => {
        props.setFormFields({ ...fields, experience: experience });
        props.setFormVisibility(true);
    }

    return (
        <Container>
            <Background centerMode partialVisible={false}>
                <img src={experience.id ? "/images/activities/default_" + experience.name.en + ".jpg" : "/images/activities/default_beginner.jpg"} alt="" />
            </Background>
            {!experience.id ? <Spin /> :
                <Content>
                    <Information>
                        <div className='title'>
                            <h1>Canyoning {experience.name[localStorage.getItem('language')]}</h1>
                        </div>

                        <Details>
                            <h3>{text.titles[0]}</h3>
                            <ul>
                                <li>{experience.duration[localStorage.getItem('language')]}</li>
                                <li>{experience.height[localStorage.getItem('language')]}</li>
                                <li>{experience.target[localStorage.getItem('language')]}</li>
                                <li>{text[activity].age}</li>
                            </ul>
                        </Details>

                        {text[activity].paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        <p>{experience.description[localStorage.getItem('language')]}</p>

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
                        <CalendarContainer blockedDates={blockedDates} handlePeopleChange={handlePeopleChange} image={experience.images[0].image} handleSelect={handleSelect} text={{ ...text.form, price: experience.price }} />
                    </Form>
                </Content>
            }
            <RevPartner />
        </Container>
    )
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
        fetchBlockedDatesSelector: (filters) => dispatch(fetchBlockedDatesSelector(filters)),
        setFormFields: (data) => dispatch(setFormFields(data)),
        fetchExperience: (id) => dispatch(fetchExperience(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);