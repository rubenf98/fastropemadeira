import React from 'react'
import { Breadcrumb } from 'antd';
import styled from "styled-components";

const BreadcrumbText = styled.span`
    font-size: 1.4em;
`;

const Back = styled.img`
    width: 26px;
    cursor: pointer;
    margin: auto;
`;

function BackButton({ decrementStep, text }) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Back onClick={() => decrementStep()} src="/icon/back.svg" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <BreadcrumbText>{text}</BreadcrumbText>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BackButton
