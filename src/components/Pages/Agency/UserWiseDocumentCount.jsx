import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDocumentCountpaginationAction,
  userWiseDocumentCountAction,
} from "../../../store/Actions/BaseAction";

import {
  Button,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  Pagination,
  Space,
  Switch,
  Table,
} from "antd";
import {
  canShowStaticTableColumn,
  getChangedDataPattern,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import { URLS } from "../../../globals/urls";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import "./userwiseDocumentCount.scss";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const UserWiseDocumentCount = () => {
  const dispatch = useDispatch();
  const [dataSource, setdataSource] = useState([]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      fixed: canShowStaticTableColumn() ? "left" : "",
      key: "username",
      width: 190,
    },
    {
      title: "Rectify Allocated",
      dataIndex: "rectify_allocated",
      key: "rectify_allocated",
    },
    {
      title: "Rectify Inprocess",
      dataIndex: "rectify_inprocess",
      key: "rectify_inprocess",
    },
    {
      title: "Rectify Rejected",
      dataIndex: "rectify_rejected",
      key: "rectify_rejected",
    },
    {
      title: "Rectify Onhold",
      dataIndex: "rectify_onhold",
      key: "rectify_onhold",
    },
    {
      title: "Rectify Completed",
      dataIndex: "rectify_completed",
      key: "rectify_completed",
    },
    {
      title: "Digitize Allocated",
      dataIndex: "digitize_allocated",
      key: "digitize_allocated",
    },
    {
      title: "Digitize Inprocess",
      dataIndex: "digitize_inprocess",
      key: "digitize_inprocess",
    },
    {
      title: "Digitize Rejected",
      dataIndex: "digitize_rejected",
      key: "digitize_rejected",
    },
    {
      title: "Digitize Onhold",
      dataIndex: "digitize_onhold",
      key: "digitize_onhold",
    },
    {
      title: "Digitize Completed",
      dataIndex: "digitize_completed",
      key: "digitize_completed",
    },

    {
      title: "QC Allocated",
      dataIndex: "qc_allocated",
      key: "qc_allocated",
    },
    {
      title: "QC Inprocess",
      dataIndex: "qc_inprocess",
      key: "qc_inprocess",
    },
    {
      title: "QC Rejected",
      dataIndex: "qc_rejected",
      key: "qc_rejected",
    },
    {
      title: "QC Onhold",
      dataIndex: "qc_onhold",
      key: "qc_onhold",
    },
    {
      title: "QC Completed",
      dataIndex: "qc_completed",
      key: "qc_completed",
      fixed: canShowStaticTableColumn() ? "right" : "",
    },
    {
      title: "Polygon Count",
      dataIndex: "polygon_count",
      fixed: canShowStaticTableColumn() ? "right" : "",
      key: "polygon_count",
    },
  ];

  const [form] = Form.useForm();

  function getDetails(detils) {}

  const [totalCount, settotalCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [useUrl, setuseUrl] = useState(URLS.USER_WISE_DOCUMENT_COUNT_URL);

  const userWiseDocumentCountResult = useSelector(
    (state) => state.userWiseDocumentCountResult
  );

  useEffect(() => {
    dispatch(userWiseDocumentCountAction({ URL: useUrl }));
  }, [useUrl, dispatch]);

  const onFinish = (values) => {
    const rectify_start_date = values.rectify_start_date;
    const qc_start_date = values.qc_start_date;
    const digitize_start_date = values.digitize_start_date;

    if (rectify_start_date) {
      values["rectify_start_date"] = getChangedDataPattern(
        rectify_start_date[0]
      );
      values["rectify_end_date"] = getChangedDataPattern(rectify_start_date[1]);
    }

    if (digitize_start_date) {
      values["digitize_start_date"] = getChangedDataPattern(
        digitize_start_date[0]
      );
      values["digitize_end_date"] = getChangedDataPattern(
        digitize_start_date[1]
      );
    }

    if (qc_start_date) {
      values["qc_start_date"] = getChangedDataPattern(qc_start_date[0]);
      values["qc_end_date"] = getChangedDataPattern(qc_start_date[1]);
    }

    let keys = Object.keys(values);
    let baseUrl = URLS.USER_WISE_DOCUMENT_COUNT_URL;
    let url = getSearchingUrl(values, keys);

    setuseUrl(baseUrl + url);
  };

  const onReset = () => {
    setuseUrl(URLS.USER_WISE_DOCUMENT_COUNT_URL);
    form.resetFields();
  };

  useEffect(() => {
    if (
      userWiseDocumentCountResult &&
      userWiseDocumentCountResult.length !== 0 &&
      userWiseDocumentCountResult.pagination.counts_by_user.length > 0
    ) {
      let userDetailsList = [];
      const userList = userWiseDocumentCountResult.pagination.counts_by_user;

      for (let index = 0; index < userList?.length; index++) {
        let element = userList[index];
        element["status"] = (
          <Switch
            defaultChecked={element?.active_status === "Active"}
            onChange={() => getDetails(element)}
          >
            <span>
              <EyeOutlined /> View Details
            </span>{" "}
          </Switch>
        );
        userDetailsList.push(element);
      }

      settotalCount(userWiseDocumentCountResult.pagination.count);
      setCurrentPageSize(userWiseDocumentCountResult.pagination.per_page_count);
      setdataSource(userList);
    }
  }, [userWiseDocumentCountResult]);

  return (
    <div>
      <Divider orientation="left">User Details</Divider>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                layout="inline"
                form={form}
                name="searchForm"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >
                <Form.Item name="user_name">
                  <Input placeholder="User Name" />
                </Form.Item>

                <Form.Item name="dept_name">
                  <Input placeholder="Department Name" />
                </Form.Item>

                <Form.Item name="rectify_start_date">
                  <RangePicker
                    changeOnBlur
                    placeholder={["Rectify Start Date", "Rectify End Date"]}
                  />
                </Form.Item>

                <Form.Item name="digitize_start_date">
                  <RangePicker
                    changeOnBlur
                    placeholder={["Digitize Start Date", "Digitize End Date"]}
                  />
                </Form.Item>

                <Form.Item name="qc_start_date">
                  <RangePicker
                    changeOnBlur
                    placeholder={["QC Start Date", "QC End Date"]}
                  />
                </Form.Item>

                <Space>
                  <Form.Item>
                    <Button
                      type="dashed"
                      htmlType="submit"
                      className="search-button"
                    >
                      Search
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="clear-button"
                      onClick={() => {
                        onReset();
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            ),
          },
        ]}
      />

      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ ...setTableHeight(), x: 2700 }}
      ></Table>

      <div className="mt-2">total {totalCount}</div>
      {/* <div className="flex justify-end mt-2">
        <Pagination
          responsive
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
        />
      </div> */}
    </div>
  );
};

export default UserWiseDocumentCount;
const { RangePicker } = DatePicker;
