import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import FormContainer from "./FormContainer";
import { connect } from "react-redux";
import { colors } from "../../../../helper";
import { message } from "antd";
import { resetCurrentPartner, createPartner, updatePartner } from "../../../../redux/partner/actions";

const Container = styled.div`
    width: 100%;
`;

const ActionButton = styled.div`
    width: 80px;
    height: 40px;
    float: right;
    background: ${colors.main};
    cursor: pointer;
    padding: 10px;

    &:hover {
        background: ${colors.mainHover};
    }

    &:nth-child(1){
        border-top-right-radius: 6px;
    }
    &:nth-child(2){
        border-top-left-radius: 6px;
    }

    img {
        height: 100%;
        margin: auto;
        display: block;
    }
`;

function TableContainer({ loading, data, meta, handlePageChange, updatePartner, resetCurrentPartner, createPartner }) {
    const [visibility, setVisibility] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [edit, setEdit] = useState(false)

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText("https://www.fastropemadeira.com/en?partnerUrl=" + url);
        message.info('Link copiado para o clipboard');
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Hiperligação',
            dataIndex: 'url',
            render: (url) => (<span onClick={() => copyToClipboard(url)} >
                {"https://www.fastropemadeira.com/en?partnerUrl=" + url}
            </span>),

        },
        {
            title: "",
            key: "",
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onUpdateClick={() => onUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    function onUpdateClick(record) {
        setEdit(true);
        setCurrentRecord(record);
        setVisibility(true);


    };

    function onCreateClick() {
        setEdit(false);
        setCurrentRecord({});
        setVisibility(true);

    };

    function handleModalClose() {
        setEdit(false);
        setCurrentRecord({});
        setVisibility(false);

    };

    return (
        <Container>
            <FormContainer
                visible={visibility}
                record={currentRecord}
                handleModalClose={handleModalClose}
                updatePartner={updatePartner}
                createPartner={createPartner}
                resetCurrentPartner={resetCurrentPartner}
                edit={edit}
            />
            <ActionButton onClick={onCreateClick}>
                <img src="/icon/add_white.svg" alt="add" />
            </ActionButton>
            <Table
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={(aPage) => handlePageChange(aPage)}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePartner: (id, data) => dispatch(updatePartner(id, data)),
        createPartner: (data) => dispatch(createPartner(data)),
        resetCurrentPartner: () => dispatch(resetCurrentPartner()),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.partner.loading,
        data: state.partner.data,
        meta: state.partner.meta,
        current: state.partner.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
