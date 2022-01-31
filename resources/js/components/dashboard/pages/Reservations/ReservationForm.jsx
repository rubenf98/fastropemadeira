import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, InputNumber, Col, Input, Slider, Select, Cascader } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import axios from "axios";

const { Option } = Select;

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

const CustomSlider = styled(Slider)`
    width: 100%;
    &:hover, .ant-slider:hover {
        .ant-slider-track {
            background-color:#262b44;
        }
        .ant-slider-handle{
            border-color: #262b44;
        }
    }
    .ant-slider-track {
        background-color:rgb(52,60,94);
    }

    .ant-slider-handle{
        border-color: rgb(52,60,94);
    }
`;

const rules = {
    name: [
        {
            required: true,
            message: 'Please input the name of the reservation!',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please input a contact email!',
        },
        {
            type: "email",
        },
    ],
    date: [
        {
            required: true,
            message: 'Please input a valid date after tomorrow!',
        },
    ],
    price: [
        {
            required: true,
            message: 'Please input a valid price!',
        },
    ],
    source: [
        {
            required: true,
            message: 'Please input a valid reservation source!',
        },
    ],

};


class ReservationForm extends Component {
    formRef = React.createRef();

    state = {
        calendarMetadata: {},
        currentLimit: 15,
        people: 2,
        experiences: []
    }

    handleModalClose = () => {
        this.formRef.current.resetFields();
        this.setState({
            calendarMetadata: {},
        });
        this.props.handleModalClose();
    }

    handleDateChange = (value) => {
        var currentDate = moment(value).format("YYYY-MM-DD");
        if (this.state.calendarMetadata.dates[currentDate]) {
            this.setState({
                currentLimit: 15 - this.state.calendarMetadata.dates[currentDate]
            })
        } else {
            this.setState({
                currentLimit: 15
            })
        }
    }

    componentDidUpdate(prevProps) {
        var { visible } = this.props;
        if ((prevProps.visible != visible)) {
            axios.get(`${window.location.origin}/api/reservation/disabledDate`).then((response) => {
                this.setState({
                    calendarMetadata: response.data,
                });
            })

            axios.get(`${window.location.origin}/api/activity?language=pt`).then((response) => {
                this.setState({
                    experiences: response.data.data,
                });
            })


        }

    }

    onFinish = (values) => {
        values.date = moment(values.date).format("YYYY-MM-DD");

        this.props.createReservation(values);
        this.handleModalClose();
    };

    render() {
        var { calendarMetadata, currentLimit, experiences } = this.state;

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
                            layout="vertical"
                            initialValues={{
                                people: 2
                            }}
                        >
                            <Instruction>Crie uma reserva externa na plataforma </Instruction>
                            <Disclaimer>Ninguém irá ser notificado via email, serverá apenas para realizar a gestão de vagas</Disclaimer>
                            <Row gutter={32}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        label="Nome da reserva"
                                        rules={rules.name}
                                    >
                                        <Input placeholder="Nome de conatcto na reserva" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={rules.email}
                                    >
                                        <Input placeholder="Endereço de email" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="date"
                                        label="Data da reserva"
                                        rules={rules.date}
                                    >
                                        <DatePicker
                                            onChange={this.handleDateChange}
                                            style={{ width: "100%" }}
                                            disabledDate={(currentDate) => {
                                                return currentDate && (
                                                    (currentDate < moment())
                                                    || (calendarMetadata.disabled.includes(moment(currentDate).format("YYYY-MM-DD"))));
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="price"
                                        label="Preço"
                                        rules={rules.price}
                                    >
                                        <InputNumber placeholder="Valor total da reserva" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="source"
                                        label="Fonte externa"
                                        rules={rules.source}
                                    >
                                        <Select style={{ width: "100%" }} placeholder="Fonte externa da reserva">
                                            <Option value="tripadvisor">Tripadvisor</Option>
                                            <Option value="getyorguide">GetYourGuide</Option>
                                            <Option value="thisismadeiraisland">thisismadeiraisland</Option>
                                            <Option value="outro">
                                                Outro
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="experience" label="Número de participantes" >
                                        <Cascader
                                            size="large"
                                            expandTrigger="hover"
                                            options={experiences}
                                            placeholder="Experiência para a atividade"
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item name="people" label="Número de participantes" >
                                        <CustomSlider onChange={(value) => this.setState({ people: value })} min={2} max={currentLimit} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <ButtonContainer type="flex" justify="end">
                                <Button loading={this.props.loading} size="large" width="150px" type="primary" htmlType="submit">
                                    Criar Reserva
                                </Button>
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

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationForm);