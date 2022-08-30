import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Input, Checkbox, Col } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { fetchExperiences } from "../../../../redux/experience/actions"

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
        var formData = this.formRef.current.getFieldsValue();
        var dates = [];
        console.log(formData);
        formData.dates.map((date) => {
            dates.push(moment(date).format("YYYY-MM-DD"));
        })

        formData = { ...formData, dates };
        console.log(formData);
        this.props.createReservation(formData);
        this.handleModalClose();
    };

    componentDidMount() {
        this.props.fetchExperiences();
    }

    render() {
        var { calendarMetadata } = this.props;

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
                                <RangePicker
                                    disabledDate={(currentDate) => {
                                        return currentDate && (
                                            (currentDate < moment())
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>

                            <Form.List name="experiences" >
                                {() => (
                                    <Row>
                                        {this.props.experiences.map((experience) => (
                                            <Col xs={12} sm={8} key={experience.id}>
                                                <Form.Item initialValue={true} name={experience.id} valuePropName="checked">
                                                    <Checkbox>{experience.name.pt}</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        ))}
                                    </Row>)}
                            </Form.List>

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
        calendarMetadata: state.reservation.calendarMetadata,
        experiences: state.experience.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExperiences: (page, filters) => dispatch(fetchExperiences(page, filters)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockReservationForm);