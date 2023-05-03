import React, { Fragment, useState, useEffect } from 'react'
import { Row, Form, Input, DatePicker, Calendar, Col, Slider, Select, Button, Switch, Divider } from 'antd';
import styled from "styled-components";
import moment from "moment";
import { dimensions } from "../../../helper";
import axios from "axios";
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/en/world.json';
import BackButton from './BackButton';
import Carousel from 'react-multi-carousel';
import { connect } from "react-redux";
import { fetchDisabledDate } from '../../../redux/reservation/actions';

const responsive = {
    general: {
        breakpoint: { max: 10000, min: 0 },
        items: 1
    }
};

const { TextArea } = Input;

const CustomCarousel = styled(Carousel)`
    width: 40%;

    @media (max-width: ${dimensions.md}) {
        width: 80%;
        margin: auto;
        display: block;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 96%;
    }

    li  {
        display: flex;
        align-items: center;
    }

    img {
        width: 100%;
    }
`;
const Summary = styled(Row)`
    margin: 30px auto;

    .experience-info {
        width: 55%;

        @media (max-width: ${dimensions.md}) {
            width: 80%;
            text-align: center;

            h2, p {
                width: 100%;
                margin: auto;
                display: block;
            }
        }

        @media (max-width: ${dimensions.sm}) {
            width: 96%;
        }

        h2 {
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

const PersonFormContainer = styled(Row)`
    background: #e7e7e7;
    padding: 10px;
    box-sizing: border-box;
    margin: 30px auto;
    border-radius: 12px;

    @media (max-width: ${dimensions.md}) {
        padding: 15px;
    }

    @media (max-width: ${dimensions.sm}) {
        padding: 10px;
    }

`;

const PersonForm = styled.div`
    width: 50%;
    padding: 10px;
    box-sizing: border-box;

    .background {
        border-radius: 12px;
        background: white;
        padding: 15px;
        box-sizing: border-box;
    }

    @media (max-width: ${dimensions.md}) {
        width: 45%;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 90%;
    }
`;

const Charateristic = styled.div`
    width: 50% !important;
    margin: 10px auto;
    font-size: 1.2em;
    display: flex;
    align-items: middle;
    
    img {
        width: 24px;
        margin-right: 8px;
    }

    @media (max-width: ${dimensions.md}) {
        width: 45%;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 90%;
        font-size: 1em;

        img {
            margin: 0px;
            margin-right: 4px;  
            width: 22px;
        }
    }
`;

const PriceContainer = styled.div`
    font-size: 2.6em;
    
    p {
        span {
            font-weight: bold;
            color: rgb(52,60,94);
        }
        margin: 0px;
    }

    
`;


const Checkout = styled(Button)`
    min-height: 70px;
    box-sizing: border-box;
    cursor: pointer;
    background: rgb(52,60,94);
    padding: 12px 28px;
    border-radius: 0 0 0 12px;
    transition: .4s;
    color: white;
    display: flex;
    text-transform: uppercase;

    span {
        margin: auto;
        font-weight: bold;
        font-size: 1.4em;
    }

    @media (max-width: ${dimensions.md}) {
        //display: none;
    }

    &:hover, &:focus {
        background: #2b3252;
        color: white;
    }
    
`;

const Disclaimer = styled.div`
    margin: 0px;
    margin-top: -10px;

    p {
        font-size: .35em;
    }
