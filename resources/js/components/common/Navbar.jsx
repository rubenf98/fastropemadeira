import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { Select, Drawer } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { colors, dimensions, maxWidth } from "../../helper";
import AnimationContainer from "./AnimationContainer";

const Container = styled.div`
    height: 100px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 40px;
    box-sizing: border-box;
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 20;
    width: calc(100vw - 40px);
    transition: 0.5s ease-in-out;
`;

const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: auto;
    color: white;
    transition: 0.5s ease-in-out;
    flex: 1;
`;

const Logo = styled(Link)`
    height: 100%;

    margin: auto 0;
    display: block;
    opacity: ${(props) => (props.visible ? "1" : "0")};
    z-index: 20;
    transition: opacity 0.2s ease;

    img {
        height: 100%;
        max-width: 200px;
        object-fit: contain;
    }
`;

const Menu = styled.div`
    z-index: 20;
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: ${(props) => (props.visible ? "0px" : "10px")};

    @media (max-width: ${dimensions.md}) {
        display: flex;
        order: 2;
    }

    img {
        width: 50%;
        display: block;
        margin: auto;
    }
`;

const OrderButton = styled.div`
    z-index: 20;
    box-sizing: border-box;
    cursor: pointer;
    background: ${colors.main};
    border: 2px solid black;
    padding: 16px 18px;
    font-size: 16px;
    transition: 0.4s;
    margin-left: 15px;
    font-weight: bold;
    border-radius: 16px;
    text-transform: uppercase;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    &:hover {
        background: ${colors.mainHover};
    }
`;

const CustomSelect = styled(Select)`
    min-width: 60px;
    margin-right: 20px;
    margin-left: 15px;
    cursor: pointer;
    color: black;
    font-size: 1.2em;
    display: ${(props) => (props.visible ? "block" : "none")};

    @media (max-width: ${dimensions.xs}) {
        display: none;
    }

    @media (max-width: ${dimensions.md}) {
        order: 1;
    }

    .ant-select-selector {
        background: transparent !important;
        border-radius: 0px !important;
        border: 0px !important;
    }

    .ant-select-selection-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 20px;
    }
`;

const Option = styled(Select.Option)`
    img {
        width: 20px;
    }
`;

const DropdownIcon = styled.img`
    width: 10px !important;
    color: black;
`;

const CustomDrawer = styled(Drawer)`
    div {
        display: flex;
        align-items: center;
    }

    .ant-drawer-content {
        background: #ffffff;

        ul {
            list-style: none;
        }
    }
`;

const MenuLogo = styled.img`
    height: 100px;
    margin: auto;
    opacity: 1;
    display: block;
    margin-top: 40px;
`;

const NavbarLink = styled(Link)`
    color: #313131;
    display: block;
    text-align: center;
    font-size: 16px;
    text-transform: capitalize;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    padding: 29px 27px;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    &:hover {
        outline: none;
        transition-duration: 500ms;
        color: #000;
        div {
            width: 100%;
        }
    }

    div {
        width: 0px;
        height: 1px;
        background: #000;
        transition: 0.3s ease-in-out;
    }
`;

const MenuLink = styled(Link)`
    color: black !important;
    display: block;
    text-align: center;
    font-size: clamp(28px, 4vw, 40px);
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-family: "Caveat Brush", serif;

    &:hover {
        text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
            1px 1px 0 white;
    }
`;

function Navbar({ onOrder }) {
    const [hasShadow, setHasShadow] = useState(0);
    const [visible, setVisible] = useState(0);

    const onClose = () => {
        setVisible(0);
    };

    const showDrawer = () => {
        setVisible(1);
    };

    const handleLanguageChange = (e) => {
        localStorage.setItem("language", e);
        document.cookie =
            "language=" +
            e +
            "; path=/; expires=" +
            moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") +
            " GMT";
        //location.reload();
        let path = window.location.pathname.split("/");
        path.splice(0, 2);
        let newPath = "/" + e + "/" + path.join("/");
        window.location.href =
            window.location.protocol + "//" + window.location.host + newPath;
    };

    return (
        <div>
            <Container shadow={(visible ? 0 : 1) && hasShadow}>
                <Logo to="/" visible={visible ? 0 : 1}>
                    <img src="/logo_navbar.svg" alt="logo" />
                </Logo>

                <Content>
                    <NavbarLink to="/">
                        home <div />
                    </NavbarLink>
                    {/* <NavbarLink to="#activities">
                        ativities <div />
                    </NavbarLink> */}
                    <NavbarLink to="/about">
                        about <div />
                    </NavbarLink>
                    <NavbarLink to="/contact">
                        contact <div />
                    </NavbarLink>

                    <OrderButton onClick={onOrder}>
                        Book An Adventure
                    </OrderButton>
                    <Menu
                        visible={visible ? 0 : 1}
                        onClick={() => setVisible(visible ? 0 : 1)}
                    >
                        <img
                            src={visible ? "/icon/close.svg" : "/icon/menu.svg"}
                            alt="menu"
                        />
                    </Menu>
                    <CustomSelect
                        onChange={handleLanguageChange}
                        visible={visible ? 0 : 1}
                        defaultValue={localStorage.getItem("language")}
                        suffixIcon={
                            <DropdownIcon
                                src="/icon/down_black.svg"
                                alt="open"
                            />
                        }
                    >
                        <Option value="en"> EN</Option>
                        <Option value="pt"> PT</Option>
                        <Option value="fr"> FR</Option>
                        <Option value="de"> DE</Option>
                    </CustomSelect>
                </Content>
            </Container>

            <CustomDrawer
                style={{ zIndex: "15" }}
                placement="right"
                height={"100%"}
                width={"100%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >
                <div>
                    <ul style={{ padding: "0px" }}>
                        <li>
                            <MenuLink onClick={() => setVisible(0)} to="/">
                                home
                            </MenuLink>
                        </li>
                        <li>
                            <MenuLink onClick={() => setVisible(0)} to="/about">
                                about
                            </MenuLink>
                        </li>
                        <li>
                            <MenuLink
                                onClick={() => setVisible(0)}
                                to="/contact"
                            >
                                contact
                            </MenuLink>
                        </li>
                        <li>
                            <MenuLogo src="/logo.svg" alt="logo" />
                        </li>
                    </ul>
                </div>
            </CustomDrawer>
        </div>
    );
}

export default Navbar;
