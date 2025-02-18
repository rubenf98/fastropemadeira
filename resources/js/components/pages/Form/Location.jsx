import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Spin, Empty } from "antd";
import styled from "styled-components";
import BackButton from "./BackButton";
import { fetchExperiences } from "../../../redux/experience/actions";
import moment from "moment";
import { connect } from "react-redux";
import { setFormFields } from "../../../redux/form/actions";
import { colors } from "../../../helper";

const ListContainer = styled(Row)`
    margin: 30px auto;
`;

const SelectionContainer = styled(Col)`
    min-height: 400px;
    margin: 16px 0px;
    transition: 0.5s;

    &:hover {
        transform: scale(1.01);

        .selection-sub-container {
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.3);
        }
    }

    .selection-sub-container {
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
`;

const Selection = styled.div`
    width: 100%;
    min-height: 320px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: ${(props) => "url(" + props.src + ")"};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const Info = styled.div`
    width: 100%;
    min-height: 80px;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    div {
        flex: 1;

        h3,
        p {
            padding: 0px;
            margin: 0px;
        }

        h3 {
            font-size: clamp(20px, 2vw, 30px);
            color: #2f2f2f;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
            font-family: "Palestine Border", serif;
        }

        p {
            color: #777;
        }
    }

    img {
        width: 18px;
        margin: auto 0px auto 8px;
        display: inline-block;

        &:first-child {
            margin-left: 0px;
        }
    }
`;

const Price = styled.p`
    text-align: right;
    color: ${colors.main};
    font-size: 2em;
    margin: auto 0px auto 20px;
    font-weight: bold;
`;

const SelectionItem = ({ element, lg, handleClick }) => (
    <SelectionContainer xs={24} lg={lg} onClick={() => handleClick(element)}>
        <div className="selection-sub-container">
            <Selection
                className="selection-box"
                src={element.images[0].image}
            />
            <Info>
                <div>
                    <h3>{element.name[localStorage.getItem("language")]}</h3>
                    <p>
                        {!Array.isArray(element.duration) && (
                            <>
                                <img src="/icon/form/time.svg" />{" "}
                                {
                                    element.duration[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </>
                        )}
                        {!Array.isArray(element.height) && (
                            <>
                                <img src="/icon/form/height.svg" />{" "}
                                {
                                    element.height[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </>
                        )}
                        {!Array.isArray(element.level) && (
                            <>
                                <img src="/icon/form/difficulty.svg" />{" "}
                                {
                                    element.level[
                                        localStorage.getItem("language")
                                    ]
                                }
                            </>
                        )}
                    </p>
                </div>

                <Price>
                    {element.price == 0 ? "*" : Math.round(element.price)} €
                </Price>
            </Info>
        </div>
    </SelectionContainer>
);

const LoadingContainer = styled(Row)`
    width: 100%;
    margin: 50px auto;
`;

const columnSize = [12, 12, 14, 10, 12, 12, 10, 14, 12, 12, 14, 10, 12, 12];
function Location(props) {
    const { experiences, loading, text, fields } = props;
    const { date } = fields;
    useEffect(() => {
        props.fetchExperiences({ date: moment(date).format("YYYY-MM-DD") });
    }, []);

    function handleClick(experience) {
        props.setFormFields({ ...fields, experience: experience });
        props.incrementStep({ experience_id: experience });
    }

    return (
        <Fragment>
            <BackButton
                decrementStep={props.decrementStep}
                text={text.activityBackButton}
            />
            {loading ? (
                <LoadingContainer type="flex" justify="center" align="middle">
                    <Spin size="large" />
                </LoadingContainer>
            ) : (
                <ListContainer
                    type="flex"
                    justify="space-between"
                    align="top"
                    gutter={16}
                >
                    {experiences.length ? (
                        experiences.map((element, index) => (
                            <SelectionItem
                                key={element.id}
                                handleClick={handleClick}
                                lg={
                                    experiences.length % 2 != 0 &&
                                    experiences.length - 1 == index
                                        ? 24
                                        : columnSize[index]
                                }
                                element={element}
                                text={text.price}
                            />
                        ))
                    ) : (
                        <Empty
                            description={text.nodata}
                            style={{ margin: "auto" }}
                        />
                    )}
                </ListContainer>
            )}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.experience.loading,
        experiences: state.experience.data,
        fields: state.form.fields,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExperiences: (filters) => dispatch(fetchExperiences(filters)),
        setFormFields: (data) => dispatch(setFormFields(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
