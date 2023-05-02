import { Calendar, Col, Radio, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react';
import moment from "moment";
import styled from "styled-components";
import { fetchDisabledDate } from '../../../redux/reservation/actions';
import { connect } from 'react-redux';

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

const Price = styled.p`
    text-align: right;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px 0px 20px 0px;
    box-sizing: border-box;

    span {
        font-size: 16px;
        opacity: .7;
    }
`;

const Header = styled.img`
    width: 100%;
`;

const CalendarContainer = (props) => {
    const { calendarMetadata, text } = props;

    useEffect(() => {
        props.fetchDisabledDate({ experience: 1 });
    }, []);

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    return (
        <Container>
            <Header src="/canyoning/1.webp" />
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
                        (currentDate < moment())
                        || (calendarMetadata.disabled.includes(moment(currentDate).format("YYYY-MM-DD"))));
                }}
                headerRender={({ value, type, onChange, onTypeChange }) => {
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
            <Price>€{text.price}<span> /{text.person}</span></Price>
        </Container>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);