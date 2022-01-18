import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";

const Container = styled.div`
    width: 100%;
`;

const columns = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Cliente',
        dataIndex: 'name',
        render: (name, row) => (<span>{name} | {row.email} | {row.phone}</span>),
    },
    {
        title: 'Atividade',
        dataIndex: 'experience',
        render: (experience, row) => (<span>{row.activity.name.pt} ({experience.name.pt})</span>),
    },
    {
        title: 'Pessoas',
        dataIndex: 'people',
    },
    {
        title: 'Data',
        dataIndex: 'date',
    },
    {
        title: 'Preço',
        dataIndex: 'total',
        render: (total) => (<span>{total == 0 ? "Sob-Orçamento" : total}€</span>),
    },
];

export default function TableContainer({ loading, data, meta, handlePageChange, onRowClick }) {
    return (
        <Container>
            <Table
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={(aPage) => handlePageChange(aPage)}
                onRowClick={(aPage) => onRowClick(aPage)}
            />
        </Container>
    )
}

