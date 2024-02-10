import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Input, Button, Col } from 'antd';
import { connect } from "react-redux";



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
        this.props.resetCurrentPartner();
    }

    onFinish = (values) => {
        if (this.props.edit) {
            this.props.updatePartner(this.props.record.id, values).then(() => {
                this.formRef.current.resetFields();
                this.handleModalClose();
                this.props.resetCurrentPartner();
            });
        } else {
            this.props.createPartner(values).then(() => {
                this.formRef.current.resetFields();
                this.handleModalClose();
                this.props.resetCurrentPartner();
            });
        }

    };

    componentDidUpdate(prevProps) {
        if (prevProps.visible != this.props.visible) {
            if (this.props.visible) {
                if (this.props.edit) {
                    this.formRef.current.setFieldsValue({
                        name: this.props.record.name,
                        url: this.props.record.url
                    })
                } else {
                    this.formRef.current.setFieldsValue({
                        name: undefined,
                        url: undefined
                    })
                }
            } else {
                this.formRef.current.setFieldsValue({
                    name: undefined,
                    url: undefined
                })
            }
        }

    }

    render() {
        var { record, edit } = this.props;

        return (
            <Container>
                <div>
                    <Modal
                        width={500}
                        onCancel={this.handleModalClose}
                        visible={this.props.visible}
                        footer={null}
                    >
                        <Instruction>{edit ? "Atualize a informação do parceiro" : "Crie um novo parceiro"} </Instruction>
                        <Form
                            ref={this.formRef}
                            name="basic"
                            onFinish={this.onFinish}
                            layout="vertical"
                        >
                            <Row gutter={16}>

                                <Col xs={24} md={24}>
                                    <Form.Item
                                        name="name"
                                        label="Nome"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Titulo do parceiro (Ex.: Fast Rope Madeira)" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        name="url"
                                        label="Palavra que irá ser utilizada para gerar o url"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Url / Link (Ex.: fastrope)" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <ButtonContainer type="flex" justify="end">
                                <Button loading={this.props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                    {edit ? "Atualizar" : "Criar"} parceiro
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