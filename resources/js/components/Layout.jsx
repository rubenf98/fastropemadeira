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
    bottom: 20px;
    right: 20px;
    width: 50px;
    background: ${colors.main};
    height: 50px;
    position: fixed;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 50px;

    img {
        width: 25px;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const Whatsapp = styled.a`
    bottom: 20px;
    right: 20px;
    width: 60px;
    background: ${colors.main};
    height: 60px;
    position: fixed;
    z-index: 11;
    color: white;
    font-size: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    transition: all .2 ease-in-out;
    border-radius: 70px;

    img {
        width: 35px;
    }

    &:hover {
        background: ${colors.mainHover};
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