`;

const rules = {
    name: [
        {
            required: true,
            message: 'Please input the name of the reservation!',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please input a contact email!',
        },
        {
            type: "email",
        },
    ],
    date: [
        {
            required: true,
            message: 'Please input a valid date after tomorrow!',
        },
    ],
    address: [
        {
            required: false,
            message: 'Please input an address!',
        },
    ],
    phone: [
        {
            message: 'Please input a phone number!',
            validator: (_, value) => {
                if (value.phone && value.code) {
                    return Promise.resolve();
                } else {
                    return Promise.reject("'phone number' is required");
                }
            }
        }
    ],
    bday: [
        {
            required: true,
            message: 'Please input the birthday of all participants',
        },
    ],
    gender: [
        {
            required: true,
            message: 'Please input the gender of all participants',
        },
    ],
    height: [
        {
            required: true,
            message: 'Please input the height of all participants',
        },
    ],
    weight: [
        {
            required: true,
            message: 'Please input the weight of all participants',
        },
    ],
    shoe: [
        {
            required: true,
            message: 'Please input the shoe size of all participants',
        },
    ],
};

function People({ incrementStep, formContent, decrementStep, text, form, loading }) {
    const [extra, setExtra] = useState(0);
    const [priv, setPrivate] = useState(false);
    const { experience, people } = formContent;

    function handleSubmit() {
        form.validateFields();
        incrementStep();
    }

    return (
        <ConfigProvider locale={en}>
            <BackButton decrementStep={decrementStep} text={text.experienceBackButton} />

            {Object.keys(experience).length === 0 ? <h1>loading</h1> :
                <Summary type="flex" justify="space-between">
                    <CustomCarousel
                        removeArrowOnDeviceType="general"
                        autoPlay
                        itemClass="image-item"
                        infinite
                        swipeable
                        responsive={responsive}
                        showDots={false}
                    >
                        {experience.images.map((image) => (
                            <img src={image.image} alt="gallery" />
                        ))}
                    </CustomCarousel>
                    <div className='experience-info'>
                        <h2>{experience.name[localStorage.getItem("language")]}</h2>
                        <p>{experience.description[localStorage.getItem("language")]}</p>
                        <Row type="flex" justify="space-around" style={{ width: "100%" }}>
                            {!Array.isArray(experience.duration) &&
                                <Charateristic>
                                    <img src="/icon/form/time.svg" />   {experience.duration[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            {!Array.isArray(experience.height) &&
                                <Charateristic>
                                    <img src="/icon/form/height.svg" /> {experience.height[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            {!Array.isArray(experience.distance) &&
                                <Charateristic>
                                    <img src="/icon/form/distance.svg" /> {experience.distance[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            <Charateristic>
                                <img src="/icon/form/people.svg" /> Group Experience
                            </Charateristic>
                            {!Array.isArray(experience.level) &&
                                <Charateristic>
                                    <img src="/icon/form/difficulty.svg" /> {experience.level[localStorage.getItem("language")]}
                                </Charateristic>
                            }

                        </Row>
                    </div>

                </Summary>}

            <h2>{text.formTitle}</h2>
            <Row gutter={16} type="flex" align='bottom'>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label={text.form.name.label}
                        rules={rules.name}
                    >
                        <Input placeholder={text.form.name.placeholder} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="email"
                        label={text.form.email.label}
                        rules={rules.email}
                    >
                        <Input placeholder={text.form.email.placeholder} />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label={text.form.phone.label}
                        name="phone"
                        rules={rules.phone}
                        initialValue={{
                            short: 'pt',
                        }}
                    >
                        <CountryPhoneInput size="small" placeholder={text.form.phone.placeholder} />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item name="address" label={experience.id == 1 || experience.id == 2 ? text.form.address.label + " (+5€)" : text.form.address.label} rules={rules.address} >
                        <Input onChange={(e) => e.target.value ? setExtra(experience.id == 1 || experience.id == 2 ? 5 : 0) : setExtra(0)} placeholder={text.form.address.placeholder} />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item name="private" valuePropName="checked" initialValue={false}>
                        <Switch onChange={(value) => setPrivate(value)} checkedChildren={text.form.private.label} unCheckedChildren={text.form.private.label} />
                    </Form.Item>
                </Col>
            </Row>

            

            <h2>{text.formSubTitle}</h2>
            <PersonFormContainer gutter={8} type="flex" justify="flex-start">
                <Form.List name="person">
                    {() => (
                        <>
                            {[...Array(people)].map((p, index) =>
                                <Form.List key={index} name={index}>
                                    {() => (
                                        <PersonForm key={index}>
                                            <div className='background'>
                                                <h3>Person {index + 1}</h3>
                                                <Row gutter={8} type="flex" align="bottom">
                                                    <Col xs={24} md={12}>
                                                        <Form.Item name="birthday" rules={rules.bday}>
                                                            <DatePicker picker="month" placeholder={text.form.person.bday.placeholder} style={{ width: "100%" }} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item name="gender" rules={rules.gender}>
                                                            <Select placeholder={text.form.person.gender.placeholder}>
                                                                <Select.Option value="male">{text.form.gender[0]}</Select.Option>
                                                                <Select.Option value="female">{text.form.gender[1]}</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item name="height" rules={rules.height}>
                                                            <Select placeholder={text.form.person.height.placeholder}>
                                                                <Select.Option value="120">&lt; 120cm</Select.Option>
                                                                {[...Array(89)].map((count, index) =>
                                                                    <Select.Option key={index} value={index + 121}>{index + 121}cm</Select.Option>
                                                                )}
                                                                <Select.Option value="Over 210">&gt; 210cm</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item name="weight" rules={rules.weight}>
                                                            <Select placeholder={text.form.person.weight.placeholder}>
                                                                <Select.Option value="Under 30kg">&lt; 30kg</Select.Option>
                                                                {[...Array(89)].map((count, index) =>
                                                                    <Select.Option key={index} value={index + 31}>{index + 31}kg</Select.Option>
                                                                )}
                                                                <Select.Option value="Over 120kg">&gt; 120kg</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Form.Item name="shoe" rules={rules.shoe}>
                                                            <Select placeholder={text.form.person.shoe.placeholder}>
                                                                <Select.Option value="35">2 UK / 35 EU</Select.Option>
                                                                <Select.Option value="36">3 UK / 36 EU</Select.Option>
                                                                <Select.Option value="37">4 UK / 37 EU</Select.Option>
                                                                <Select.Option value="38">5 UK / 38 EU</Select.Option>
                                                                <Select.Option value="39">5.5 UK / 39 EU</Select.Option>
                                                                <Select.Option value="40">6.5 UK / 40 EU</Select.Option>
                                                                <Select.Option value="41">7 UK / 41 EU</Select.Option>
                                                                <Select.Option value="42">8 UK / 42 EU</Select.Option>
                                                                <Select.Option value="43">9 UK / 42 EU</Select.Option>
                                                                <Select.Option value="44">9.5 UK / 44 EU</Select.Option>
                                                                <Select.Option value="45">10 UK / 45 EU</Select.Option>
                                                                <Select.Option value="46">11 UK / 46 EU</Select.Option>
                                                                <Select.Option value="47">12 UK / 47 EU</Select.Option>
                                                                <Select.Option value="48">13 UK / 48 EU</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </PersonForm>
                                    )}
                                </Form.List>
                            )}
                        </>)}
                </Form.List>
            </PersonFormContainer>





            <Row type="flex" justify="space-between" style={{ marginTop: "50px" }}>
                <PriceContainer>

                    <p>TOTAL: {experience.price == 0 || priv ? text.price : <span>{(priv ? experience.private_price : experience.price) * people + extra}€</span>}</p>
                    <Disclaimer>
                        <p>All prices in euro (EUR €)</p>
                    </Disclaimer>
                </PriceContainer>

                <Checkout disabled={loading} onClick={handleSubmit}><span>{text.submit}</span> </Checkout>
            </Row>
        </ConfigProvider >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDisabledDate: (filters) => dispatch(fetchDisabledDate(filters)),
    };
};
const mapStateToProps = (state) => {
    return {
        calendarMetadata: state.reservation.calendarMetadata,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
