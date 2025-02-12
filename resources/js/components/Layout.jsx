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
import { useLocation } from "react-router-dom";
import { useQuery } from "./common/useQuery";

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
    right: ${(props) => (props.visible ? "150px" : "-370px")};
    z-index: 100;
    width: 80vw;
    max-width: 350px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.5s ease;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${colors.main};
        padding: 10px;
        box-sizing: border-box;
        gap: 10px;

        .icon {
            width: 60px;
        }

        & > div {
            flex: 1;

            h4 {
                font-size: clamp(14px, 2vw, 16px);
                font-weight: light;
                color: white;
                margin: 0px;
                line-height: 100%;
            }

            h3 {
                font-size: clamp(18px, 3vw, 24px);
                color: white;
                margin: 0px;
                line-height: 100%;
            }
        }

        .close {
            width: 10px;
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
                    font-size: 16px;
                    background-color: #f5f5f5;
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
                border: 2px solid;
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

    @media (max-width: ${dimensions.lg}) {
        right: ${(props) => (props.visible ? "20px" : "-370px")};
        max-width: 300px;
    }
`;

function Layout(props) {
    const { text } = require("../../assets/" +
        localStorage.getItem("language") +
        "/chatbot");
    const [chatbot, setChatbot] = useState(false);
    let query = useQuery();

    useEffect(() => {
        setTimeout(() => {
            setChatbot(true);
        }, 2000);
    }, []);

    useEffect(() => {
        var partnerUrl = query.get("partnerUrl");
        console.log(partnerUrl);
        if (partnerUrl) {
            props.setFormVisibility(true);
        }
    }, []);

    return (
        <Container>
            <VideoContainer />
            <OrderForm />
            <Chatbot visible={chatbot}>
                <div className="header">
                    <img className="icon" src="/logo.svg" alt="logo" />
                    {/* <img className="icon" src="/icon/chat.svg" alt="chat" /> */}
                    <div>
                        <h4>{text.subtitle}</h4>
                        <h3>{text.title}</h3>
                    </div>
                    <img
                        onClick={() => setChatbot(false)}
                        className="close"
                        src="/icon/close-white.svg"
                        alt="close"
                    />
                </div>
                <div className="chat">
                    <div className="messages">
                        {/* <img src="/logo.svg" alt="logo" /> */}
                        <div>
                            <p>{text.messages[0]}</p>
                            <p>{text.messages[1]}</p>
                            <p>{text.messages[2]}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button>
                            <a
                                href="https://api.whatsapp.com/send?l=en&phone=351933933452"
                                target="_blank"
                            >
                                {text.buttons[0]}
                            </a>
                        </button>
                        <button>
                            <a
                                href="mailto:info@fastropemadeira.com"
                                target="_blank"
                            >
                                {text.buttons[1]}
                            </a>
                        </button>
                    </div>
                </div>
            </Chatbot>

            {/* <HiddenButton visibleSmallScreen>
                <OrderNow onClick={() => props.setFormVisibility(true)}>
                    <img src="/icon/order.svg" alt="order" />
                </OrderNow>
            </HiddenButton> */}
            <Navbar onOrder={() => props.setFormVisibility(true)} />

            {props.children}

            <Footer />
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Layout));
