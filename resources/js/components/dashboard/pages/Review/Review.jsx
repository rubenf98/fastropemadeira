import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteReview, fetchReviews } from "../../../../redux/review/actions";
import { dimensions } from "../../../../helper";
import TableContainer from "./TableContainer";
import ReviewForm from "./ReviewForm";

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

function Review(props) {
    var { data, loading, meta } = props;

    const [filters, setFilters] = useState({})
    const [formVisibility, setFormVisibility] = useState(false)

    const handlePageChange = (pagination) => {
        props.fetchReviews(pagination.current, filters);
    }

    useEffect(() => {
        props.fetchReviews();
    }, [filters])

    return (
        <Container>

            <ContentContainer>
                <ReviewForm handleModalClose={() => setFormVisibility(false)} visible={formVisibility} />
                <Table>
                    <TableContainer
                        onDelete={props.deleteReview}
                        setFormVisibility={setFormVisibility}
                        handlePageChange={handlePageChange}
                        data={data}
                        loading={loading}
                        meta={meta}
                    />
                </Table>
            </ContentContainer>
        </Container>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchReviews: (page, filters) => dispatch(fetchReviews(page, filters)),
        deleteReview: (id) => dispatch(deleteReview(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.review.loading,
        data: state.review.data,
        meta: state.review.meta,
        current: state.review.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
