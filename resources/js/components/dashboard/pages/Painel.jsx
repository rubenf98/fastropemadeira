import Row from "antd/es/row"
import Col from "antd/es/col"
import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { dimensions } from "../../../helper";

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 80px);
    background: rgb(245, 245, 245);
    flex: 1;

`;

const CardContent = styled.div`
    width: 33%;
    padding: 20px 20px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }

    div {
        background: white;
        text-align: center;
        min-width: 200px;
        border-radius: 6px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
        transition: .3s ease-in-out;
        padding: 25px;
        box-sizing: border-box;
        
        &:hover {
            transform: scale(1.01);
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
        }
    }

    img {
        width: 80%;
        margin: auto;
        display: block;
    }

    p {
        font-weight: bold;
        margin: 15px auto;
        font-size: 16px;
        color: #222222;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`;

const SubContainer = styled.div`
    max-width: 1270px;
    width: 90%;
    margin: auto;

    h1 {
        text-align:center;
        font-size: 2em;
        text-align: center;
        padding: 50px 0;
    }
`;

const Footer = styled.div`
    margin-top: 100px;
    img {
        width: 120px;
        margin: auto;
        display: block;
    }

    p {
        text-align: center;
        margin: 20px auto;
    }

`;


const CardContainer = ({ img, text, to }) => (
    <CardContent>
        <div>
            <Link to={to}>
                <img src={img} alt="iPhone icon" />
                <p className="card-text">{text}</p>
            </Link>
        </div>
    </CardContent>
);

class Painel extends Component {
    render() {
        return (
            <Container>
                <SubContainer>
                    <h1> Bem vindo de volta ao painel de controlo</h1>
                    <Content >

                        <CardContainer
                            img="/icon/dashboard/reservation.svg"
                            text="Listagem de reservas"
                            to="/painel/reservas"
                        />

                        <CardContainer
                            img="/icon/dashboard/feedback.svg"
                            text="Avaliações na plataforma"
                            to="/painel/avaliacao"
                        />

                        <CardContainer
                            img="/icon/dashboard/contact.svg"
                            text="Mensagens de clientes"
                            to="/painel/contacto"
                        />

                        <CardContainer
                            img="/icon/dashboard/block.svg"
                            text="Datas bloqueadas"
                            to="/painel/bloqueado"
                        />

                        <CardContainer
                            img="/icon/dashboard/experience.svg"
                            text="Experiências na plataforma"
                            to="/painel/experiencias"
                        />

                        <CardContainer
                            img="/icon/dashboard/partner.svg"
                            text="Parceiros na plataforma"
                            to="/painel/parceiros"
                        />


                    </Content>
                    <Footer>
                        <img src="/logo.svg" alt="logo" />
                        <p>© {moment().year()} Fast Rope Madeira. All Rights Reserved.</p>
                    </Footer>
                </SubContainer>
            </Container>
        );
    }
}

export default Painel;
