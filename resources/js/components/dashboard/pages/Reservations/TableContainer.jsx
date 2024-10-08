import React, { useState, useEffect } from "react";
import Input from "antd/es/input"
import Cascader from "antd/es/cascader"
import DatePicker from "antd/es/date-picker"
import message from "antd/es/message"
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../RowOperation";
import StopPropagation from "../../StopPropagation";
import FormContainer from "./FormContainer";
import { updateReservation, createExternalReservation, blockReservationDate, fetchDisabledDate } from "../../../../redux/reservation/actions";
import { fetchActivities } from "../../../../redux/activity/actions";
import { connect } from "react-redux";
import { colors } from "../../../../helper";
import ReservationForm from "./ReservationForm";
import BlockReservationForm from "./BlockReservationForm";

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

function TableContainer({ activities, fetchActivities, loading, data, meta, handlePageChange, onRowClick, onDelete, updateReservation, setFilters, createExternalReservation, fetchDisabledDate }) {
    const [visibility, setVisibility] = useState(false);
    const [reservationVisibility, setReservationVisibility] = useState(false);
    const [blockVisibility, setBlockVisibility] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});
    const [input, setInput] = useState({ client: undefined, activity: undefined });

    useEffect(() => {
        fetchDisabledDate();
        fetchActivities({ language: "pt" });
    }, [])

    useEffect(() => {
        fetchDisabledDate();
    }, [visibility, blockVisibility])

    const columns = [
        {
            title: '',
            dataIndex: 'confirmation',
            fixed: 'left',
            width: 100,
            render: (confirmation) => <Indicator background={confirmation != 0 ? "#008d09" : "#df0000"} />,
        },
        {
            title: '#',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
        },
        {
            title: 'Fonte',
            dataIndex: 'source',
        },
        {
            title: 'Parceiro',
            dataIndex: 'partner',
            render: (partner) => partner?.id ? partner.name : "---",
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
            render: (experience, row) => row.activity ? (<span>{row.activity.name.pt} ({experience.name.pt})</span>) : "Atividade removida",
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

    function handleDateBlock(e) {
        try {
            blockReservationDate(e)
            message.success('Datas bloqueadas com sucesso.');
        } catch (error) {
            message.error('Ocorreu um erro no bloqueio das datas, cao o problema persista contacte o programador.');
        }

    }


    return (
        <Container>
            <ActionButton onClick={() => setReservationVisibility(true)}>
                <img src="/icon/add_white.svg" alt="add" />
            </ActionButton>
            <ActionButton onClick={() => setBlockVisibility(true)}>
                <img src="/icon/block_white.svg" alt="block" />
            </ActionButton>
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

            <BlockReservationForm
                visible={blockVisibility}
                handleModalClose={() => setBlockVisibility(false)}
                createReservation={handleDateBlock}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExternalReservation: (data) => dispatch(createExternalReservation(data)),
        blockReservationDate: (data) => dispatch(blockReservationDate(data)),
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
        fetchActivities: (filters) => dispatch(fetchActivities(filters)),
        fetchDisabledDate: (filters) => dispatch(fetchDisabledDate(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.activity.loading,
        activities: state.activity.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
