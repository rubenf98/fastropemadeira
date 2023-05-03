import React, { Fragment, useState } from 'react'
import styled from "styled-components";
import { Row, Calendar, Col, Slider, Select } from 'antd';
import moment from "moment";
import BackButton from './BackButton';
import { colors, dimensions } from '../../../helper';

const Container = styled.div`
    /* .ant-picker-calendar-date-today {
        border: 0px;
    }

    .ant-picker-cell-selected .ant-picker-cell-inner {
        background-color: green !important;
    } */
`;

const Time = styled.div`
    min-height: 60px;
    border: 1px solid rgba(52,60,94, .3);
    padding: 16px 80px;
    box-sizing: border-box;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: middle;
    justify-content: center;
    transition: 0.3s;
    margin: 20px auto;

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

    p {
        font-weight: bold;
        margin: auto;
        font-size: 18px;
    }

    &:hover {
        background: rgb(52,60,94);

        div {
            border-top-right-radius: 6px;
        }

        p {
            color: white;
        }
    }
`;

const Button = styled.button`
    box-sizing: border-box;
    cursor: pointer;
    margin: 20px 0px 10px 0px;
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

const Cell = styled.div`
    width: 35px;
    height: 35px;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
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

function CalendarContainer(props) {
    const { text, formContent } = props;
    const { people, date } = formContent;


    const dateCellRender = (value) => {
        return (
            <Cell >{value.format('DD')}</Cell>
        );
    };

    return (
        <Container>
            <BackButton text={text.calendarBackButton} />

            <h3>{text.calendar.slider}</h3>
            <CustomSlider value={people} onChange={(value) => props.setFormContent({ ...formContent, people: value })} min={2} max={15} />

            <br />

            <h3>{text.calendar.calendar}</h3>
            <Calendar
                value={date}
                fullscreen={false}
                // dateCellRender={dateCellRender}
                onSelect={(value) => props.setFormContent({ ...formContent, date: value })}
                disabledDate={(currentDate) => {
                    return currentDate && (
                        currentDate < moment().add(1, "day")
                    );
                }}
                headerRender={({ value, onChange }) => {
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

            <Row type="flex" justify="center">
                <Time>
                    <p>08:00am</p>
                    <div>
                        <img src="/icon/user-alert.svg" alt="alert" />
                    </div>
                </Time>
            </Row>

            <Row type='flex' justify='end'>
                <Button onClick={props.incrementStep}>Next</Button>
            </Row>
        </Container>
    )
}

export default CalendarContainer;