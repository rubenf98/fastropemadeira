import React, { Component } from "react";
import { Switch } from "react-router";
import styled from "styled-components";
import NavBar from "./NavBar";
import Contact from "./pages/Contact/Contact";
import Feedback from "./pages/Feedback/Feedback";
import Painel from "./pages/Painel";
import Reservations from "./pages/Reservations/Reservations";
import PrivateRoute from "./PrivateRoute";
import { dimensions } from "../../helper";
import Blocked from "./pages/Blocked/Blocked";
import Experience from "./pages/Experience/Experience";
import Review from "./pages/Review/Review";

const PageContainer = styled.div`
    margin: auto;
    display: flex;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentContainer = styled.div`

    //
    
`;

const Content = styled(Switch)`
    flex: 1;
    background: rgb(245, 245, 245);
    display: none;    
`;

const NavBarContainer = styled.div`
    height: 80px;
`;

export default class PainelLayout extends Component {
    render() {
        return (
            <PageContainer>
                <NavBarContainer><NavBar /></NavBarContainer>
                <ContentContainer>
                    <Content>
                        <PrivateRoute path="/painel/review" component={Review} />
                        <PrivateRoute path="/painel/contacto" component={Contact} />
                        <PrivateRoute path="/painel/avaliacao" component={Feedback} />
                        <PrivateRoute path="/painel/reservas" component={Reservations} />
                        <PrivateRoute path="/painel/experiencias" component={Experience} />
                        <PrivateRoute path="/painel/bloqueado" component={Blocked} />
                        <PrivateRoute path="/painel" component={Painel} />
                    </Content>
                </ContentContainer>
            </PageContainer>
        );
    }
}
