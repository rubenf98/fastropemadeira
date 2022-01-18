import React, { useState } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import FormContainer from "./FormContainer";
import { updateReservation } from "../../../../redux/reservation/actions";
import { connect } from "react-redux";

const Container = styled.div`
    width: 100%;
`;
function TableContainer({ loading, data, meta, handlePageChange, onRowClick, onDelete, updateReservation }) {
    const [visibility, setVisibility] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});

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
            dataIndex: 'price',
            render: (price) => (<span>{price == 0 ? "Sob-Orçamento" : price + "€"}</span>),
        },
        {
            title: "",
            key: "",
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)}
                        onUpdateClick={() => onUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    function onUpdateClick(record) {
        setVisibility(true);
        setCurrentRecord(record);
    };


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
            <FormContainer
                visible={visibility}
                record={currentRecord}
                handleModalClose={() => setVisibility(false)}
                updateReservation={updateReservation}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
    };
};

export default connect(null, mapDispatchToProps)(TableContainer);
