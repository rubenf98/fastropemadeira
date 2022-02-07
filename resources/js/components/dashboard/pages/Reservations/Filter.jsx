import React from "react";
import styled from "styled-components";
import Form from "antd/es/form"
import moment from 'moment';

const FilterContainer = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
`;

const FormItem = styled(Form.Item)`
    margin-bottom: 0px;

`;

const CustomForm = styled(Form)`
    border: 1px solid #dddddd;
    border-bottom: none;
`;

function Filter({ setFilters }) {

    function onFinish(filters) {
        if (filters.date) {
            filters.date[0] = moment(filters.date[0]).format("YYYY-MM-DD");
            filters.date[1] = moment(filters.date[1]).format("YYYY-MM-DD");
        }
        setFilters(filters);
    };

    return (
        <FilterContainer >
            <CustomForm onFinish={onFinish}>
                <FormItem name="date">
                    <CustomRangePicker size="large" picker="month" />
                </FormItem>
                <FormItem name="client">
                    <ClientRemoteSelectContainer />
                </FormItem>
                <FormItem name="category">
                    <CategoryRemoteSelectContainer />
                </FormItem>
                <FormItem name="item">
                    <ItemRemoteSelectContainer />
                </FormItem>

                <CustomButton type="primary" htmlType="submit">Pesquisar</CustomButton>
            </CustomForm>
        </FilterContainer>
    )
}

export default Filter;
