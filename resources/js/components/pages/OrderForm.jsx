import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import styled from "styled-components";
import moment from 'moment';
import Location from './Form/Location';
import People from './Form/People';
import { dimensions } from "../../helper";
import axios from "axios";
import CalendarContainer from './Form/CalendarContainer';

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

const OrderForm = ({ visible, onCreate, onCancel, initForm = [0, 0] }) => {
    const [step, setStep] = useState(0);
    const [formContent, setFormContent] = useState({ people: 3, date: moment().add(2, 'day'), experience: {} });
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [form] = Form.useForm();
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/form");

    const stepItems = [
        <CalendarContainer text={text} incrementStep={incrementStep} formContent={formContent} setFormContent={setFormContent} />,
        <Location setFormContent={setFormContent} formContent={formContent} text={text} decrementStep={decrementStep} incrementStep={incrementStep} />,
        <People formContent={formContent} loading={loadingSubmit} form={form} text={text} decrementStep={decrementStep} incrementStep={incrementStep} />
    ]

    function incrementStep() {
        if (step < 2) setStep(step + 1);
        else submitForm();
    };

    function updateForm(formValues) {

        form.setFieldsValue(formValues);
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
        axios.post(`${window.location.origin}/api/reservation`, { ...data, experience_id: formContent.experience.id, date: moment(formContent.date).format('YYYY-MM-DD') }).then((response) => {
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
        onCancel();
    };

    useEffect(() => {
        if (initForm[1] > 0) {
            setStep(2);
            updateForm({ experience: initForm[1], activity: initForm[0] })
        };
    }, [initForm]);

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

export default OrderForm;