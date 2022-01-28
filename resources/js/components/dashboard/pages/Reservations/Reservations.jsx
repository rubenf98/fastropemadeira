import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, fetchReservation, deleteReservation, updateReservation } from "../../../../redux/reservation/actions";
import { dimensions } from "../../../../helper";
import TableContainer from "./TableContainer";
import DrawerContainer from "./DrawerContainer";

const ContentContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-wrap: wrap;
    margin: 50px 0px;

    @media (max-width: ${dimensions.lg}){
        width: 100%;
    }
`;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: rgb(245, 245, 245);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Table = styled.div`
     width: 100%;
`;

class Reservations extends Component {
    state = {
        filters: {},
        page: 1,
        drawerVisible: false
    }

    componentDidMount() {
        this.props.fetchReservations();
    }

    setFilters = (aFilters) => {
        var { filters } = this.state;
        filters = { ...filters, ...aFilters };
        this.setState({ filters });

        this.props.fetchReservations(1, filters);
    }

    handlePageChange = (pagination) => {
        var { filters } = this.state;
        this.setState({ page: pagination.current });

        this.props.fetchReservations(pagination.current, filters);
    }

    onRowClick = (aRecord) => {
        this.props.fetchReservation(aRecord).then(() => {
            this.setState({
                drawerVisible: true
            })
        });
    }

    setFilters = (aFilters) => {
        var { filters } = this.state;
        filters = { ...filters, ...aFilters };
        this.setState({ filters });

        this.props.fetchReservations(1, filters);
    }

    render() {
        var { data, loading, meta, current } = this.props;
        var { drawerVisible } = this.state;

        return (
            <Container>
                <ContentContainer>
                    <Table>
                        <TableContainer
                            setFilters={this.setFilters}
                            onRowClick={this.onRowClick}
                            handlePageChange={this.handlePageChange}
                            data={data}
                            loading={loading}
                            meta={meta}
                            onDelete={this.props.deleteReservation}
                        />
                    </Table>
                </ContentContainer>

                <DrawerContainer
                    record={current}
                    onClose={() => this.setState({
                        drawerVisible: false
                    })}
                    visible={drawerVisible} />
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        fetchReservation: (id) => dispatch(fetchReservation(id)),
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.data,
        meta: state.reservation.meta,
        current: state.reservation.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
