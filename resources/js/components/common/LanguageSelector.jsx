import React from 'react'
import styled from "styled-components";
import { Select } from 'antd';
import moment from 'moment';

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CustomSelect = styled(Select)`
    min-width: 60px;
    cursor: pointer;
    color: #292929;
    font-size: 1.1em;
`;

const DropdownIcon = styled.img`
    width: 10px !important;
`;

function LanguageSelector() {

    const handleLanguageChange = (e) => {
        localStorage.setItem("language", e);
        document.cookie = "language=" + e + "; path=/; expires=" + moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") + " GMT";
        //location.reload();
        let path = window.location.pathname.split('/');
        path.splice(0, 2);
        let newPath = "/" + e + "/" + path.join("/");
        window.location.href = window.location.protocol + "//" + window.location.host + newPath;

    };
    return (
        <MenuContainer>
            <CustomSelect
                onChange={handleLanguageChange}
                defaultValue={localStorage.getItem("language")}
                bordered={false}
            >
                <Option value="en">English</Option>
                <Option value="pt">Português</Option>
                <Option value="fr">Français</Option>
                <Option value="de">Deutsch</Option>
            </CustomSelect>
        </MenuContainer>
    )
}

export default LanguageSelector
