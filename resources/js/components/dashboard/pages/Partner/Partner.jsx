import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchPartners } from "../../../../redux/partner/actions";
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

class Partner extends Component {
    state = {
        filters: {},
        page: 1,
    }

    componentDidMount() {
        this.props.fetchPartners();
    }

    setFilters = (aFilters) => {
        var { filters } = this.state;
        filters = { ...filters, ...aFilters };
        this.setState({ filters });

        this.props.fetchPartners(1, filters);
    }

    handlePageChange = (pagination) => {
        var { filters } = this.state;
        this.setState({ page: pagination.current });

        this.props.fetchPartners(pagination.current, filters);
    }

    render() {

        return (
            <Container>
                <ContentContainer>
                    <Table>
                        <TableContainer
                            handlePageChange={this.handlePageChange}
                        />
                    </Table>
                </ContentContainer>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPartners: (page, filters) => dispatch(fetchPartners(page, filters)),
    };
};


export default connect(null, mapDispatchToProps)(Partner);
