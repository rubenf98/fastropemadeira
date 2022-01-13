import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import styled from "styled-components";
import Activity from './Form/Activity';
import Location from './Form/Location';
import People from './Form/People';
import { dimensions } from "../../helper";
import axios from "axios";

const Content = styled.div`
    padding: 30px;

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

const OrderForm = ({ visible, onCreate, onCancel, activities = [], initForm = [0, 0] }) => {
    const [step, setStep] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [calendarMetadata, setCalendarMetadata] = useState({});
    const [form] = Form.useForm();
    const { text } = require('../../../assets/' + localStorage.getItem('language') + "/form");

    const stepItems = [
        <Activity text={text} incrementStep={incrementStep} data={activities.length ? activities : []} />,
        <Location text={text} getActivity={getActivity} decrementStep={decrementStep} incrementStep={incrementStep} updateForm={updateForm} />,
        <People loading={loadingSubmit} form={form} text={text} decrementStep={decrementStep} calendarMetadata={calendarMetadata} getExperience={getExperience} incrementStep={incrementStep} updateForm={updateForm} />
    ]

    function incrementStep(formValues) {
        updateForm(formValues);
        if (step < 2) setStep(step + 1);
        else submitForm();
    };

    function updateForm(formValues) {
        form.setFieldsValue({ ...formValues });
    };

    function getActivity() {
        return form.getFieldValue('activity');
    };

    function getExperience() {
        return form.getFieldValue('experience');
    };


    function decrementStep() {
        if (step > 0) setStep(step - 1);
    };

    function submitForm() {
        setLoadingSubmit(true);
        var data = form.getFieldValue();
        if (data.person) {
            data.person = data.person.slice(0, data.people);
        }
        data.experience_id = data.experience;
        axios.post(`${window.location.origin}/api/reservation`, data).then((response) => {
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
        axios.get(`${window.location.origin}/api/reservation/disabledDate`).then((response) => {
            setCalendarMetadata(response.data);
        })
    }, [])

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
            width={1200}
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
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="order"
                requiredMark={false}
                initialValues={{
                    people: 6,
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