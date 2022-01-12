import React, { Fragment, useState, useEffect } from 'react'
import { Row } from 'antd';
import styled from "styled-components";
import axios from 'axios';
import { dimensions } from '../../../helper';

const Element = styled.div`
    width: 48%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 500px;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	overflow: hidden;
    cursor: pointer;

    @media (max-width: ${dimensions.lg}) {
        width: 80%;
        margin: 20px auto;
    }

    @media (max-width: ${dimensions.md}) {
        width: 96%;
    }

    &:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

		img {
			transform: scale(1.25);
		}

		figcaption {
			bottom: 0;
		}
	}

    h1 {
        position: absolute;
		top: 50px;
		left: 20px;
		margin: 0;
		padding: 0;
		color: white;
		font-size: 60px;
		font-weight: 100;
		line-height: 1;
    }

`;

const Image = styled.img`
    height: 100%;
    transition: 0.25s;
`;

const CaptionContainer = styled.figcaption`
    position: absolute;
    bottom: -20%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 30px;
    background-color: #181b2ed7;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    color: white;
    line-height: 1;
    transition: 0.25s;

    @media (max-width: ${dimensions.sm}) {
        bottom: -25%;
    }

    @media (max-width: ${dimensions.xs}) {
        bottom: -30%;
    }

`;

const CaptionDescription = styled.p`
    font-size: 1.2em;
    
`;

const CaptionTitle = styled.h3`
    color: white;
    font-size: 1.4em;
    margin: 0 0 30px;
    padding: 0; 
`;



const PageDescription = styled(Row)`


    img {
        width: 20%;
        margin: 20px 0px 60px 0px;
        @media (max-width: ${dimensions.md}) {
            width: 60%;
            margin: 20px auto 60px auto;
        }
    }
    div {
        width: 40%;
        text-align: right;
        margin: 20px 0px 30px 0px;
        font-size: 1.2em; 

        @media (max-width: ${dimensions.md}) {
            width: 90%;
            text-align: center;
            margin: 20px auto 60px auto;
            font-size: 1.2em;
        }
    }
   
`;


function Activity({ incrementStep, text }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${window.location.origin}/api/activity?language=${localStorage.getItem('language')}`).then((response) => {
            setData(response.data.data);
        })
    }, [])

    return (
        <Fragment>
            <PageDescription type="flex" justify="space-between" align="middle">
                <img src="/logo.png" />
                <div>{text.instructions}</div>
            </PageDescription>

            <Row type="flex" justify="space-between">
                {data.map((element) => (
                    <Element key={element.value} onClick={() => incrementStep({ activity: element.value })} >
                        <Image src={element.image} />
                        <CaptionContainer  >
                            <CaptionTitle>{element.label}</CaptionTitle>
                            <CaptionDescription> {element.description}</CaptionDescription>
                        </CaptionContainer>
                    </Element>
                ))}
            </Row>
        </Fragment>
    )
}

export default Activity
