import React, { Fragment, useState } from 'react'
import styled from "styled-components";
import { Row, Calendar, Col, Slider, Select } from 'antd';
import moment from "moment";
import BackButton from './BackButton';
import { colors, dimensions } from '../../../helper';
import { connect } from 'react-redux';
import { setFormFields } from '../../../redux/form/actions';

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
    border: 1px solid ${colors.mainOverlay};
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
        background: ${colors.main};
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
        background: ${colors.main};

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

function CalendarContainer(props) {
    const { text, fields } = props;
    const { people, date } = fields;

    return (
        <Container>
            <BackButton text={text.calendarBackButton} />

            <h3>{text.calendar.slider}</h3>
            <Select
                style={{ width: "100%", marginBottom: "30px" }}
                size='large'
                value={people} onChange={(value) => props.setFormFields({ ...fields, people: value })}
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



            <br />

            <h3>{text.calendar.calendar}</h3>
            <Calendar
                value={date}
                fullscreen={false}
                // dateCellRender={dateCellRender}
                onSelect={(value) => props.setFormFields({ ...fields, date: value })}
                disabledDate={(currentDate) => {
                    return currentDate && (
                        currentDate < moment().endOf('day')
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
const mapDispatchToProps = (dispatch) => {
    return {
        setFormFields: (data) => dispatch(setFormFields(data)),
    };
};
const mapStateToProps = (state) => {
    return {
        fields: state.form.fields,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);