import React, { useState } from 'react'
import styled, { keyframes } from "styled-components";
import { Row, Form, Input, Button, Col, InputNumber } from "antd";
import { social, icon, background, feedback } from "../../images";
import { dimensions } from "../../helper";
import SubmitButton from "./Contact/SubmitButton";
import axios from "axios";
import { fadeInUp, fadeOut } from 'react-animations'

const fadeAnimation = keyframes`${fadeInUp}`;
const fadeOutA = keyframes`${fadeOut}`;

const FeedbackContainer = styled.div`
    background: #f7f7f7;
    padding: 9em 0;
    position: relative;
    width: 100%;

    h2, p {
        text-align: center;
    }

    h2{
        font-weight: bold;
        font-size: 3em;
        margin-bottom: 0px;

        @media (max-width: ${dimensions.md}){
            font-size: 2.5em;
        }
    }

    p{
        font-size: 1.4em;
        color: #777;
        margin: 0px auto 40px auto;

        @media (max-width: ${dimensions.md}){
            font-size: 1.2em;
        }
    }
`;

const Container = styled.div`
    min-height: 100vh;
    margin-top: 100px;
    background-image: url(${background.aboutOverlay});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -2;
`;

const Overlay = styled.div`
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 100%); 
`;

const CustomInput = styled(Input)`
    border-radius: 6px;
    background: #fafafa;
`;

const TextArea = styled(Input.TextArea)`
    margin: auto;
    textarea {
        border-radius: 6px;
        background: #fafafa;
    }
`;

const ContactForm = styled(Form)`
    width: 100%;
`;

const SubContainer = styled(Row)`
    width: 60%;
    background: white;
    border-radius: 6px;
    padding: 50px;
    box-shadow: 0px 15px 30px 0px rgba(0,0,0,.3);

    @media (max-width: ${dimensions.lg}){
        width: 85%;
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
        background: transparent;
        box-shadow:none;
    }

    label {
        font-size: 1.2em;
        font-weight: bold;
    }
    
`;

const FormContainer = styled(Row)`
    width: 60%;

    .ant-col{
        width: 100%;
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }
`;

const Title = styled.div`
    z-index: 1;
    margin-bottom: 20px;
    h1 {
        color: rgb(52, 60, 94);
        font-weight: bold;
        font-size: 3em;
        margin: 0px;
    }

    p {
        font-size: 1.2em;
        margin: 0px 0px 15px 0px;
    }
`;

const InfoContainer = styled.div`
    width: 35%;
    z-index: 1;

    @media (max-width: ${dimensions.md}){
        width: 100%;
        display: flex;
        justify-content: space-around;
    }


    @media (max-width: ${dimensions.sm}){
        width: 100%;
        display: block;
    }

    h3 {
        font-weight: bold;
        font-size: 1.6em;
        margin: 0px;
    }

    p{
        color: #777;
        font-size: 1.2em;
        margin: 0px 0px 15px 0px;
    }
`;

const Logo = styled.a`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background: rgb(52, 60, 94);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
        margin: 0px;
    }

    img{
        width: 60%;
    }
`;

const Submit = styled(Button)`
    background: rgb(52, 60, 94);
    border: none;
    padding: 10px;
    text-transform: uppercase;

    &:hover, &:focus {
        background: #2b3252;
    }

    @media (max-width: ${dimensions.md}){
        margin: auto;
    }

    img {
        height: 60%;
        margin-left: 8px;
    }
`;

const FeedbackSectionContainer = styled(Row)`
    width: 100%;
    margin: 50px auto;

    @media (max-width: ${dimensions.lg}){
        min-width: 80% !important;
    }

    @media (max-width: ${dimensions.md}){
        width: 100% !important;
    }

`;

const FeedbackIcon = styled.img`
    width: 40px;
    max-width: 18%;
    box-sizing: border-box;
    height: auto;
    margin: 0px 10px;
    cursor: pointer;
    filter: ${props => props.active ? "grayscale(0)" : "grayscale(1)"} ;
    opacity: ${props => props.active ? 1 : .4} ;
`;

const Parameter = styled.div`
    width: 50%;
    margin: 10px auto;
    display: flex;
    justify-content: center;

    @media (max-width: ${dimensions.md}){
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        margin: 15px auto;
    }

    span {
        font-size: 1.2em;
        color: #272727;
        text-align: center;
        margin-right: 20px;
    }

    img {
        width: 20px;
        cursor: pointer;
        margin: 0 5px;

        &:first-child {
            filter: ${props => props.active == 1 ? "grayscale(0)" : "grayscale(1)"} ;
            opacity: ${props => (props.active == 1 || props.active == undefined) ? 1 : .4} ;
        }

        &:last-child {
            filter: ${props => props.active == 0 ? "grayscale(0)" : "grayscale(1)"} ;
            opacity: ${props => (props.active == 0 || props.active == undefined) ? 1 : .4} ;
        }
    }
`;


const FormFeedback = styled.div`
    z-index: 1;
    width: 80%;
    padding: 20px;
    border: 1px solid rgb(52,60,94);
    text-align: center;
    margin: auto;
    border-radius: 8px;
    color: #252525;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,.2);
    animation: 1s ${fadeAnimation};
`;

