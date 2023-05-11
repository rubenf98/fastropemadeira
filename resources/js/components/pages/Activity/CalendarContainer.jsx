import { Calendar, Col, Row, Select } from 'antd';
import React, { useState } from 'react';
import moment from "moment";
import styled from "styled-components";
import { colors } from '../../../helper';

const Container = styled.div`
    background-color: white;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,.3);
`;

const FlexContainer = styled.div`
    padding: 10px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Banner = styled(FlexContainer)`
    font-size: 16px;

    p {
        color: green;
        margin: 0px;

        svg {
            margin-right: 5px;
        }
    }

    .title {
        background-color: #202020;
        color: white;
        padding: 5px 10px;
        box-sizing: border-box;
        
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
    }
`;
const PeopleContainer = styled.div`
    padding: 0px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 20px;

    .ant-select-arrow {
        color: white;
    }

    .ant-select-selector {
        background-color: ${colors.main} !important;
        color: white;
    }
`;

const Price = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;    
    flex: 1;
    font-size: 16px;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    border-right: 1px solid #cecece;
    padding: 0px 10px;
    box-sizing: border-box;

    p {
        margin: 0px;
    }
    

    span {
        color: ${colors.main}
    }
`;
const Button = styled.button`
    box-sizing: border-box;
    cursor: pointer;
    margin: 10px 10px 20px 0px;
    background: ${colors.main};
    padding: 8px 20px;
    font-size: 16px;
    transition: .4s;
    font-weight: bold;
    color: white;
    border: 0px;

    &:hover {
        background: ${colors.mainHover};
    }
    
`;

const Header = styled.img`
    width: 100%;
`;

const CalendarContainer = (props) => {
    const { text } = props;
    const [date, setDate] = useState(moment().add(2, "day"))
    const [people, setPeople] = useState(2)

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <Container>
            <Header src={props.image} />
            <Banner>
                <div className='title'>{text.title}</div>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 14 14" width="14" height="14" id="icon-check" class="icon-check" ng-svg="icon-check">
                        <path d="M0,8.59l1.5-2,4,3.67L11.87,0,14,1.28,6,14Z"></path>
                    </svg>
                    {text.disclaimer}
                </p>
            </Banner>
            <Calendar
                fullscreen={false}
                disabledDate={(currentDate) => {
                    return currentDate && (
                        currentDate < moment().add(1, "day")
                    );
                }}
                value={date}
                onSelect={setDate}
                headerRender={({ value, _, onChange }) => {
                    const currentDate = moment();
                    const currentYear = currentDate.year();
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
                        <div>

                            <Row gutter={8}>
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

                            </Row>


                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
            <PeopleContainer>
                <Select
                    defaultValue="2"
                    value={people}
                    onChange={setPeople}
                    style={{
                        width: 60,
                    }}
                    options={[
                        {
                            value: 2,
                            label: '2',
                        },
                        {
                            value: 3,
                            label: '3',
                        },
                        {
                            value: 4,
                            label: '4',
                        },
                        {
                            value: 5,
                            label: '5',
                        },
                        {
                            value: 6,
                            label: '6',
                        },
                        {
                            value: 7,
                            label: '7',
                        },
                        {
                            value: 8,
                            label: '8',
                        },
                        {
                            value: 9,
                            label: '9',
                        },
                        {
                            value: 10,
                            label: '10',
                        },
                        {
                            value: 11,
                            label: '11',
                        },
                        {
                            value: 12,
                            label: '12',
                        },
                        {
                            value: 13,
                            label: '13',
                        },
                        {
                            value: 14,
                            label: '14',
                        },
                        {
                            value: 15,
                            label: '15',
                        },
                    ]}
                />
                <Price><p>{text.person}</p> <p><span>{text.price}€</span></p></Price>
            </PeopleContainer>

            <Row type="flex" justify='end'>
                <Button onClick={() => props.handleSelect({ date: date, people: people })}>Pesquisar</Button>
            </Row>
        </Container>
    );
};


export default CalendarContainer;