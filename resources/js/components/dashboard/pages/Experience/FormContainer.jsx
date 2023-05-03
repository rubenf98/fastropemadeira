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

    handleModalClose = () => {
        this.formRef.current.resetFields();
        this.props.handleModalClose();
    }

    onFinish = (values) => {
        this.props.updateExperience(this.props.record.id, values).then(() => {
            this.formRef.current.resetFields();
            this.handleModalClose();
        });
    };

    render() {
        var { record } = this.props;

        return (
            <Container>
                <div>
                    <Modal
                        width={500}
                        onCancel={this.handleModalClose}
                        visible={this.props.visible}
                        footer={null}
                    >

                        <Form
                            ref={this.formRef}
                            name="basic"
                            onFinish={this.onFinish}
                            initialValues={{
                                price: record.price
                            }}
                        >
                            <Instruction>Altere o preço da experiência consoante as suas necessidades </Instruction>
                            <Disclaimer>Caso queira um campo "sob-orçamento", coloque o preço a 0 (zero)</Disclaimer>
                            <Row gutter={16}>

                                <Col span={24}>
                                    <Form.Item
                                        name="price"
                                        label="Preço"
                                        rules={[{ required: true }]}
                                    >
                                        <InputNumber placeholder="Reserva sem orçamento atribuído" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <ButtonContainer type="flex" justify="end">
                                <Button loading={this.props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                    Atualizar experiência
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