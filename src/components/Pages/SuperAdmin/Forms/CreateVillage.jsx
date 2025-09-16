import {
  Button,
  Divider,
  Form,
  Space,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVillage,
  getDistrictList,
  getTalukaListAction,
  getVillageAction,
} from "../../../../store/Actions/BaseAction";
import { API_CONSTANTS } from "../../../../globals/ApiConstants";
import { URLS } from "../../../../globals/urls";
import "./CreateVillage.scss";
import { setTableHeight } from "../../../../globals/healpers";
import CollapseButtonMarginContainer from "../../../CommonComponents/CollapseButtonMarginContainer";

const CreateVillageForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [districtListResult, setDistrictListResult] = useState([]);
  const [talukaDetailsList, setTalukaDetailsList] = useState([]);
  const districtSelector = useSelector((state) => state.districtListResult);
  const talukaSelector = useSelector((state) => state.talukaListResult);

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

      setDistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  function getTalukaList(value) {
    form.resetFields(["taluka"]);
    const url = URLS.GET_TALUKA_LIST_URL + value + "/";
    dispatch(getTalukaListAction({ URL: url }));
  }

  useEffect(() => {
    if (talukaSelector?.data1) {
      let rawTalukaData = talukaSelector.data1;
      let theTalukaDetails = [];

      for (let index = 0; index < rawTalukaData.length; index++) {
        theTalukaDetails.push({
          label: rawTalukaData[index]["taluka_name"],
          value: rawTalukaData[index]["id"],
        });
      }

      setTalukaDetailsList(theTalukaDetails);
    }
  }, [talukaSelector]);

  const onFinish = (values) => {
    dispatch(createVillage(values));
  };

  const createVillageResult = useSelector((state) => state.createVillageResult);

  useEffect(() => {
    if (createVillageResult) {
      message.success("Village Created Successfully!");
      form.resetFields();
      dispatch({
        type: API_CONSTANTS.SET_CREATE_CREATE_DISTRICT_FALSE,
      });

      setOpen.setOpen(false);
      form.resetFields();

      dispatch({
        type: API_CONSTANTS.SET_CREATE_TALUKS_FALSE,
      });

      dispatch({ type: API_CONSTANTS.SET_VILLAGE_LIST_FALSE });
      setTalukaDetailsList([]);
    }
  }, [createVillageResult]);

  return (
    <div className="create-village-form">
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
        <Form.Item
          label="Select District"
          name="district"
          rules={[{ required: true, message: "Please select district!" }]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue={"Select District"}
            onChange={getTalukaList}
            options={districtListResult}
          />
        </Form.Item>
        <Form.Item
          id="select-taluka"
          label="Select Taluka"
          name="taluka"
          rules={[{ required: true, message: "Please select taluka!" }]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue={"Select Taluka"}
            options={talukaDetailsList}
          />
        </Form.Item>
        <Form.Item
          label="Village Name"
          name="village_name"
          rules={[{ required: true, message: "Village Name is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Village Code"
          name="village_code"
          rules={[{ required: true, message: "Village Code is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end">
            <Button className="search-button" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

function CreateVillage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistrictList({}));
  }, []);

  const [form] = Form.useForm();

  const [districtListResult, setDistrictListResult] = useState([]);
  const [talukaDetailsList, setTalukaDetailsList] = useState([]);

  const districtSelector = useSelector((state) => state.districtListResult);
  const talukaSelector = useSelector((state) => state.talukaListResult);

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "Village Name",
      dataIndex: "village_name",
    },
    {
      title: "Village Code",
      dataIndex: "village_code",
    },
  ];

  function getTalukaList(value) {
    form.resetFields(["taluka"]);
    const url = URLS.GET_TALUKA_LIST_URL + value + "/";
    dispatch(getTalukaListAction({ URL: url }));
  }

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

      setDistrictListResult(theDistrictList);
    }
  }, [districtSelector]);

  useEffect(() => {
    if (talukaSelector && talukaSelector.data1) {
      let rawTalukaData = talukaSelector.data1;
      let theTalukaDetails = [];

      for (let index = 0; index < rawTalukaData.length; index++) {
        theTalukaDetails.push({
          label: rawTalukaData[index]["taluka_name"],
          value: rawTalukaData[index]["taluka_code"],
        });
      }

      setTalukaDetailsList(theTalukaDetails);
    }
  }, [talukaSelector]);

  function getVillageList(value) {
    form.resetFields(["village"]);

    const url = URLS.GET_VILLAGE_LIST_URL + value + "/";
    dispatch(getVillageAction({ URL: url }));
  }

  const villageListSelector = useSelector((state) => state.villageListMapType);
  const [villageListDetails, setvillageListDetails] = useState([]);

  useEffect(() => {
    if (
      villageListSelector &&
      villageListSelector.data1 &&
      form.getFieldValue("district")
    ) {
      let villageRawDetails = villageListSelector.data1;
      let villageDetails = [];

      for (let index = 0; index < villageRawDetails.length; index++) {
        villageDetails.push({
          sr: index + 1,
          village_name: villageRawDetails[index]["village_name"],
          village_code: villageRawDetails[index]["village_code"],
        });
      }

      setvillageListDetails(villageDetails);
    }
  }, [villageListSelector]);

  const [open, setOpen] = useState(false);

  return (
    <div className="create-village-table-data">
      <Divider orientation="left">Village Details</Divider>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <Space wrap className="form-select-open-button justify-between">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Space wrap>
            <Form.Item
              noStyle
              name="district"
              rules={[{ required: true, message: "Please select district!" }]}
            >
              <Select
                optionFilterProp="label"
                defaultValue="Select District"
                showSearch
                style={{
                  width: 300,
                }}
                onChange={getTalukaList}
                options={districtListResult}
              />
            </Form.Item>
            <Form.Item
              noStyle
              id="select-taluka"
              name="taluka"
              rules={[{ required: true, message: "Please select taluka!" }]}
            >
              <Select
                optionFilterProp="label"
                style={{
                  width: 300,
                }}
                onChange={getVillageList}
                showSearch
                defaultValue={"Select Taluka"}
                options={talukaDetailsList}
              />
            </Form.Item>
          </Space>
        </Form>

        <Button
          type="dashed"
          className="mt-2 create-button"
          onClick={() => setOpen(true)}
        >
          <span>
            <PlusOutlined></PlusOutlined>
          </span>
        </Button>
      </Space>
      <Modal
        title={<Divider orientation="left">Create Village</Divider>}
        open={open}
        style={{ top: 50, bottom: 50 }}
        width={1000}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <CreateVillageForm setOpen={{ setOpen }}></CreateVillageForm>
      </Modal>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <Table
        bordered
        pagination={false}
        dataSource={villageListDetails}
        columns={columns}
        scroll={setTableHeight()}
      ></Table>
      <div className="mt-2">Total {villageListDetails.length} </div>
    </div>
  );
}
export default CreateVillage;
