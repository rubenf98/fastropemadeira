import React, { useState } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import FormContainer from "./FormContainer";
import { updateExperience } from "../../../../redux/experience/actions";
import { connect } from "react-redux";

const Container = styled.div`
    width: 100%;
`;

function TableContainer({ loading, data, meta, handlePageChange, updateExperience }) {
    const [visibility, setVisibility] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            render: (element) => element.pt,
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            render: (element) => element.pt,
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            render: (element) => element == 0 ? "Pendente Orçamento" : element,
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
        setVisibility(true);
        setCurrentRecord(record);
    };


    return (
        <Container>
            <FormContainer
                visible={visibility}
                record={currentRecord}
                handleModalClose={() => setVisibility(false)}
                updateExperience={updateExperience}
            />
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
        updateExperience: (id, data) => dispatch(updateExperience(id, data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.experience.loading,
        data: state.experience.data,
        meta: state.experience.meta,
        current: state.experience.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
