import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Calendar, Col, Slider, Select } from "antd";
import moment from "moment";
import BackButton from "./BackButton";
import { colors, dimensions } from "../../../helper";
import { connect } from "react-redux";
import { setFormFields } from "../../../redux/form/actions";
import { fetchBlockedDatesSelector } from "../../../redux/date/actions";

const Container = styled.div`
    a {
        color: white;
        text-decoration: none;
    }
`;

const Button = styled.button`
    box-sizing: border-box;
    cursor: pointer;
    margin: 20px 10px 10px 10px;
    background: ${colors.main};
    padding: 8px 20px;
    font-size: 16px;
    transition: 0.4s;
    font-weight: bold;
    color: white;
    border: 0px;

    &:hover {
        background: ${colors.mainHover};
    }
`;

function Checkout(props) {
    const [participants, setParticipants] = useState("");
    const { text, fields, formValues } = props;
    var message =
        "Hello,%20I%20would%20like%20to%20book%20the%20activity%20" +
        fields?.experience?.name?.en +
        "%20for%20" +
        fields.people +
        "%20participants%20on%20" +
        moment(fields.date).format("YYYY-MM-DD") +
        ".%0A%0AContact%20Person:%20" +
        formValues.name +
        "%20Email:%20" +
        formValues.email +
        "%20Phone:%20(+" +
        formValues?.phone?.code +
        ")%20" +
        formValues?.phone?.phone +
        "%0A%0AParticipants:%0A%0A";

    var regards = "Best%20Regards,%0A%0A" + formValues.name;

    useEffect(() => {
        if (formValues.person) {
            console.log(formValues, "formValues");
            var newParticipants = "";

            formValues.person.map((person, index) => {
                var newParticipant =
                    index +
                    ")%20" +
                    person.gender +
                    "%20|%20Birthday:%20" +
                    person.birthday +
                    "%20|%20Height:%20" +
                    person.height +
                    "%20cm%20|%20Weight:%20" +
                    person.weight +
                    "%20|%20Shoe%20Size:%20" +
                    person.shoe +
                    "%0A%0A";

                newParticipants = newParticipants + newParticipant;
            });

            setParticipants(newParticipants);
        }
    }, [formValues]);

    console.log(message);
    return (
        <Container>
            {text.checkout}
            <Row type="flex" justify="end" gutter={32}>
                <Button onClick={props.incrementStep}>
                    <span>{text.submit}</span>
                </Button>

                <Button>
                    <a
                        href={
                            "https://api.whatsapp.com/send?l=en&phone=351933933452&text=" +
                            message.replace(/ /g, "%20") +
                            participants.replace(/ /g, "%20") +
                            regards.replace(/ /g, "%20")
                        }
                        target="_blank"
                    >
                        {text.whatsapp}
                    </a>
                </Button>
            </Row>
        </Container>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        setFormFields: (data) => dispatch(setFormFields(data)),
        fetchBlockedDatesSelector: (filters) =>
            dispatch(fetchBlockedDatesSelector(filters)),
    };
};
const mapStateToProps = (state) => {
    return {
        fields: state.form.fields,
        blockedDates: state.date.selector,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
