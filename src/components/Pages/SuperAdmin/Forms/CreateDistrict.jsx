import { Button, Divider, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  createDistrict,
  getDistrictList,
} from "../../../../store/Actions/BaseAction";
import "../../addUserFrom.scss";
import { API_CONSTANTS } from "../../../../globals/ApiConstants";
import { setTableHeight } from "../../../../globals/healpers";
import "./CreateDistrict.scss";
import CollapseButtonMarginContainer from "../../../CommonComponents/CollapseButtonMarginContainer";

const CreateDistrictForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(createDistrict(values));
  };
  const createDistrctResult = useSelector((state) => state.createDistrctResult);
  useEffect(() => {
    if (createDistrctResult) {
      message.success("District Created Successfully!");
      form.resetFields();
      setOpen.setOpen(false);
      setOpen.getDistrictDetails();
      dispatch({
        type: API_CONSTANTS.SET_CREATE_CREATE_DISTRICT_FALSE,
      });
    }
  }, [createDistrctResult]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="form-elements">
          <Form.Item
            label="District Name"
            name="district_name"
            rules={[{ required: true, message: "District Name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="District Code"
            name="district_code"
            rules={[{ required: true, message: "District Code is required!" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="create-district-submit-form">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="district-sbumit-button search-button"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const CreateDistrict = () => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "District Name",
      dataIndex: "district_name",
    },
    {
      title: "District Code",
      dataIndex: "district_code",
    },
  ];

  const [districtListResult, setdistrictListResult] = useState([]);

  function getDistrictDetails() {
    dispatch(getDistrictList({}));
  }
  const districtSelector = useSelector((state) => state.districtListResult);

  useEffect(() => {
    if (!districtSelector) getDistrictDetails();
  }, []);

  useEffect(() => {
    if (districtSelector) {
      let rawDistrictDetails = districtSelector.data;

      let theDistrictList = rawDistrictDetails.map((element, index) => {
        return {
          ...element,
          sr: index + 1,
        };
      });
      setdistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Divider orientation="left">District Details</Divider>
      <div className="create-district-modal-open-btn">
        <Button
          type="dashed"
          className="create-button"
          onClick={() => setOpen(true)}
        >
          <span>
            <PlusOutlined />
          </span>
        </Button>
      </div>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

      <Modal
        title={<Divider orientation="left">Create District</Divider>}
        open={open}
        style={{ top: 50, bottom: 50 }}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <CreateDistrictForm
          setOpen={{ setOpen, getDistrictDetails }}
        ></CreateDistrictForm>
      </Modal>
      <Table
        bordered
        columns={columns}
        dataSource={districtListResult}
        pagination={false}
        scroll={{ ...setTableHeight() }}
      ></Table>
      <div className="mt-2">Total {districtListResult.length}</div>
    </div>
  );
};

export default CreateDistrict;
