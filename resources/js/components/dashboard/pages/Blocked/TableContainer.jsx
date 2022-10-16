import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import { Button, DatePicker, Input, Space } from "antd";
import { colors } from "../../../../helper";

const Container = styled.div`
    width: 100%;
`;

const ActionButton = styled.div`
    float: right;
    cursor: pointer;
`;


function TableContainer({ loading, data, meta, handlePageChange, onDelete, setFilters }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
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
            <ActionButton>
                <DatePicker onChange={(e) => setFilters({ date: e ? moment(e).format("YYYY-MM-DD") : null })} />
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
