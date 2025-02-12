import React, { useState } from "react";
import styled from "styled-components";
import { colors, dimensions } from "../../../helper";
import { connect } from "react-redux";
import { setVideoSrc } from "../../../redux/application/actions";
import { Col, DatePicker, Row, Select } from "antd";
import { setFormVisibility } from "../../../redux/form/actions";
import dayjs from "dayjs";

const Container = styled.div`
    position: relative;
    min-height: 100vh;
    width: 100vw;
    z-index: 10;
    padding-top: 150px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex: 1;

    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 20px 0px;
        box-sizing: border-box;
    }

    .charateristics {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
                width: 60px;
            }

            p {
                color: white;
                text-transform: uppercase;
                text-align: center;
                margin: 5px 0px;
                font-weight: bold;
            }
        }
    }

    @media (max-width: ${dimensions.lg}) {
        .charateristics {
            display: none;
        }
    }
`;

const BackgroundImage = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${(props) => props.prio};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    padding: 50px 20px 0px 20px;
    box-sizing: border-box;
    flex: 1;

    h1 {
        color: white;
        font-family: "Poppins", sans-serif;
        font-size: clamp(18px, 3vw, 26px);
        font-weight: bold;
        font-style: italic;
        text-transform: uppercase;
    }

    h2 {
        color: white;
        font-family: "Palestine Border";
        font-size: clamp(80px, 9vw, 160px);
        line-height: 80%;
        letter-spacing: 5%;
    }

    @media (max-width: ${dimensions.md}) {
        h1,
        h2 {
            text-align: center;
        }
    }
`;

const Social = styled.div`
    display: flex;
    gap: 10px;
    padding-left: 20px;
    box-sizing: border-box;

    a {
        width: 40px;
        background: ${colors.main};
        height: 40px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2 ease-in-out;
        border-radius: 40px;
        margin-top: 10px;

        img {
            width: 25px;
        }

        &:hover {
            background: ${colors.mainHover};
        }
    }
`;

const Form = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding-left: 20px;
    box-sizing: border-box;
    margin-top: 50px;
    margin-bottom: 20px;

    input {
        border: 0px;
        box-shadow: 0px;
        font-size: 18px;
    }

    .datepicker,
    .participants {
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
    }

    .datepicker > p,
    .participants > p {
        color: white;
        opacity: 0.7;
        margin: 0px;
        font-size: 18px;
    }
    .ant-select-selector {
        padding: 0px !important;
        font-size: 18px;
    }

    input::placeholder,
    .ant-select-selection-placeholder {
        color: white;
        opacity: 1;
    }

    .button {
        background-color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;

        button {
            background-color: transparent;
            border: 0px;
            box-shadow: 0px;
            cursor: pointer;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 70%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 90%;
    }
`;

function Header(props) {
    const { text } = props;
    const [form, setForm] = useState({
        date: undefined,
        participants: undefined,
    });
    return (
        <Container>
            <Content>
                <div className="content">
                    <TitleContainer>
                        <h1>{text.title}</h1>
                        <h2>{text.subtitle}</h2>
                    </TitleContainer>

                    <Form>
                        <div className="datepicker" span={10}>
                            <p>{text.form.date.label}</p>
                            <DatePicker
                                onChange={(e) => setForm({ ...form, date: e })}
                                style={{ width: "100%", paddingLeft: "0px" }}
                                bordered={false}
                                placeholder={text.form.date.placeholder}
                                format="DD/MM/YYYY"
                                disabledDate={(currentDate) => {
                                    return (
                                        currentDate &&
                                        currentDate <= dayjs().endOf("day")
                                    );
                                }}
                            />
                        </div>
                        <div className="participants" span={12}>
                            <p>{text.form.participants.label}</p>
                            <Select
                                onChange={(e) => setForm({ ...form, time: e })}
                                style={{ width: "100%" }}
                                bordered={false}
                                size="large"
                                placeholder={text.form.participants.placeholder}
                                options={[
                                    { value: 2, label: 2 },
                                    { value: 3, label: 3 },
                                    { value: 4, label: 4 },
                                    { value: 5, label: 5 },
                                    { value: 6, label: 6 },
                                    { value: 7, label: 7 },
                                    { value: 8, label: 8 },
                                    { value: 9, label: 9 },
                                    { value: 10, label: 10 },
                                    { value: 11, label: 11 },
                                    { value: 12, label: 12 },
                                    { value: 13, label: 13 },
                                    { value: 14, label: 14 },
                                    { value: 15, label: 15 },
                                ]}
                            />
                        </div>

                        <div className="button" span={2}>
                            <button
                                onClick={() => props.setFormVisibility(true)}
                            >
                                <img
                                    src="/icon/header/search.svg"
                                    alt="search"
                                />
                            </button>
                        </div>
                    </Form>

                    <Social>
                        <a
                            href="mailto:info@fastropemadeira.com"
                            target="_blank"
                        >
                            <img src="/icon/company/mail.svg" alt="email" />
                        </a>
                        <a
                            href="https://www.instagram.com/fastrope_madeira/"
                            target="_blank"
                        >
                            <img
                                src="/icon/company/instagram.svg"
                                alt="instagram"
                            />
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?l=en&phone=351933933452"
                            target="_blank"
                        >
                            <img
                                src="/icon/company/whatsapp.svg"
                                alt="whatsapp"
                            />
                        </a>
                    </Social>

                    <BackgroundImage prio={-1}>
                        <img
                            src="/images/header.jpg"
                            alt="madeira island wallpaper"
                            loading="eager"
                        />
                    </BackgroundImage>
                </div>
                <div className="charateristics">
                    {text.charateristics.map((e, i) => (
                        <div>
                            <img src={e.icon} alt="" />
                            <p>{e.text}</p>
                        </div>
                    ))}
                </div>
            </Content>
        </Container>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
    };
};

export default connect(null, mapDispatchToProps)(Header);
