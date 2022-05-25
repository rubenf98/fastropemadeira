import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";

const { RangePicker } = DatePicker;


const ButtonContainer = styled(Row)`
    padding: 30px 0px 10px 0;
`;

const Container = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
`;

const Instruction = styled.h2`
    font-weight: bold;
    margin-top: 50px;
`;

const Disclaimer = styled.h3`
    color: #777;
    margin-bottom: 30px;
`;

const rules = {
    name: [
        {
            required: true,
            message: 'Selecione as datas que pretende bloquear',
        },
    ]
};


class BlockReservationForm extends Component {
    formRef = React.createRef();

    handleModalClose = () => {
        this.formRef.current.resetFields();
        this.props.handleModalClose();
    }

    onFinish = (values) => {
        var { dates } = this.formRef.current.getFieldsValue();

        dates.map((date) => {
            date = moment(values.dates).format("YYYY-MM-DD");
        })


        this.props.createReservation({ dates: dates });
        this.handleModalClose();
    };

    render() {

        return (
            <Container>
                <div>
                    <Modal
                        width={720}
                        onCancel={this.handleModalClose}
                        visible={this.props.visible}
                        footer={null}
                    >

                        <Form
                            ref={this.formRef}
                            name="blockreservation"
                            onFinish={this.onFinish}
                            layout="vertical"
                        >
                            <Instruction>Bloqueio de uma data ou um conjunto de datas</Instruction>
                            <Disclaimer>Ninguém irá ser notificado via email, servirá unicamente para gestão de vagas</Disclaimer>
                            <Form.Item
                                name="dates"
                                rules={rules.name}
                            >
                                <RangePicker style={{ width: "100%" }} />
                            </Form.Item>

                            <ButtonContainer type="flex" justify="end">
                                <Button loading={this.props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                    Bloquear Data(s)
                                </Button>
                            </ButtonContainer>
                        </Form>

                    </Modal>
                </div>
            </Container >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
    };
};

export default connect(
    mapStateToProps,
    null
)(BlockReservationForm);