import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTaluka,
  getDistrictList,
  getTalukaListAction,
} from "../../../../store/Actions/BaseAction";
import "../../addUserFrom.scss";
import { API_CONSTANTS } from "../../../../globals/ApiConstants";
import {
  changeAntSlectWidthToFull,
  setTableHeight,
} from "../../../../globals/healpers";
import { URLS } from "../../../../globals/urls";
import "./CreateTaluka.scss";
import MarginContainer from "./../../CommonPages/MarginContainer";
import { PlusOutlined } from "@ant-design/icons";

const CreateTaluksDetails = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [districtListResult, setdistrictListResult] = useState([]);
  const districtSelector = useSelector((state) => state.districtListResult);

  useEffect(() => {
    if (districtSelector) {
      let rawDistrictDetails = districtSelector.data;
      let theDistrictList = [];

      for (let index = 0; index < rawDistrictDetails.length; index++) {
        theDistrictList.push({
          label: rawDistrictDetails[index]["district_name"],
          value: rawDistrictDetails[index]["id"],
        });
      }
      setdistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  const onFinish = (values) => {
    dispatch(createTaluka(values));
  };

  const createTalukaResult = useSelector((state) => state.createTalukaResult);

  useEffect(() => {
    if (createTalukaResult) {
      message.success("Taluka Created Successfully!");
      form.resetFields();
      dispatch({
        type: API_CONSTANTS.SET_TALUKA_RESULT_FALSE,
      });
      setOpen.setOpen(false);
    }
  }, [createTalukaResult]);

  useEffect(() => {
    changeAntSlectWidthToFull();
  }, []);
  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      labelCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="form-elements">
        <Form.Item
          label="Taluka Name"
          name="taluka_name"
          rules={[{ required: true, message: "Taluka Name is required!" }]}
        >
          <Input placeholder="Taluka Name" />
        </Form.Item>

        <Form.Item
          label="Taluka Code"
          name="taluka_code"
          rules={[{ required: true, message: "Taluka Code is required!" }]}
        >
          <Input placeholder="Taluka Code" />
        </Form.Item>

        <Form.Item
          label="Select District"
          name="district"
          rules={[{ required: true, message: "Please select district!" }]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select District"
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            options={districtListResult}
          />
        </Form.Item>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="search-button">
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

const CreateTaluka = () => {
  const dispatch = useDispatch();
  const [districtListResult, setdistrictListResult] = useState([]);
  const districtSelector = useSelector((state) => state.districtListResult);
  const talukaSelector = useSelector((state) => state.talukaListResult);
  const [talukaDetailsList, settalukaDetailsList] = useState([]);

  useEffect(() => {
    if (!districtSelector) dispatch(getDistrictList({}));
  }, []);

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "Taluka Name",
      dataIndex: "taluka_name",
    },
    {
      title: "Taluka Code",
      dataIndex: "taluka_code",
    },
  ];

  useEffect(() => {
    if (districtSelector) {
      let rawDistrictDetails = districtSelector.data;
      let theDistrictList = [];

      for (let index = 0; index < rawDistrictDetails.length; index++) {
        theDistrictList.push({
          label: rawDistrictDetails[index]["district_name"],
          value: rawDistrictDetails[index]["district_code"],
        });
      }

      setdistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  function getTalukaList(value) {
    const url = URLS.GET_TALUKA_LIST_URL + value + "/";
    dispatch(getTalukaListAction({ URL: url }));
  }

  useEffect(() => {
    if (
      talukaSelector &&
      talukaSelector.data1 &&
      form.getFieldValue("district")
    ) {
      let rawTalukaData = talukaSelector.data1;
      let theTalukaDetails = rawTalukaData.map((element, index) => {
        return {
          sr: index + 1,
          taluka_name: rawTalukaData[index]["taluka_name"],
          taluka_code: rawTalukaData[index]["taluka_code"],
        };
      });

      settalukaDetailsList(theTalukaDetails);
    }
  }, [talukaSelector]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <div className="taluka-list-acc-district">
      <Divider orientation="left">Taluka Details</Divider>
      <Space
        wrap
        className="w-full align-top justify-between 
      "
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <FormItem name="district" noStyle>
            <Select
              optionFilterProp="label"
              showSearch
              defaultValue="Select District"
              onChange={getTalukaList}
              style={{
                width: 300,
              }}
              options={districtListResult}
            />
          </FormItem>
        </Form>
        <Button
          type="dashed"
          onClick={() => setOpen(true)}
          className="create-button"
        >
          <span>
            <PlusOutlined></PlusOutlined>
          </span>{" "}
        </Button>
      </Space>
      <Modal
        title={<Divider orientation="left">Create Taluka</Divider>}
        open={open}
        style={{ top: 50, bottom: 50 }}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <CreateTaluksDetails setOpen={{ setOpen }}></CreateTaluksDetails>
      </Modal>
      <MarginContainer marginBottom="10px"></MarginContainer>
      <Table
        bordered
        columns={columns}
        dataSource={talukaDetailsList}
        pagination={false}
        scroll={setTableHeight()}
      ></Table>
      <div className="mt-2">Total {talukaDetailsList.length} items</div>
    </div>
  );
};

export default CreateTaluka;
const FormItem = Form.Item;
