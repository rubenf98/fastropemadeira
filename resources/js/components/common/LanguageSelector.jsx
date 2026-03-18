import React from "react";
import styled from "styled-components";
import { Select } from "antd";
import moment from "moment";
import { setLanguage } from "../../redux/application/actions";

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

function LanguageSelector(props) {
    const handleLanguageChange = (e) => {
        localStorage.setItem("language", e);
        document.cookie =
            "language=" +
            e +
            "; path=/; expires=" +
            moment().add(10, "y").format("ddd, D MMM YYYY, H:mm:ss") +
            " GMT";
        props.setLanguage(e);
    };
    return (
        <MenuContainer>
            <CustomSelect
                onChange={handleLanguageChange}
                value={props.language}
                bordered={false}
            >
                <Option value="en">English</Option>
                <Option value="pt">Português</Option>
                <Option value="fr">Français</Option>
                <Option value="de">Deutsch</Option>
            </CustomSelect>
        </MenuContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (language) => dispatch(setLanguage(language)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
