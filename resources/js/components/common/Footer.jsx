import { Row } from 'antd';
import React from 'react'
import styled from "styled-components";
import moment from "moment";
import { dimensions, maxWidth } from '../../helper';
import {
    Link
} from "react-router-dom";

const Container = styled.section`
    width: 100%;
    min-height: 80vh;
    background: white;
    background: url("/images/footer_background.jpg");
    background-position: left top;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: flex-end;

    /* /* @media (max-width: ${dimensions.md}) {
        height: 400px;
    } */
    @media (max-width: ${dimensions.md}) {
        padding-top: 150px;
    }
`;

const Header = styled.div`
    width: 40%;
    
    h2, p {
        color: white;
        margin: 0px;
    }

    p {
        font-size: 20px;
    }

    h2 {
        margin-bottom: 20px;
        font-size: 26px;
    }

    div {
        display: flex;
        align-items: center;
        gap: 10px;

        img{
            width: 20px;

        }
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
        margin: 30px 0px;
    }

    @media (max-width: ${dimensions.sm}){
        margin: 20px 0px;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 50px 10px;
    box-sizing: border-box;
    max-width: ${maxWidth};
    margin: 0px auto;
    border-top: 1px solid white;

    @media (max-width: ${dimensions.md}){
        flex-wrap: wrap;
        border: 0px;

    }
    
`;

const LinkContainer = styled.div`
    width: 20%;
    

    h3 {
        font-size: 24px;
        color: white;
        margin-bottom: 20px;
    }

    a, p {
        display: block;
        font-size: 20px;
        color: white;
        font-weight: 100;
        margin: 5px 0px;
    }

    @media (max-width: ${dimensions.md}){
        width: ${props => props.fullWidth ? "100%" : "50%"};
        margin: 30px 0px;
    }


    @media (max-width: ${dimensions.sm}){
        width: 100%;
        margin: 20px 0px;
    }
`;


function Footer() {
    return (
        <Container>
            <Content>
                <Header>
                    <p>Copyright ©{moment().year()}</p>
                    <h2>Fast Rope Madeira</h2>
                    <div type="flex" align="middle">
                        <a href="https://www.facebook.com/madeira.fastrope" target="_blank" >
                            <img loading="lazy" src="/icon/company/facebook.png" alt="facebook" />
                        </a>
                        <a href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank" >
                            <img loading="lazy" src="/icon/company/whatsapp.svg" alt="whatsapp" />
                        </a>
                        <a href="https://www.instagram.com/fastrope_madeira/" target="_blank" >
                            <img loading="lazy" src="/icon/company/instagram.svg" alt="instagram" />
                        </a>
                    </div>
                </Header>

                <LinkContainer>

                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </LinkContainer>
                <LinkContainer>

                    <h3>Services</h3>
                    <Link to="/">Livro de reclamações</Link>
                    <p>RNTA549/2021</p>
                </LinkContainer>
                <LinkContainer fullWidth>
                    <h3>Contacts</h3>
                    <p>Restaurante Tricolore, Estrada Monumental, 9000-096 Funchal</p>
                    <p>(351) 933 933 452</p>
                    <p>info@fastropemadeira.com</p>
                </LinkContainer>


            </Content>
        </Container>
    )
}

export default Footer
