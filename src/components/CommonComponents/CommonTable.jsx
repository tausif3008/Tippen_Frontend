import React, { memo } from "react";
import { setTableHeight } from "../../globals/healpers";
import { Table } from "antd";
import "./commonTable.scss";

const CommonTable = memo(
  ({ columns, dataSourse, total, scrole = {}, showTotal = true }) => {
    return (
      <div className="common-table-container">
        <Table
          bordered
          columns={columns}
          dataSource={dataSourse}
          pagination={false}
          scroll={{ ...setTableHeight(), ...scrole }}
        />
        {showTotal && <div className="mt-2">Total {total}</div>}
      </div>
    );
  }
);

export default CommonTable;
