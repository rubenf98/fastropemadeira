import { Row, Button, Cascader } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { dimensions } from '../../../helper';

const Container = styled.div`
    width: 100%;
    min-height: 200px;
    padding: 32px;
    background: #14141e;

    


    @media (max-width: ${dimensions.sm}){
        padding: 16px;
    }
`;

const Title = styled.h1`
    color: white;
    text-transform: capitalize;
    text-align: center;
    margin: auto 20px;
`;

const Divider = styled.div`
    background: white;
    height: 1px;
    width: 20%;

    @media (max-width: ${dimensions.xs}){
        display:none;
    }
`;

const FormItem = styled(Cascader)`
    width: 80%;
    background-color: #414150 !important;
    color: #fff;
    border-radius: 4px !important;
    border: 0px !important;

    @media (max-width: ${dimensions.md}){
        margin: 10px auto;
        width: 100%;
    }

    .ant-cascader-input {
        color: #fff;
        border-radius: 4px !important;
        border: 0px !important;
    }

    
    .ant-cascader-picker-arrow > svg {
        color: white;
    }
`;


const FormContainer = styled(Row)`
    padding: 30px;
    width: 60%;
    margin: auto;

    @media (max-width: ${dimensions.lg}){
        width: 80%;
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }
`;

const Submit = styled(Button)`
    border-radius: 4px;
    height: 38px;
    padding: 0px 10px;
    border-color: #414150;
    background: #414150;
    margin-left: 15px;

    span {
        display: none;
        font-weight: bold;
    }
    

    @media (max-width: ${dimensions.md}){
        width: 100%;
        margin: 10px auto;

        span {
            display: inline-block;
        }
    }

    &:hover, &:focus {
        border-color: #414150;
        background: #414150;
    }

    img {
        height: 16px;
        display: inline-block;
        margin: auto;
    }
`;

function Reservation({ text, openForm }) {
    const [data, setData] = useState([])
    const [experience, setExperience] = useState(undefined)

    useEffect(() => {
        axios.get(`${window.location.origin}/api/activity?language=${localStorage.getItem('language')}`).then((response) => {
            setData(response.data.data);
        })
    }, [])


    return (
        <Container>
            <Row type="flex" justify="center" align="middle">
                <Divider />
                <Title>{text.reservation.title}</Title>
                <Divider />
            </Row>

            <FormContainer type="flex" align='middle' justify='center'>
                <FormItem
                    onChange={(value) => setExperience(value)}
                    size="large"
                    expandTrigger="hover"
                    options={data}
                    placeholder={text.reservation.formItem}
                    allowClear={false}
                />
                <Submit type="primary" onClick={() => openForm(experience)}>
                    <span>{text.reservation.submit}</span>

                    <img src="/icon/arrow_right.svg" alt="submit" />
                </Submit>
            </FormContainer>



        </Container>
    )
}

export default Reservation
