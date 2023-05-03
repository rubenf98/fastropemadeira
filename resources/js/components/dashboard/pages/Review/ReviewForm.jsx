import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Upload, Button, InputNumber, Col, Input } from 'antd';
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { createReview } from "../../../../redux/review/actions";

const { Dragger } = Upload;

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


const rules = {
    required: [
        {
            required: true,
            message: 'Campo é obrigatório',
        },
    ],
};

function ReviewForm(props) {
    const [file, setFile] = useState(undefined)
    const [form] = Form.useForm();

    const handleCancel = (values) => {
        form.resetFields();
        setFile(undefined);
        props.handleModalClose();
    };

    const onFinish = (values) => {
        var formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        formData.append('name', values.name);
        formData.append('year', values.year);
        formData.append('comment', values.comment);
        formData.append('rating', values.rating);

        props.createReview(formData);
        handleCancel();
    };

    return (
        <Container>
            <div>
                <Modal
                    width={720}
                    onCancel={handleCancel}
                    visible={props.visible}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="review"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>Adicionar uma avaliação na plataforma </Instruction>

                        <Row gutter={32} type="flex" align="bottom">
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="name"
                                    label="Nome do cliente"
                                    rules={rules.required}
                                >
                                    <Input placeholder="Nome do cliente" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="year"
                                    label="Ano"
                                    rules={rules.required}
                                >
                                    <Input placeholder="Ano em que foi feita a avaliação" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="rating"
                                    label="Avaliação (min: 1.0; max:5.0)"
                                    rules={rules.required}
                                >
                                    <InputNumber style={{ width: "100%" }} min={1} max={5} placeholder="Endereço de email" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="comment"
                                    label="Comentário"
                                    rules={rules.required}
                                >
                                    <TextArea placeholder="Descrição realizada pelo cliente" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Dragger
                                    name='file'
                                    accept='.jpg,.jpeg,.png'
                                    onRemove={() => {
                                        setFile(undefined);
                                    }}
                                    multiple={false}
                                    showUploadList={false}
                                    onChange={(info) => {
                                        const { status } = info.file;
                                        if (status !== 'uploading') {
                                            console.log(info.file, info.fileList);
                                        }
                                        if (status === 'done') {
                                            console.log(`${info.file.name} file uploaded successfully.`);
                                        } else if (status === 'error') {
                                            console.log(`${info.file.name} file upload failed.`);
                                        }
                                    }}
                                    beforeUpload={(file) => {
                                        setFile(file);
                                        return false;
                                    }}
                                >
                                    <p className="ant-upload-text">Carregue ou arraste uma fotografia para esta área para submeter</p>
                                    <p className="ant-upload-hint">
                                        Suporte para uma imagem em formato jpeg ou png.

                                    </p>
                                </Dragger>
                            </Col>


                        </Row>
                        <ButtonContainer type="flex" justify="end">
                            <Button loading={props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                Criar avaliação
                            </Button>
                        </ButtonContainer>
                    </Form>

                </Modal>
            </div>
        </Container >
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        createReview: (data) => dispatch(createReview(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewForm);