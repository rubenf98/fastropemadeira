import React, { useState, useEffect } from "react";
import Input from "antd/es/input"
import Cascader from "antd/es/cascader"
import DatePicker from "antd/es/date-picker"
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import FormContainer from "./FormContainer";
import { updateReservation, createExternalReservation } from "../../../../redux/reservation/actions";
import { fetchActivities } from "../../../../redux/activity/actions";
import { connect } from "react-redux";
import { colors } from "../../../../helper";
import ReservationForm from "./ReservationForm";

const { Search } = Input;

const Container = styled.div`
    width: 100%;
`;

const Indicator = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.background};
`;

const AddButton = styled.div`
    width: 80px;
    height: 40px;
    float: right;
    background: ${colors.main};
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background: ${colors.mainHover};
    }

    img {
        height: 100%;
        margin: auto;
        display: block;
    }
`;

function TableContainer({ activities, fetchActivities, loading, data, meta, handlePageChange, onRowClick, onDelete, updateReservation, setFilters, createExternalReservation }) {
    const [visibility, setVisibility] = useState(false);
    const [reservationVisibility, setReservationVisibility] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [input, setInput] = useState({ client: undefined, activity: undefined });

    useEffect(() => {
        fetchActivities({ language: "pt" });
    }, [])

    const columns = [
        {
            title: '',
            dataIndex: 'confirmation',
            render: (confirmation) => <Indicator background={confirmation != 0 ? "#008d09" : "#df0000"} />,
        },
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Fonte',
            dataIndex: 'source',
        },
        {
            title: 'Cliente',
            dataIndex: 'name',
            filterDropdown: () => (getFilter("client")),
            render: (name, row) => (<span>{name} | {row.email} | {row.phone}</span>),
        },
        {
            title: 'Atividade',
            dataIndex: 'experience',
            filterDropdown: () => (getCascader("activity")),
            render: (experience, row) => (<span>{row.activity.name.pt} ({experience.name.pt})</span>),
        },
        {
            title: 'Pessoas',
            dataIndex: 'people',
        },
        {
            title: 'Data',
            dataIndex: 'date',
            filterDropdown: () => (getDatePicker("date")),
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

    function handleFilterChange(field, value) {
        let newInput = input;
        newInput[field] = value;
        setInput(newInput);
    }

    function getDatePicker() {
        return (
            <div style={{ padding: 8 }}>
                <DatePicker
                    onChange={(value, date) => setFilters({ date: date })}
                    allowClear
                />
            </div>
        );
    }

    function getCascader() {
        return (
            <div style={{ padding: 8 }}>
                <Cascader
                    onChange={(value) => setFilters({ activity: value })}
                    size="large"
                    expandTrigger="hover"
                    options={activities}
                    allowClear
                />
            </div>
        );
    }

    function getFilter(field) {
        return (
            <div style={{ padding: 8 }}>
                <Search
                    onChange={(e) => handleFilterChange(field, e.target.value)}
                    onSearch={() => setFilters(input)}
                    placeholder="Pesquisa..."
                    allowClear
                    enterButton
                    size="large"
                />
            </div>
        );
    }


    return (
        <Container>
            <AddButton onClick={() => setReservationVisibility(true)}>
                <img src="/icon/add_white.svg" alt="add" />
            </AddButton>
            <Table
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={(aPage) => handlePageChange(aPage)}
                onRow={(record) => {
                    return {
                        onClick: () => onRowClick(record.id),
                    };
                }}
            />
            <FormContainer
                visible={visibility}
                record={currentRecord}
                handleModalClose={() => setVisibility(false)}
                updateReservation={updateReservation}
            />
            <ReservationForm
                visible={reservationVisibility}
                handleModalClose={() => setReservationVisibility(false)}
                createReservation={createExternalReservation}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExternalReservation: (data) => dispatch(createExternalReservation(data)),
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
        fetchActivities: (filters) => dispatch(fetchActivities(filters)),

    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.activity.loading,
        activities: state.activity.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