const rules = {
    name: [
        {
            required: true,
            message: 'Please input your name!',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please input your email!',
        },
        {
            type: "email",
        },
    ],
    message: [
        {
            required: true,
            message: 'Please input your message!',
        },
    ]
}

function Contact() {
    const [active, setActive] = useState(null);
    const [feedbackFormReady, setFeedbackFormReady] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [feedbackForm] = Form.useForm();
    const [form] = Form.useForm();
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/contact");



    const onFinish = (values) => {
        axios.post(`${window.location.origin}/api/contact`, values);

        setTimeout(() => {
            form.resetFields();
            setSubmitted(true);
        }, 300);

    };

    const submitForm = () => {
        feedbackForm.validateFields().then(values => {
            axios.post(`${window.location.origin}/api/feedback`, values);
            setFeedbackFormReady(true);
            setTimeout(() => {
                setActive(null)
                feedbackForm.resetFields();
            }, 1000);

            setTimeout(() => {
                setFeedbackFormReady(false);
            }, 3000);
        })
    };

    const handleRatingChange = (value) => {
        feedbackForm.setFieldsValue({ "rating": value + 1 });
        setActive(value);
    };


    return (
        <div>
            <Container>
                <Overlay />
                <SubContainer type="flex" justify="space-between">
                    <Title>
                        <h1>{text.formTitle}</h1>
                        <p>{text.formParagraph}</p>
                    </Title>
                    <FormContainer type="flex" justify="space-between" align="middle">
                        {submitted ?
                            <FormFeedback>
                                {text.formFeedback}
                            </FormFeedback>
                            :
                            <ContactForm
                                requiredMark={false}
                                name="basic"
                                onFinish={onFinish}
                                layout="vertical"
                                form={form}
                            >
                                <Row gutter={16}>
                                    <Col md={24} lg={12}>
                                        <Form.Item
                                            label={text.form.items[0]}
                                            name="name"
                                            rules={rules.name}
                                        >
                                            <CustomInput size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={24} lg={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={rules.email}
                                        >
                                            <CustomInput size="large" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    label={text.form.items[1]}
                                    name="message"
                                    rules={rules.message}
                                >
                                    <TextArea size="large" showCount maxLength={100} />
                                </Form.Item>

                                <Form.Item>
                                    <Submit shape="round" size="large" type="primary" htmlType="submit">
                                        {text.form.submit}
                                        <img src={icon.send} alt="submit" />
                                    </Submit>
                                </Form.Item>
                            </ContactForm>
                        }
                    </FormContainer>
                    <InfoContainer >
                        <div>
                            <h3>{text.form.info[0]}</h3>
                            <p>+351 933 933 452</p>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>madeirafastrope@gmail.com</p>
                        </div>
                        <div>
                            <h3>{text.form.info[1]}</h3>
                            <Row type="flex" align="middle">
                                <Logo href="https://www.facebook.com/madeira.fastrope" target="_blank" >
                                    <img src={social.facebook} alt="facebook" />
                                </Logo>
                                <Logo href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank" >
                                    <img src={social.whatsapp} alt="whatsapp" />
                                </Logo>
                                <Logo href="https://www.instagram.com/fastrope.madeira/" target="_blank" >
                                    <img src={social.instagram} alt="instagram" />
                                </Logo>
                                <Logo href="https://www.tripadvisor.pt/Attraction_Review-g189167-d23713035-Reviews-Fast_Rope_Madeira-Funchal_Madeira_Madeira_Islands.html" target="_blank" >
                                    <img src={social.tripadvisor} alt="tripadvisor" />
                                </Logo>
                            </Row>
                        </div>
                    </InfoContainer>
                </SubContainer>

            </Container>
            <FeedbackContainer>
                <h2>{text.feedback.title}</h2>
                <p>{text.feedback.paragraph}</p>
                <Form
                    requiredMark={false}
                    name="feedback"
                    layout="vertical"
                    form={feedbackForm}
                >

                    <Form.Item style={{ display: "none" }} name="rating" rules={[
                        {
                            required: true,
                            message: 'Please input your rating!',
                        }
                    ]}>
                        <InputNumber />
                    </Form.Item>

                    <FeedbackSectionContainer type="flex" justify="center">
                        {Object.values(feedback).map((level, index) => (
                            <FeedbackIcon key={index} onClick={() => handleRatingChange(index)} active={active == index} src={level} alt={"level" + (index + 1)} />
                        ))}
                    </FeedbackSectionContainer>

                    <FeedbackSectionContainer type="flex" justify="center">
                        <Col xs={23} sm={16} lg={10}>
                            <Form.Item
                                name="message"
                                rules={rules.message}
                            >
                                <TextArea style={{ width: "100%" }} showCount maxLength={150} rows={6} />
                            </Form.Item>
                        </Col>
                    </FeedbackSectionContainer>
                    <div onClick={submitForm}>
                        <SubmitButton active={feedbackFormReady} />
                    </div>
                </Form>

            </FeedbackContainer>
        </div>
    )
}

export default Contact
