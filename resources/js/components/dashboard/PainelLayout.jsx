import React, { Component } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import NavBar from "./NavBar";
import Painel from "./pages/Painel";
import Reservations from "./pages/Reservations/Reservations";
import PrivateRoute from "./PrivateRoute";

const PageContainer = styled.div`
    margin: auto;
    display: flex;
    width: 100%;
    min-height:100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled(Switch)`
    flex: 1;
    background: rgb(245, 245, 245);
    
`;

const NavBarContainer = styled.div`
    height: 80px;
    
`;

export default class PainelLayout extends Component {
    render() {
        return (
            <PageContainer>
                <NavBarContainer><NavBar /></NavBarContainer>

                <Content>
                    <PrivateRoute path="/painel/reservas" component={Reservations} />
                    <PrivateRoute path="/painel" component={Painel} />
                </Content>

            </PageContainer>
        );
    }
}
