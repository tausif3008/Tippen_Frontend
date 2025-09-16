import { Collapse, Form, Input, Space, Button, DatePicker } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  getChangedDataPattern,
  getSearchingUrl,
} from "../../../globals/healpers";
const { RangePicker } = DatePicker;

const PreDraftSearchForm = ({ getSearchParameters }) => {
  const [form] = Form.useForm();

  function onFinish(values) {
    if (values["drafting_start_date"]) {
      let start = values["drafting_start_date"][0];
      let end = values["drafting_start_date"][1];

      values["drafting_start_date"] = getChangedDataPattern(start);
      values["drafting_end_date"] = getChangedDataPattern(end);
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
        style={{ marginBottom: "20px" }}
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

                <Form.Item name="drafting_start_date">
                  <RangePicker
                    placeholder={["Drafting Start Date", "Drafting End Date"]}
                  ></RangePicker>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="dashed"
                    className="search-button"
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button className="clear-button" onClick={handleReset}>
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

export default PreDraftSearchForm;
