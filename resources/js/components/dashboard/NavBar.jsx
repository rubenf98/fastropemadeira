import React, { Component } from "react";
import styled from "styled-components";
import { dimensions, colors } from "../../helper";
import Row from "antd/es/row"
import { NavLink } from "react-router-dom";

const Container = styled(Row)`
    width: 100%;
    height: 80px;
`;

const NavBarContainer = styled(Row)`
    width: 60%;
    text-transform: uppercase;
    margin: auto;

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }
`;

const TabList = styled.ul`
    text-align: center;
    margin: 0 auto;
    display: block;
    padding: 0;

    li {
        display: inline-block;
        :last-child {
            div::after {
                content: "";
            }
        }
    }

    .link--active{
        color: black;
        font-weight: bold;
        ::before {
            width: 105%;
        }
    }
`;

const LinkWithSeparator = styled(NavLink)`
    text-decoration: none;
    font-size: 1.2em;
    display: inline-block;
    padding: 0 10px;
    margin: auto 5px;
    position: relative;
    color: ${colors.gray};
    cursor: pointer;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    border-bottom: 6px solid white;
    margin: 0 20px;
    text-transform: uppercase;
    font-size: 1em;


    &:hover {
        color: black;
        ::before {
            width: 105%;
        }
    }

    @media (max-width: ${dimensions.sm}){
        font-size: .9em;
        margin: 0 10px;
    }

    ::before {
        position: absolute;
        margin-left: -5px;
        content: "";
        width: ${(props) => (props.active ? "105%" : 0)};
        height: 8px;
        left: 0;
        bottom: 0px;
        background: ${colors.mainOverlay};
        z-index: -1;
        transition: 0.3s;
    }

    ::after {
        position: absolute;
        content: "•";
        color: #b7b7b7;
        right: -25px;

        @media (max-width: ${dimensions.sm}){
            right: -15px;
        }
    }

    :last-child {
        ::after {
        content: "";
        }
    }
`;

class NavBar extends Component {
    render() {
        const NavBarItem = ({ item, name }) => (
            <LinkWithSeparator activeClassName="link--active" to={"/painel/" + item} >
                {name}
            </LinkWithSeparator>
        )

        return (
            <Container type="flex" justify="center" align="middle">
                <NavBarContainer type="flex" justify="space-around" align="middle">

                    <TabList>
                        <li>
                            <NavBarItem item="reservas" name="reservas" />
                            <NavBarItem item="avaliacao" name="avaliações" />
                            <NavBarItem item="contacto" name="contacto" />
                        </li>
                    </TabList>

                </NavBarContainer>
            </Container>
        );
    }
}

export default NavBar;
