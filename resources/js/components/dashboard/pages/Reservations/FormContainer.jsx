import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Input, DatePicker, Button, InputNumber, Col } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import axios from "axios";


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


class FormContainer extends Component {
    formRef = React.createRef();

    state = {
        calendarMetadata: {},
    }

    handleModalClose = () => {
        this.formRef.current.resetFields();
        this.setState({
            calendarMetadata: {},
        });
        this.props.handleModalClose();
    }

    componentDidUpdate(prevProps) {
        var { visible, record } = this.props;
        if ((prevProps.visible != visible)) {
            axios.get(`${window.location.origin}/api/reservation/disabledDate?people=${this.props.record.people}`).then((response) => {
                this.setState({
                    calendarMetadata: response.data,
                });
                this.formRef.current.setFieldsValue({
                    date: moment(record.date),
                    price: record.price == 0 ? undefined : record.price,
                });
            })
        }

    }

    onFinish = (values) => {
        values.date = moment(values.date).format("YYYY-MM-DD");

        this.props.updateReservation(this.props.record.id, values).then(() => {
            this.handleModalClose();
        });
    };

    render() {
        var { calendarMetadata } = this.state;

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
                            name="basic"
                            onFinish={this.onFinish}
                        >
                            <Instruction>Altere a data ou preço da reserva consoante as suas necessidades </Instruction>
                            <Disclaimer>Clientes irão ser notificados via email sobre os campos modificados</Disclaimer>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="date"
                                        label="Data da reserva"
                                    >
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            disabledDate={(currentDate) => {
                                                return currentDate && (
                                                    (currentDate < moment())
                                                    || (currentDate.isoWeekday() > 6)
                                                    || (calendarMetadata.disabled.includes(moment(currentDate).format("YYYY-MM-DD"))));
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="price"
                                        label="Preço"
                                    >
                                        <InputNumber placeholder="Reserva sem orçamento atribuído" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <ButtonContainer type="flex" justify="end">
                                <Button loading={this.props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                    Atualizar Reserva
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
)(FormContainer);