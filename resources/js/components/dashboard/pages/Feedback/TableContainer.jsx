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
        },
        {
            title: 'Data',
            dataIndex: 'created_at',
            render: (date) => (<span>{moment(date).format('YYYY-MM-DD')}</span>),
        },
        {
            title: 'Avaliação',
            dataIndex: 'rating',
            render: (rating) => (<span>{rating}/5</span>),
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
