import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";

const Container = styled.div`
    width: 100%;
`;

function TableContainer({ loading, data, meta, handlePageChange }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Data',
            dataIndex: 'created_at',
            render: (date) => (<span>{moment(date).format('YYYY-MM-DD')}</span>),
        },
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Mensagem',
            dataIndex: 'message',
        },
    ];


    return (
        <Container>
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
