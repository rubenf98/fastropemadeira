import React from "react";
import styled from "styled-components";
import { Table } from "antd";

const Container = styled.div`
    background: transparent;
    border-radius: 5px;
`;


function TableContainer({ onRow, columns, data, meta, handlePageChange, loading,
    showQuickJumper = true, handleExpandable, bordered = false }) {

    return (
        <div>
            <Container>
                <Table
                    bordered={bordered}
                    onRow={onRow}
                    onChange={handlePageChange}
                    pagination={meta ? {
                        showQuickJumper: showQuickJumper,
                        total: meta.total,
                        showTotal: (total, range) => `${range[0]} a ${range[1]} de ${total}`,
                        total: meta.total,
                        current: meta.current_page,
                        pageSize: meta.per_page,
                    } : false}
                    columns={columns}
                    loading={loading}
                    dataSource={data}
                    rowKey={(record) => record.id}
                    expandable={handleExpandable}
                />
            </Container>

        </div>
    );
}

export default TableContainer;
