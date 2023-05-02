import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import CalendarContainer from './Activity/CalendarContainer';
import { maxWidth } from '../../helper';
import RevPartner from './Home/RevPartner';

const Container = styled.section`
    position: relative;
    margin-top: 80px;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100vw;
    background-color:red ;
    z-index: -1;
`;


const Form = styled.div`
    width: 30%;
    margin-top: 100px;
    position: sticky;
    top: 120px;
    left: 0;
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

    useEffect(() => {
        setActivity(props.match.params.activity);
    }, [])

    console.log(text["beginner"]);
    return (
        <Container>
            <Background />
            <Content>
                <Information>
                    <div className='title'>
                        <h1>Canyoning {text[activity]["title"]}</h1>
                    </div>

                    <Details>
                        <h3>{text.titles[0]}</h3>
                        <ul>
                            {text[activity].details.map((detail) => (
                                <li key={detail}>{detail}</li>
                            ))}
                        </ul>
                    </Details>

                    {text[activity].paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}

                    <h3>{text.titles[1]}</h3>

                    <ul>
                        {text[activity].included.map((element) => (
                            <li key={element}>{element}</li>
                        ))}
                    </ul>

                    <h3>{text.titles[2]}</h3>
                    <p>{text[activity].need}</p>

                    <br />
                    <p>{text.disclaimer}</p>
                </Information>
                <Form>
                    <CalendarContainer text={{ ...text.form, price: text[activity].price }} />
                </Form>
            </Content>

            <RevPartner />
        </Container>
    )
}

export default Activity