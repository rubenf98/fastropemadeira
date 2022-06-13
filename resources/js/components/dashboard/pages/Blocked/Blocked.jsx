import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchBlockedDates, deleteBlockedDate } from "../../../../redux/date/actions";
import { dimensions } from "../../../../helper";
import TableContainer from "./TableContainer";

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

class Blocked extends Component {
    state = {
        filters: {},
        page: 1,
    }

    componentDidMount() {
        this.props.fetchBlockedDates();
    }

    setFilters = (aFilters) => {
        var { filters } = this.state;
        filters = { ...filters, ...aFilters };
        this.setState({ filters });

        this.props.fetchBlockedDates(1, filters);
    }

    handlePageChange = (pagination) => {
        var { filters } = this.state;
        this.setState({ page: pagination.current });

        this.props.fetchBlockedDates(pagination.current, filters);
    }

    render() {
        var { data, loading, meta } = this.props;

        return (
            <Container>
                <ContentContainer>
                    <Table>
                        <TableContainer
                            handlePageChange={this.handlePageChange}
                            data={data}
                            loading={loading}
                            meta={meta}
                            onDelete={this.props.deleteBlockedDate}
                        />
                    </Table>
                </ContentContainer>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlockedDates: (page, filters) => dispatch(fetchBlockedDates(page, filters)),
        deleteBlockedDate: (id) => dispatch(deleteBlockedDate(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.date.loading,
        data: state.date.data,
        meta: state.date.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blocked);
