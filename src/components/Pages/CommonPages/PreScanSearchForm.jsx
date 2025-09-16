import { Collapse, Form, Input, Button, DatePicker } from "antd";
import React from "react";
import {
  getChangedDataPattern,
  getSearchingUrl,
} from "../../../globals/healpers.js";

import { SearchOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const PreScanSearchForm = ({ getSearchParameters }) => {
  const [form] = Form.useForm();

  function onFinish(values) {
    if (values["mis_end_date"]) {
      let start = values["mis_end_date"][0];
      let end = values["mis_end_date"][1];

      values["mis_start_date"] = getChangedDataPattern(start);
      values["mis_end_date"] = getChangedDataPattern(end);
    }

    let url = getSearchingUrl(values, Object.keys(values));
    getSearchParameters(url);
  }

  const handleReset = () => {
    form.resetFields();
    getSearchParameters("");
  };

  return (
    <div>
      <Collapse
        style={{ marginBottom: "10px" }}
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                form={form}
                name="searchForm"
                layout="inline"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >
                <Form.Item name="taluka_name">
                  <Input placeholder="Taluka Name" />
                </Form.Item>

                <Form.Item name="mis_end_date">
                  <RangePicker
                    placeholder={["Mis Start Date", "Mis End Date"]}
                  ></RangePicker>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    htmlType="submit"
                    className="download-button"
                  >
                    Search
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="clear-button"
                    type="primary"
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PreScanSearchForm;
