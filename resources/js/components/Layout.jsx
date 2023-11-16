import React, { useState, useEffect } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import styled from "styled-components";
import { withRouter } from "react-router";
import OrderForm from "./pages/OrderForm";
import { colors, dimensions } from "../helper";
import { setFormVisibility } from "../redux/form/actions";
import { connect } from "react-redux";
import VideoContainer from "./common/VideoContainer";

const Container = styled.div`
    width: 100%;
    max-width: 3840px;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
`;

const Chatbot = styled.div`
    background: white;
    position: fixed;
    bottom: 20px;
    left: ${props => props.visible ? "20px" : "-470px"};
    z-index: 100;
    width: 80vw;
    max-width: 450px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,.3);
    transition: all .5s ease;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${colors.main};
        padding: 20px;
        box-sizing: border-box;
        gap: 10px;

        .icon {
            width: 40px;
        }

        h3 {
            flex: 1;
            font-size: clamp(20px, 3vw, 32px);
            color: white;
            margin: 0px;
            line-height: 100%;
        }

        .close {
            width: 15px;
            cursor: pointer;
        }
    }

    .chat {
        padding: 20px 10px;
        box-sizing: border-box;

        .messages {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            width: 90%;

            img {
                width: 40px;
            }

            div {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                p {
                    padding: 6px 12px;
                    box-sizing: border-box;
                    font-size: 14px;
                    border: 1px solid black;
                    border-radius: 6px;
                }
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
            margin: 20px 0px;

            button {
                border: 2px solid ;
                border-color: ${colors.main};
                color: ${colors.main};
                background-color: white;
                box-shadow: none;
                padding: 6px 12px;
                box-sizing: border-box;
                border-radius: 6px;
                cursor: pointer;

                a {
                    color: ${colors.main};
                }
            }
        }
    }
`;


const OrderNow = styled.div`
    width: 40px;
    background: ${colors.main};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 50px;

    img {
        width: 20px;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const Icon = styled.a`
    width: 40px;
    background: ${colors.main};
    height: 40px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 40px;
    margin-top: 10px;

    img {
        width: 25px;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const HiddenButton = styled.div`
    display: ${props => props.visibleSmallScreen ? "none" : "flex"};
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 11;

    @media (max-width: ${dimensions.md}) {
        display: ${props => props.visibleSmallScreen ? "flex" : "none"};
    }
`;


function Layout(props) {
    const { text } = require('../../assets/' + localStorage.getItem('language') + "/chatbot");
    const [chatbot, setChatbot] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setChatbot(true)
        }, 2000);
    }, [])

    return (
        <Container>

            <VideoContainer />
            <OrderForm />
            <Chatbot visible={chatbot}>
                <div className="header">
                    <img className="icon" src="/icon/chat.svg" alt="chat" />
                    <h3>{text.title}</h3>
                    <img onClick={() => setChatbot(false)} className="close" src="/icon/close-white.svg" alt="close" />
                </div>
                <div className="chat">
                    <div className="messages">
                        <img src="/logo.svg" alt="logo" />
                        <div>
                            <p>{text.messages[0]}</p>
                            <p>{text.messages[1]}</p>
                            <p>{text.messages[2]}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button><a href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank">{text.buttons[0]}</a></button>
                        <button><a href="mailto:info@fastropemadeira.com" target="_blank" >{text.buttons[1]}</a></button>
                    </div>
                </div>
            </Chatbot>

            <HiddenButton>
                <Icon href="mailto:info@fastropemadeira.com" target="_blank" >
                    <img src="/icon/company/mail.svg" alt="email" />
                </Icon>
                <Icon href="https://www.instagram.com/fastrope_madeira/" target="_blank" >
                    <img src="/icon/company/instagram.svg" alt="instagram" />
                </Icon>
                <Icon href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank" >
                    <img src="/icon/company/whatsapp.svg" alt="whatsapp" />
                </Icon>
            </HiddenButton>
            <HiddenButton visibleSmallScreen>
                <OrderNow onClick={() => props.setFormVisibility(true)}>
                    <img src="/icon/order.svg" alt="order" />
                </OrderNow>
            </HiddenButton>
            <Navbar onOrder={() => props.setFormVisibility(true)} />

            {props.children}


            <Footer />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Layout));
