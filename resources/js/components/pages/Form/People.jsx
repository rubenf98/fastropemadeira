import React, { Fragment, useState, useEffect } from 'react'
import { Row, Form, Input, DatePicker, Calendar, Col, Slider, Select, Button, Switch, Divider } from 'antd';
import styled from "styled-components";
import moment from "moment";
import { dimensions, getCarouselBreakpoints } from "../../../helper";
import axios from "axios";
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/en/world.json';
import BackButton from './BackButton';
import Carousel from 'react-multi-carousel';

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

const Time = styled.div`
    width: 40%;
    min-height: 60px;
    border: 1px solid rgba(52,60,94, .3);
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: middle;
    justify-content: center;
    transition: 0.3s;
    margin-top: 20px;

    @media (max-width: ${dimensions.md}) {
        width: 60%;
    }

    div {
        background: rgb(52,60,94);
        position: absolute;
        top: 0px;
        right: 0px;
        border-bottom-left-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: middle;
        justify-content: center;

        img {
            width: 16px;
            margin: auto;
            display: block;
        }
    }

    h3 {
        font-weight: bold;
        margin: auto;
        font-size: 1.6em;
    }

    &:hover {
        background: rgb(52,60,94);

        div {
            border-top-right-radius: 6px;
        }

        h3 {
            color: white;
        }
    }
`;

const CustomSlider = styled(Slider)`
    &:hover, .ant-slider:hover {
        .ant-slider-track {
            background-color:#262b44;
        }
        .ant-slider-handle{
            border-color: #262b44;
        }
    }
    .ant-slider-track {
        background-color:rgb(52,60,94);
    }

    .ant-slider-handle{
        border-color: rgb(52,60,94);
    }
`;

const PersonFormContainer = styled(Row)`
    background: #e7e7e7;
    padding: 30px;
    margin: 30px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 15px;
    }

    @media (max-width: ${dimensions.sm}) {
        padding: 10px;
    }

`;

