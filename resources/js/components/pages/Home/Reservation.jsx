import { Row, Button, Cascader } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { dimensions } from '../../../helper';
import AnimationContainer from '../../common/AnimationContainer';

const Container = styled.div`
    width: 100%;
    min-height: 200px;
    padding: 32px;

    @media (max-width: ${dimensions.sm}){
        padding: 0px 20px;
    }
`;

const FormItem = styled(Cascader)`
    width: 100%;
    color: #707070;
    border: 0px !important;
    padding: 20px 30px;
    margin-top: 80px;

    @media (max-width: ${dimensions.md}){
        margin-top: 50px;
        width: 100%;
        padding: 10px 15px;
    }

    .ant-cascader-input {
        color: #707070;
        border: 0px !important;
        font-weight: bold;
    }

    
    .ant-cascader-picker-arrow > svg {
        color: #707070;
    }
`;


const FormContainer = styled(Row)`
    
    width: 80%;
    margin: auto;

    @media (max-width: ${dimensions.lg}){
        width: 80%;
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }
`;

function Reservation({ text, openForm, delaySize }) {
    const [data, setData] = useState([])
    const [experience, setExperience] = useState(undefined)

    useEffect(() => {
        axios.get(`${window.location.origin}/api/activity?language=${localStorage.getItem('language')}`).then((response) => {
            setData(response.data.data);
        })
    }, [])


    return (
        <Container>
            <AnimationContainer delay={delaySize} animation="fadeIn">
                <FormContainer type="flex" align='middle' justify='center'>

                    <FormItem
                        onChange={(value) => openForm(value)}
                        size="large"
                        expandTrigger="hover"
                        options={data}
                        placeholder={text.reservation.formItem}
                        allowClear={false}
                    />

                </FormContainer>
            </AnimationContainer>
        </Container>
    )
}

export default Reservation
