import { useEffect, useState } from "react";
import { Form, Collapse, Space, Button, DatePicker } from "antd";
import { getChangedDataPattern } from "../../../globals/healpers";
import { SearchOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const PreScanDraftSearchForm = ({
  dispatch,
  getPreScanDocumentListRowSpann,
}) => {
  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState(false);

  const onFinish = (values) => {
    if (!values) {
      dispatch(getPreScanDocumentListRowSpann(""));
      return;
    }

    values = values?.date;

    let start_date = values?.length > 0 ? getChangedDataPattern(values[0]) : "";
    let end_date = values?.length ? getChangedDataPattern(values[1]) : "";
    let url;

    if (start_date !== "") {
      url = "?start_date=" + start_date + "&end_date=" + end_date;
    } else {
      url = "";
    }

    dispatch(getPreScanDocumentListRowSpann(url));
  };

  useEffect(() => {
    if (canSearch || canSearch == null) {
      onFinish(canSearch);
    }
  }, [canSearch]);

  return (
    <Collapse
      items={[
        {
          key: "1",
          label: <SearchOutlined></SearchOutlined>,
          children: (
            <Form
              name="basic"
              form={form}
              layout="vertical"
              onFinish={(v) => {
                if (JSON.stringify(v) !== JSON.stringify(canSearch))
                  setCanSearch(v);
              }}
              autoComplete="off"
            >
              <Space wrap>
                <Form.Item
                  name={"date"}
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                >
                  <RangePicker />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
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
                      setCanSearch(null);
                      form.resetFields();
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
  );
};

export default PreScanDraftSearchForm;
