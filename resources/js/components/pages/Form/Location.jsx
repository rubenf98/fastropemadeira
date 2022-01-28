import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col } from 'antd';
import styled from "styled-components";
import axios from "axios";
import BackButton from './BackButton';



const ListContainer = styled(Row)`
    margin: 30px auto;
`;

const SelectionContainer = styled(Col)`
    min-height: 400px;
    margin: 16px 0px;
    transition: 0.5s;

    &:hover{
        transform: scale(1.01);

        .selection-sub-container {
            box-shadow: 0 0 20px 0px rgba(0,0,0,.3);
        }
    }

    .selection-sub-container {
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 0 10px 0px rgba(0,0,0,.2);
        overflow: hidden;
    }
`;

const Selection = styled.div`
    width: 100%;
    min-height: 320px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: ${props => "url(" + props.src + ")"};
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
        max-width: 75%;

        h3, p {
        padding: 0px;
        margin: 0px;
        }

        h3 {
            font-size: 1.4em;
            color: #2f2f2f;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
        }

        p {
            color: #777;
        }
    }

    img {
        width: 18px;
        margin: auto 0px auto 8px;
        display: inline-block;

        &:first-child{
            margin-left: 0px;
        }
    }
`;

const Price = styled.div`
    text-align: right;
    color: rgb(52,60,94);
    font-size: 2em;
    margin: auto 0px auto 20px;
    font-weight: bold;
`;

const Disclaimer = styled.div`
    margin: 0px;
    font-size: 1.2em;
`;

const SelectionItem = ({ element, lg, incrementStep }) => (
    <SelectionContainer xs={24} lg={lg} onClick={() => incrementStep({ experience: element.id })}>
        <div className="selection-sub-container">
            <Selection className="selection-box" src={element.images[0].image} />
            <Info>
                <div>
                    <h3>{element.name[localStorage.getItem("language")]}</h3>
                    <p>
                        {!Array.isArray(element.duration) && <Fragment><img src="/icon/form/time.svg" /> {element.duration[localStorage.getItem("language")]}</Fragment>}
                        {!Array.isArray(element.height) && <Fragment><img src="/icon/form/height.svg" /> {element.height[localStorage.getItem("language")]}</Fragment>}
                        {!Array.isArray(element.distance) && <Fragment><img src="/icon/form/distance.svg" /> {element.distance[localStorage.getItem("language")]}</Fragment>}
                        {!Array.isArray(element.level) && <Fragment><img src="/icon/form/difficulty.svg" /> {element.level[localStorage.getItem("language")]}</Fragment>}
                    </p>
                </div>

                <Price>{element.price == 0 ? "*" : Math.round(element.price)} €</Price>
            </Info>
        </div>

    </SelectionContainer>
)

const columnSize = [10, 14, 12, 12, 14, 10, 12, 12, 10, 14, 12, 12, 14, 10]
function Location({ incrementStep, decrementStep, getActivity, updateForm, text }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        let activity = getActivity();
        axios.get(`${window.location.origin}/api/experience?activity=${activity}`).then((response) => {
            setData(response.data.data);
        });
    }, []);

    return (
        <Fragment>
            <BackButton decrementStep={decrementStep} text={text.activityBackButton} />

            <ListContainer type="flex" justify="space-between" align="top" gutter={16}>
                {data.map((element, index) => (
                    <SelectionItem
                        onClick={() => updateForm({ experience_id: element.id })}
                        key={element.id}
                        incrementStep={incrementStep}
                        lg={((data.length % 2 != 0) && (data.length - 1 == index)) ?
                            24
                            : columnSize[index]
                        }
                        element={element}
                        text={text.price}
                    />
                ))}
            </ListContainer>
            <Disclaimer>
                * {text.price}
            </Disclaimer>
        </Fragment>
    )
}

export default Location
