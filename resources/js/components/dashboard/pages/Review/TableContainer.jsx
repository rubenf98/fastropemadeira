import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import { Avatar, Rate } from "antd";
import { colors } from "../../../../helper";

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

function TableContainer({ loading, data, meta, handlePageChange, setFormVisibility }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: '',
            dataIndex: 'image',
            render: (val) => <Avatar size="large" icon={<img src={val} />} />
        },

        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Ano',
            dataIndex: 'year',
        },

        {
            title: 'Avaliação',
            dataIndex: 'rating',
            render: (val) => <Rate disabled allowHalf defaultValue={val} />
        },

        {
            title: 'Comentário',
            dataIndex: 'comment',
            width: "40%",
        },
    ];


    return (
        <Container>
            <ActionButton onClick={() => setFormVisibility(true)}>
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

export default TableContainer;