const PersonForm = styled.div`
    width: 30%;
    background: white;
    margin: 20px auto;
    padding: 20px;
    border-radius: 6px;

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
            required: true,
            message: 'Please input an address!',
        },
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

function People({ getExperience, incrementStep, updateForm, calendarMetadata, decrementStep, text, form, loading }) {
    const [data, setData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(15);
    const [people, setPeople] = useState(6);
    const [priv, setPrivate] = useState(false);

    useEffect(() => {
        let experience = getExperience();
        axios.get(`${window.location.origin}/api/experience/${experience}`).then((response) => {
            setData(response.data.data);
        });
    }, []);

    function handleDateChange(value) {
        var currentDate = moment(value).format("YYYY-MM-DD");
        if (calendarMetadata.dates[currentDate]) {
            setCurrentLimit(15 - calendarMetadata.dates[currentDate]);
        } else setCurrentLimit(15);

        updateForm({ date: value });
    }

    function handleSubmit() {
        form.validateFields();
        incrementStep();
    }

    return (
        <ConfigProvider locale={en}>
            <BackButton decrementStep={decrementStep} text={text.experienceBackButton} />

            {Object.keys(data).length === 0 ? <h1>loading</h1> :
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
                        {data.images.map((image) => (
                            <img src={image.image} alt="gallery" />
                        ))}
                    </CustomCarousel>
                    <div className='experience-info'>
                        <h3>{data.name[localStorage.getItem("language")]}</h3>
                        <p>{data.description[localStorage.getItem("language")]}</p>
                        <Row type="flex" justify="space-around" style={{ width: "100%" }}>
                            {!Array.isArray(data.duration) &&
                                <Charateristic>
                                    <img src="/icon/form/time.svg" />   {data.duration[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            {!Array.isArray(data.height) &&
                                <Charateristic>
                                    <img src="/icon/form/height.svg" /> {data.height[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            {!Array.isArray(data.distance) &&
                                <Charateristic>
                                    <img src="/icon/form/distance.svg" /> {data.distance[localStorage.getItem("language")]}
                                </Charateristic>
                            }
                            <Charateristic>
                                <img src="/icon/form/people.svg" /> Group Experience
                            </Charateristic>
                            {!Array.isArray(data.level) &&
                                <Charateristic>
                                    <img src="/icon/form/difficulty.svg" /> {data.level[localStorage.getItem("language")]}
                                </Charateristic>
                            }

                        </Row>
                    </div>

                </Summary>}

            <h2>{text.formTitle}</h2>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="name"
                        label={text.form.name.label}
                        rules={rules.name}
                    >
                        <Input placeholder={text.form.name.placeholder} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="email"
                        label={text.form.email.label}
                        rules={rules.email}
                    >
                        <Input placeholder={text.form.email.placeholder} />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item
                        label={text.form.phone.label}
                        name="phone"
                        initialValue={{
                            short: 'pt',
                        }}
                    >
                        <CountryPhoneInput size="small" placeholder={text.form.phone.placeholder} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>

                <Col xs={24} md={12}>
                    <Form.Item name="date" rules={rules.date}>
                        <Calendar
                            fullscreen={false}
                            onSelect={handleDateChange}
                            disabledDate={(currentDate) => {
                                return currentDate && (
                                    (currentDate < moment())
                                    || (currentDate.isoWeekday() > 6)
                                    || (calendarMetadata.disabled.includes(moment(currentDate).format("YYYY-MM-DD"))));
                            }}
                            headerRender={({ value, onChange }) => {
                                const currentDate = moment();
                                const currentYear = currentDate.year();
                                const currentMonth = currentDate.month();
                                const monthOptions = [];
                                const month = value.month();
                                const year = value.year();

                                const current = value.clone();
                                const localeData = value.localeData();
                                const months = [];

                                for (let i = 0; i < 12; i++) {
                                    current.month(i);
                                    months.push(localeData.monthsShort(current));
                                }

                                for (let index = 0; index < 12; index++) {
                                    monthOptions.push(
                                        <Select.Option style={{ width: "100px" }} key={index}>
                                            {months[index]}
                                        </Select.Option>,
                                    );
                                }

                                const options = [];
                                for (let i = currentYear; i < year + 2; i += 1) {
                                    options.push(
                                        <Select.Option key={i} value={i}>
                                            {i}
                                        </Select.Option>,
                                    );
                                }
                                return (
                                    <div style={{ padding: 8 }}>
                                        <Row gutter={8}>
                                            <Col>
                                                <Select
                                                    style={{ width: "100px" }}
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    onChange={newYear => {
                                                        const now = value.clone().year(newYear);
                                                        onChange(now);
                                                    }}
                                                    value={String(year)}
                                                >
                                                    {options}
                                                </Select>
                                            </Col>
                                            <Col>
                                                <Select
                                                    style={{ width: "100px" }}
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    value={String(month)}
                                                    onChange={selectedMonth => {
                                                        const newValue = value.clone();
                                                        newValue.month(parseInt(selectedMonth, 10));
                                                        onChange(newValue);
                                                    }}
                                                >
                                                    {monthOptions}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="private" valuePropName="checked" initialValue={false}>
                        <Switch onChange={(value) => setPrivate(value)} checkedChildren={text.form.private.label} unCheckedChildren={text.form.private.label} />
                    </Form.Item>

                    <Form.Item name="address" label={text.form.address.label} rules={rules.address} >
                        <Input placeholder={text.form.address.placeholder} />
                    </Form.Item>

                    <Form.Item name="people" label={text.form.people.label} >
                        <CustomSlider onChange={(value) => setPeople(value)} min={4} max={currentLimit} />
                    </Form.Item>

                    <Row type="flex" justify="center">
                        <Time>
                            <h3>08:00am</h3>
                            <div>
                                <img src="/icon/user-alert.svg" alt="alert" />
                            </div>
                        </Time>
                    </Row>
                </Col>
            </Row>
            {
                data.activity_id && data.activity_id == 1 ? <PersonFormContainer type="flex" justify="space-around">
                    <Form.List name="person">
                        {() => (
                            <Fragment>
                                {[...Array(people)].map((p, index) =>
                                    <Form.List key={index} name={index}>
                                        {() => (
                                            <PersonForm key={index}>

                                                <h1>Person {index + 1}</h1>
                                                <Form.Item name="birthday" rules={rules.bday}>
                                                    <DatePicker picker="month" placeholder={text.form.person.bday.placeholder} style={{ width: "100%" }} />
                                                </Form.Item>

                                                <Form.Item name="gender" rules={rules.gender}>
                                                    <Select placeholder={text.form.person.gender.placeholder}>
                                                        <Select.Option value="male">{text.form.gender[0]}</Select.Option>
                                                        <Select.Option value="female">{text.form.gender[1]}</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item name="height" rules={rules.height}>
                                                    <Select placeholder={text.form.person.height.placeholder}>
                                                        <Select.Option value="120">&lt; 120cm</Select.Option>
                                                        <Select.Option value="130">130cm</Select.Option>
                                                        <Select.Option value="140">140cm</Select.Option>
                                                        <Select.Option value="150">150cm</Select.Option>
                                                        <Select.Option value="160">160cm</Select.Option>
                                                        <Select.Option value="170">170cm</Select.Option>
                                                        <Select.Option value="180">180cm</Select.Option>
                                                        <Select.Option value="190">190cm</Select.Option>
                                                        <Select.Option value="200">200cm</Select.Option>
                                                        <Select.Option value="210">210cm</Select.Option>
                                                        <Select.Option value="Over 210">&gt; 210cm</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item name="weight" rules={rules.weight}>
                                                    <Select placeholder={text.form.person.weight.placeholder}>
                                                        <Select.Option value="Under 30kg">&lt; 30kg</Select.Option>
                                                        <Select.Option value="40kg">40kg</Select.Option>
                                                        <Select.Option value="50kg">50kg</Select.Option>
                                                        <Select.Option value="60kg">60kg</Select.Option>
                                                        <Select.Option value="70kg">70kg</Select.Option>
                                                        <Select.Option value="80kg">80kg</Select.Option>
                                                        <Select.Option value="90kg">90kg</Select.Option>
                                                        <Select.Option value="100kg">100kg</Select.Option>
                                                        <Select.Option value="110kg">110kg</Select.Option>
                                                        <Select.Option value="120kg">120kg</Select.Option>
                                                        <Select.Option value="Over 120kg">&gt; 120kg</Select.Option>
                                                    </Select>
                                                </Form.Item>
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
                                                    </Select>
                                                </Form.Item>

                                            </PersonForm>
                                        )}
                                    </Form.List>
                                )}
                            </Fragment>)}
                    </Form.List>
                </PersonFormContainer> :
                    <div>
                        <br></br>
                        <Form.Item name="notes" label={text.form.notes.label} rules={[{
                            required: data.id == 20,
                            message: 'Notes are required for an accurate budget',
                        }]} >
                            <TextArea rows={4} placeholder={text.form.notes.placeholder} />
                        </Form.Item>
                    </div>

            }



            <Row type="flex" justify="space-between" style={{ marginTop: "50px" }}>
                <PriceContainer>

                    <p>TOTAL: {data.price == 0 ? text.price : <span>{(priv ? data.private_price : data.price) * people}€</span>}</p>
                    <Disclaimer>
                        <p>All prices in euro (EUR €)</p>
                    </Disclaimer>
                </PriceContainer>

                <Checkout disabled={loading} onClick={handleSubmit}><span>{text.submit}</span> </Checkout>
            </Row>
        </ConfigProvider>
    )
}

export default People
