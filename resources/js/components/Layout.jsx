import React, { Component } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import styled from "styled-components";
import { withRouter } from "react-router";
import OrderForm from "./pages/OrderForm";
import { dimensions } from "../helper";

const Container = styled.div`
    width: 100%;
    max-width: 3840px;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
`;


const OrderNow = styled.div`
   bottom: 80px;
    width: 75px;
    background: rgb(52,60,94);
    height: 70px;
    position: fixed;
    right: 0;
    z-index: 11;
    color: white;
    font-size: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    transition: .2 ease-in-out;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    img {
        width: 35px;
    }

    &:hover {
        background: #2b3252;
    }
`;

const Whatsapp = styled.a`
    bottom: 80px;
    width: 75px;
    background: rgb(52,60,94);
    height: 70px;
    position: fixed;
    right: 0;
    z-index: 11;
    color: white;
    font-size: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    transition: .2 ease-in-out;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    img {
        width: 35px;
    }

    &:hover {
        background: #2b3252;
    }
`;

const HiddenButton = styled.div`
   display: ${props => props.visibleSmallScreen ? "block" : "none"};

   @media (max-width: ${dimensions.sm}) {
    display: ${props => !props.visibleSmallScreen ? "block" : "none"};
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

                <HiddenButton visibleSmallScreen={true}>
                    <Whatsapp href="https://api.whatsapp.com/send?l=en&phone=351933933452" target="_blank" >
                        <img src="/icon/company/whatsapp.svg" alt="whatsapp" />
                    </Whatsapp>
                </HiddenButton>
                <HiddenButton visibleSmallScreen={false}>
                    <OrderNow onClick={this.openForm}>
                        <img src="/icon/order.svg" alt="order" />
                    </OrderNow>
                </HiddenButton>
                <Navbar onOrder={this.openForm} />

                <div> {this.props.children} </div>


                <Footer />
            </Container>
        );
    }
}

export default withRouter(Layout);
