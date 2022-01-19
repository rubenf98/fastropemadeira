import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Row, notification } from 'antd';
import styled from "styled-components";
import { dimensions } from '../../helper';
import moment from 'moment';
import AnimationContainer from '../common/AnimationContainer';

const Container = styled.div`
    margin: 200px 0px;
    padding: 5px;
    min-height: 700px;
`;

const Summary = styled(Row)`
    margin: 30px auto;
    position: relative;
    width: 80%;
    border: 1px solid lightgray;
   
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,.2);
    border-radius: 6px;

    .fadeInUp {
        width: 100%;
    }

    .fadeIn {
        width: 45%;
        min-height: 500px;
        background: ${props => "url(" + props.image + ")"};
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;

        @media (max-width: ${dimensions.md}) {
            width: 80%;
            margin: auto;
            display: block;
            min-height: 400px;
        }

        @media (max-width: ${dimensions.sm}) {
            width: 96%;
            min-height: 300px;
        }
    }

    .details-container {
        width: 55%;
        padding: 25px;

        @media (max-width: ${dimensions.md}) {
            width: 80%;
            text-align: center;

            h3, p {
                width: 100%;
                margin: auto;
                display: block;
            }
        }

        @media (max-width: ${dimensions.sm}) {
            width: 96%;
        }

        h3 {
            font-size: 2em;
            font-weight: bold;

            @media (max-width: ${dimensions.md}) {
                margin-top: 10px;
            }
        }

        p {
            font-size: 1.2em;
        }
    }
`;

const Detail = styled.div`
    font-size: 1.2em;

    span {
        font-weight: bold;
    }
`;

const Loading = styled.div`
    width: 100%;
    display: flex;
    justify: center;

    .flex-container {
        margin: auto;
    }

    .gooey {
        padding: 10px;
        width: 100%;
        height: 40px;
        margin: 10px auto;
        background: #ffffff;
        filter: contrast(20);
    }

    .gooey .dot {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 22px;
        left: 60px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
        transform: translateX(0);
        animation: dot 2.8s infinite;
    }

    .gooey .dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 70px;
        animation: dots 2.8s infinite;
    }

    .gooey .dots span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: #000;
        border-radius: 50%;
    }

    @keyframes dot {
        50% {
            transform: translateX(120px);
        }
    }

    @keyframes dots {
        50% {
            transform: translateX(-20px);
        }
    }
`;

const PriceContainer = styled.div`
    font-size: 2.6em;
    font-weight: bold;
    color: rgb(52,60,94);
    position: absolute;
    right: 25px;
    bottom: 25px;    
`;


function Confirmation({ match }) {
    const [data, setData] = useState({})
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/confirmation");


    const openNotification = () => {
        notification.success({
            message: text.feedback,
            description: text.feedbackInstruction
        });
    };

    useEffect(() => {
        var token = match.params.token;

        axios.get(`${window.location.origin}/api/reservation/showFromToken?token=${token}`).then((response) => {
            setData(response.data.data);
            const before = moment().subtract(1, 'minute')
            if (moment(response.data.data.updated_at).isAfter(before)) {
                openNotification();
            }
        })

    }, [])

    return (
        <Container>
            {
                (Object.keys(data).length === 0) ?
                    <Loading>
                        <div className='flex-container'>
                            <img width="250" src="/logo.png" alt="logo" />
                            <div className="gooey">
                                <span className="dot"></span>
                                <div className="dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </Loading> :
                    <Fragment>
                        <Summary type="flex" justify="space-between" image={data.experience.images[0].image}>
                            <AnimationContainer animation="fadeIn">

                            </AnimationContainer>
                            <div className='details-container'>

                                <h3>{data.experience.name[localStorage.getItem("language")]}</h3>
                                <p>{data.experience.description[localStorage.getItem("language")]}</p>
                                <AnimationContainer animation="fadeInUp">
                                    <Detail><span>{text.details.name}: </span> {data.name} </Detail>
                                    <Detail><span>{text.details.email}: </span> {data.email} </Detail>
                                    <Detail><span>{text.details.phone}: </span> {data.phone} </Detail>
                                    <Detail><span>{text.details.address}: </span> {data.address} </Detail>
                                    <Detail><span>{text.details.private}: </span> {text.details.privateAnswer[data.private]} </Detail>
                                    <Detail><span>{text.details.date}: </span> {data.date} {data.time}</Detail>
                                    <Detail><span>{text.details.created_at}: </span> {data.created_at} </Detail>
                                    <Detail><span>{text.details.participants}: </span> {data.people} </Detail>
                                    {data.participants.map((participant, index) => (
                                        <Detail><span>{text.details.participant} {index + 1}: </span> {participant.birthday} /  {participant.gender} /  {participant.weight} / {participant.height}cm /  {participant.shoe} EU </Detail>
                                    ))}

                                    <Detail><span>{text.details.notes}: </span> {data.notes} </Detail>
                                </AnimationContainer>
                            </div>

                            <PriceContainer>
                                {data.price == 0 ? text.price : data.price + "€"}

                            </PriceContainer>
                        </Summary>


                    </Fragment>
            }

        </Container>
    )
}

export default Confirmation
