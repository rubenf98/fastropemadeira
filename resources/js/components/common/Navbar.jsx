import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from "styled-components";
import { Select, Drawer } from 'antd';
import {
    Link
} from "react-router-dom";
import moment from 'moment';
import { dimensions } from '../../helper';

const Container = styled.div`
    height: 80px;
    background: ${props => props.hasbackground ? "#ffffff" : "transparent"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    z-index: 20;
    width: 100%;
    color: white;
    transition: .5s ease-in-out;
    box-shadow: ${props => props.shadow ? "0px 0px 30px 0px rgba(0,0,0,.3)" : "0px"};
`;

const Logo = styled(Link)`
    height: 80%;
    margin: auto 0;
    margin-left: 30px;
    display: block;
    opacity: ${props => props.visible ? "1" : "0"};

    img {
        height: 100%;
    }
`;


const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;

const Menu = styled.div`
    z-index: 20;
    box-sizing: border-box;
    height: 70px;
    width: 70px;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: ${props => props.visible ? "0px" : "10px"};

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
    background: rgb(52,60,94);
    padding: 12px 18px;
    border-radius: 0 0 0 12px;
    font-size: 1.2em;
    transition: .4s;
    margin-left: 15px;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    &:hover {
        background: #2b3252;
    }
    
`;

const CustomSelect = styled(Select)`
    min-width: 60px;
    margin-right: 20px;
    margin-left: 15px;
    cursor: pointer;
    color ${props => props.hasbackground ? "black" : "white"};
    font-size: 1.2em;
    display: ${props => props.visible ? "block" : "none"};

    @media (max-width: ${dimensions.xs}){
        display: none;
    }

    @media (max-width: ${dimensions.md}) {
        order: 1;
    }

    .ant-select-selector{
        background: transparent !important;
        border-radius: 0px !important;
        border: 0px !important;
    }

    .ant-select-selection-item{
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
        background: #ffffffe4;

        ul {
            list-style: none;
        }
    }
`;

const MenuLogo = styled.img`
    height: 70px;
    margin: auto;
    margin-top: 40px;
    opacity: 1;
    display: block;
`;

const NavbarLink = styled(Link)`
    color: ${props => props.hasbackground ? "#313131" : "#dddddd !important"};
    display: block;
    text-align: center;
    font-size: 1.2em;
    text-transform: capitalize;
    cursor: pointer;
    transition: .3s ease-in-out;
    padding: 29px 27px;
    font-weight: bold;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    &:hover {
        outline: none;
        transition-duration: 500ms;
        color: ${props => props.hasbackground ? "#000" : "#fff !important"};
        div {
            width: 100%;
        }
    }

    div {
        width: 0px;
        height: 1px;
        background: ${props => props.hasbackground ? "#000" : "#fff"};
        transition: .3s ease-in-out;
    }
    
`;


const MenuLink = styled(Link)`
    color: black !important;
    display: block;
    text-align: center;
    font-size: 3em;
    text-transform: uppercase;
    cursor: pointer;
    transition: .3s ease-in-out;
    font-family: 'Montserrat', sans-serif;

    &:hover {
        text-shadow:
        -1px -1px 0 white,
        1px -1px 0 white,
        -1px 1px 0 white,
        1px 1px 0 white;
    }
    
`;

function useEventListener(eventName, handler, element = window) {
    // Create a ref that stores handler
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = (event) => savedHandler.current(event);

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
}

function Navbar({ onOrder }) {
    const [hasBackground, setHasBackground] = useState(0);
    const [hasShadow, setHasShadow] = useState(false);
    const [visible, setVisible] = useState(0);

    const handler = useCallback(
        ({ }) => {
            if (window.location.pathname.length <= 4) {
                const currentScrollPos = window.pageYOffset;
                const visible = currentScrollPos > (window.innerHeight / 3);
                setHasBackground(visible ? 1 : 0);
                setHasShadow(visible);
            } else if (window.location.pathname.length > 4) {
                const currentScrollPos = window.pageYOffset;
                const visible = currentScrollPos > (window.innerHeight / 3);
                setHasShadow(visible);
            } else if (!hasBackground) {
                setHasBackground(1);
            };

        },
        [setHasBackground]
    );

    const onClose = () => {
        setVisible(0);
    };

    const showDrawer = () => {
        setVisible(1);
    };

    const handleLanguageChange = (e) => {
        localStorage.setItem("language", e);
        document.cookie = "language=" + e + "; path=/; expires=" + moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") + " GMT";
        //location.reload();
        let path = window.location.pathname.split('/');
        path.splice(0, 2);
        let newPath = "/" + e + "/" + path.join("/");
        window.location.href = window.location.protocol + "//" + window.location.host + newPath;

    };


    useEffect(() => {
        if (window.location.pathname.length > 4) {
            setHasBackground(1);
        }
    }, [])


    useEventListener("scroll", handler);
    return (
        <div>
            <Container hasbackground={(visible ? 0 : 1) && hasBackground} shadow={(visible ? 0 : 1) && hasShadow}>
                <Logo to="/" visible={(visible ? 0 : 1)}>
                    <img src={hasBackground ? "/logo.png" : "/logo_white.png"} alt="logo" />
                </Logo>

                <MenuContainer>
                    <NavbarLink hasbackground={hasBackground} to="/">home <div /></NavbarLink>
                    <NavbarLink hasbackground={hasBackground} onClick={() => setHasShadow(true)} to="/about">about <div /></NavbarLink>
                    <NavbarLink hasbackground={hasBackground} onClick={() => setHasShadow(true)} to="/contact">contact <div /></NavbarLink>

                    <OrderButton onClick={onOrder}>Book An Adventure</OrderButton>
                    <Menu visible={visible ? 0 : 1} onClick={() => setVisible(visible ? 0 : 1)}>
                        <img
                            src={visible ?
                                "/icon/close.svg" :
                                (hasBackground ? "/icon/menu.svg" : "/icon/menu_white.svg")
                            }
                            alt="menu"
                        />
                    </Menu>
                    <CustomSelect
                        hasbackground={hasBackground}
                        onChange={handleLanguageChange}
                        visible={(visible ? 0 : 1)}
                        defaultValue={localStorage.getItem("language")}
                        suffixIcon={
                            <DropdownIcon src={hasBackground ? "/icon/down_black.svg" : "/icon/down.svg"} alt="open" />
                        }
                    >
                        <Option value="en">  EN</Option>
                        <Option value="pt">  PT</Option>
                    </CustomSelect>
                </MenuContainer>
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
                        <li><MenuLink onClick={() => setVisible(0)} to="/">home</MenuLink></li>
                        <li><MenuLink onClick={() => setVisible(0)} to="/about">about</MenuLink></li>
                        <li><MenuLink onClick={() => setVisible(0)} to="/contact">contact</MenuLink></li>
                        <li>
                            <MenuLogo src="/logo.png" alt="logo" />
                        </li>
                    </ul>

                </div>
            </CustomDrawer>
        </div>
    )
}

export default Navbar
