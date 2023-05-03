import React, { Component } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import styled from "styled-components";
import { withRouter } from "react-router";
import OrderForm from "./pages/OrderForm";
import { colors, dimensions } from "../helper";

const Container = styled.div`
    width: 100%;
    max-width: 3840px;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
`;

const OrderNow = styled.div`
    width: 40px;
    background: ${colors.main};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 50px;

    img {
        width: 20px;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const Icon = styled.a`
    width: 40px;
    background: ${colors.main};
    height: 40px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 40px;
    margin-top: 10px;

    img {
        width: 25px;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const HiddenButton = styled.div`
    display: ${props => props.visibleSmallScreen ? "none" : "flex"};
    flex-direction: column;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 11;

    @media (max-width: ${dimensions.md}) {
        display: ${props => props.visibleSmallScreen ? "flex" : "none"};
    }
`;


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisible: false,
        }
    }

    closeForm = () => {
        this.setState({
            formVisible: false,
        })
    };

    openForm = () => {
        this.setState({
            formVisible: true,
        })
    };



    render() {

        return (
            <Container>

                <OrderForm
                    visible={this.state.formVisible}
                    onCreate={this.closeForm}
                    onCancel={this.closeForm}
                />

                <HiddenButton>
                    <Icon href="mailto:info@fastropemadeira.com" target="_blank" >
                        <img src="/icon/company/mail.svg" alt="email" />
                    </Icon>
                    <Icon href="https://www.instagram.com/fastrope_madeira/" target="_blank" >
                        <img src="/icon/company/instagram.svg" alt="instagram" />
                    </Icon>
                    <Icon href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank" >
                        <img src="/icon/company/whatsapp.svg" alt="whatsapp" />
                    </Icon>
                </HiddenButton>
                <HiddenButton visibleSmallScreen>
                    <OrderNow onClick={this.openForm}>
                        <img src="/icon/order.svg" alt="order" />
                    </OrderNow>
                </HiddenButton>
                <Navbar onOrder={this.openForm} />

                {this.props.children}


                <Footer />
            </Container>
        );
    }
}

export default withRouter(Layout);
