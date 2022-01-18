import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Col, Modal, Row, Upload, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";


const ButtonContainer = styled(Row)`
    padding: 30px 0px 10px 0;
`;

const Container = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
`;
const Dragger = styled(Upload.Dragger)`
    img{
        margin: 20px auto;
    }
`;

const Instruction = styled.h2`
    margin: 20px 0;
    font-weight: bold;
    margin-top: 50px;
`;

const HiddenInput = styled(Form.Item)`
    display: none;
`;

const ImageContainer = styled.div`
    margin: 10px;
    padding: 5px;
    width: 120px;
    height: 120px;
    cursor: pointer;
    border-color: ${props => props.active ? "#626262" : "#6e6e6e"};
    border: ${props => props.active ? "1px solid" : "1px dashed"};

    &:hover{
        border: 1px solid #626262;

        div{
            filter: brightness(60%);
        }
    }

    div {
        width: 100%;
        height: 100%;
        background-image: url(${props => props.background});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        filter: ${props => + props.active ? "brightness(60%)" : "brightness(100%)"};
    }
`;

class FormContainer extends Component {
    formRef = React.createRef();

    state = {
        files: [],
        visible: false,
        active: { uid: null },
    };

    handleDrop = (files) => {
        let fileList = this.state.files;
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return;
            fileList.push(files[i].name);
        }
        this.setState({ files: fileList });
    };

    onFinish = (values) => {
        console.log('Success:', values);
    };

    handleModalClose = () => {
        this.setState({ visible: false, files: [] });
        this.formRef.current.resetFields();
    }

    handleImage = file => {
        getBase64(file, (image) => {
            return image;
        })
    }

    handleImageClick = aImage => {
        let { files } = this.state;
        let requestImages = [];

        files.map((file) => {
            if (file.file.uid != aImage.uid) {
                requestImages.push(file.file);
            }
        })

        this.formRef.current.setFieldsValue({
            cover: aImage,
            images: requestImages,
        })

        this.setState({
            active: aImage,
        })
    }

    onFinish = (values) => {
        let formData = new FormData();
        console.log(values);
        formData.append('client_id', values.client_id);
        formData.append('item_id', values.item_id);
        formData.append('date', moment(values.date).format("YYYY-MM-DD"));
        formData.append('cover', values.cover);
        for (var i = 0; i < values.images.length; i++) {
            formData.append('images[]', values.images[i]);
        }

        this.props.createPost(formData).then(() => {
            this.handleModalClose();
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { files, active } = this.state;

        return (
            <Container>
                <div>
                    <Modal
                        width={1000}
                        onCancel={this.handleModalClose}
                        visible={this.state.visible}
                        footer={null}
                    >

                        <Form
                            ref={this.formRef}
                            name="basic"
                            onFinish={this.onFinish}
                        >
                            <Instruction>Selecione a imagem de capa ao clicar na sua escolha</Instruction>
                            <HiddenInput name="cover" rules={[{ required: true, message: 'Selecione uma imagem de capa' }]}><Input /></HiddenInput>
                            <HiddenInput name="images"><Input /></HiddenInput>
                            <Row type="flex" align="space-around">
                                {files.map((element) => (
                                    <ImageContainer
                                        onClick={() => this.handleImageClick(element.file)}
                                        active={active.uid == element.file.uid}
                                        key={element.file.uid}
                                        background={element.image}
                                    >
                                        <div></div>
                                    </ImageContainer>
                                ))}
                            </Row>

                            <Instruction>Preencha os campos seguintes de acordo com as opcões, ou crie novas</Instruction>
                            <Row style={{ width: "90%", margin: "auto" }} gutter={16}>
                                <Col span={8}>
                                    <Form.Item
                                        name="item_id"
                                        rules={[{ required: true, message: 'Selecione um produto' }]}
                                    >
                                        <CategoryRemoteSelectContainer
                                            handleValueChange={(value) => this.formRef.current.setFieldsValue({ item_id: value[1] })}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="client_id"
                                        rules={[{ required: true, message: 'Selecione um cliente' }]}
                                    >
                                        <ClientRemoteSelectContainer />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="date"
                                        rules={[{ required: true, message: 'Selecione uma data' }]}
                                    >
                                        <CustomDatePicker size="large" picker="month" />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <ButtonContainer type="flex" justify="end">
                                <CustomButton width="150px" type="primary" htmlType="submit">
                                    Submit
                                </CustomButton>
                            </ButtonContainer>
                        </Form>

                    </Modal>
                </div>
            </Container >
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (data) => dispatch(createPost(data)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FormContainer);