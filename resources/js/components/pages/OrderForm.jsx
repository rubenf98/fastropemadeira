import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import styled from "styled-components";
import moment from 'moment';
import Location from './Form/Location';
import People from './Form/People';
import { dimensions } from "../../helper";
import axios from "axios";
import CalendarContainer from './Form/CalendarContainer';
import { setFormFields, setFormVisibility } from '../../redux/form/actions';
import { connect } from 'react-redux';

const Content = styled.div`


    @media (max-width: ${dimensions.md}) {
        padding: 15px;
    }

    @media (max-width: ${dimensions.sm}) {
        padding: 5px;
    }

`;

const ModalContainer = styled(Modal)`
    .ant-modal-content {
        border-radius: 8px;
        background-color: #fbfbfb;
    }
`;

const OrderForm = ({ visible, setFormFields, fields, onCreate, setFormVisibility }) => {
    const [step, setStep] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [form] = Form.useForm();
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/form");

    const stepItems = [
        <CalendarContainer text={text} incrementStep={incrementStep} />,
        <Location text={text} decrementStep={decrementStep} incrementStep={incrementStep} />,
        <People loading={loadingSubmit} form={form} text={text} decrementStep={decrementStep} incrementStep={incrementStep} />
    ]

    useEffect(() => {
        console.log(fields);
        if (!visible) {
            setFormFields({ people: 3, date: moment().add(2, 'day'), experience: {} })
        } else if (fields.people && fields.date && fields.experience.id) {
            setStep(2);
        }
    }, [visible])


    function incrementStep() {
        if (step < 2) setStep(step + 1);
        else submitForm();
    };

    function decrementStep() {
        if (step > 0) setStep(step - 1);
        form.setFieldsValue({ date: undefined })
    };

    function submitForm() {
        setLoadingSubmit(true);
        var data = form.getFieldsValue();
        if (data.person) {
            data.person = data.person.slice(0, data.people);
        }
        axios.post(`${window.location.origin}/api/reservation`, { ...data, experience_id: fields.experience.id, date: moment(fields.date).format('YYYY-MM-DD') }).then((response) => {
            setLoadingSubmit(false);
            openNotification("Reservation success", ["Reservation has been confirmed, check your email for details"], "success");
            handleClose();
        }).catch((error) => {
            setLoadingSubmit(false);
            let messages = [];

            Object.values(error.response.data.errors).map(function (message) {
                messages.push(message[0]);
            });

            openNotification("Reservation failed", messages, "error");
        });
    };

    function handleClose() {
        setStep(0);
        form.resetFields();
        setFormVisibility(false);
    };

    const openNotification = (title, messages, type) => {
        notification[type]({
            message: title,
            description: (
                <Fragment>
                    {
                        messages.map((description, index) => (
                            <p key={index}>{description}</p>
                        ))
                    }
                </Fragment>)

        });
    };

    return (
        <ModalContainer
            visible={visible}
            width={720}
            style={{ top: 50 }}
            okText="Next"
            footer={null}
            maskClosable={false}
            cancelText="Cancel"
            onCancel={handleClose}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        //
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="order"
                requiredMark={false}
                initialValues={{
                    people: 2,
                }}
            >
                <Content>
                    {stepItems[step]}
                </Content>
            </Form>
        </ModalContainer>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
        setFormFields: (data) => dispatch(setFormFields(data)),
    };
};
const mapStateToProps = (state) => {
    return {
        visible: state.form.visible,
        fields: state.form.fields,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);