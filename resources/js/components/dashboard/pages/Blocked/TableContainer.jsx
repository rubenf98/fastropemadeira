import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";

const Container = styled.div`
    width: 100%;
`;

function TableContainer({ loading, data, meta, handlePageChange, onDelete }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Data bloqueada',
            dataIndex: 'date',
        },
        {
            title: 'Bloqueado no dia ',
            dataIndex: 'created_at',
            render: (date) => (<span>{moment(date).format('YYYY-MM-DD')}</span>),
        },
        {
            title: 'Atividade',
            dataIndex: 'experience',
            render: (experience) => experience.name ? experience.name : "Todas",
        },
        {
            title: 'Desbloquear',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)}
                    />
                </StopPropagation>
            ),
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
