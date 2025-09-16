import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAgency,
  getAgencyListing,
  getAgencyListingUpdate,
} from "../../../store/Actions/BaseAction";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { setTableHeight } from "../../../globals/healpers";

import { API_CONSTANTS } from "../../../globals/ApiConstants";
import "./AgencyDetails.scss";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import { postHTTP, putHTTP } from "../../../Axios/Axios";
import { URLS } from "../../../globals/urls";

const CreateAgency = ({ setOpenFalse }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(createAgency(values));
  };

  const createAgencyResult = useSelector(
    (state) => state.createAgencyAndAdminResult
  );

  useEffect(() => {
    if (createAgencyResult) {
      message.success("Agency Created Successfully!");
      form.resetFields();
      dispatch({
        type: API_CONSTANTS.SET_CREATE_AGENCY_AND_ADMIN_FALSE,
      });
      setOpenFalse.setOpen(false);
      setOpenFalse.getAgencyDetails();
    }
  }, [createAgencyResult]);

  useEffect(() => {
    form.resetFields();
  }, [setOpenFalse.open]);

  const validator = (event, value) => {
    if (event.field === "mobile_number") {
      if (value && value.toString().length !== 10) {
        return Promise.reject("Phone number must have 10 digits!");
      }

      return Promise.resolve();
    } else if (event.field === "aadhar_no") {
      if (value && value.toString().length !== 12) {
        return Promise.reject("Addhar number must have 12 digits!");
      }
      return Promise.resolve();
    }
  };

  return (
    <div className="create-agency-user-form">
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
            label="Agency Name"
            name="agency"
            rules={[{ required: true, message: "Agency name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "First name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Last name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile_number"
            rules={[
              {
                required: true,
                message: "Phone number is required!",
              },
              {
                validator: validator,
              },
            ]}
          >
            <InputNumber style={{ display: "flex", width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Aadhar Number"
            name="aadhar_no"
            rules={[
              {
                required: true,
                message: "Aaadhar number is required!",
              },
              {
                validator: validator,
              },
            ]}
          >
            <InputNumber style={{ display: "flex", width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Address is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="search-button">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const AgencyDetails = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);

  function getAgencyDetails() {
    dispatch(getAgencyListingUpdate({}));
  }
  const agencyListSelector = useSelector(
    (state) => state.allAgencyListFormSuperUser
  );

  useEffect(() => {
    if (!agencyListSelector) {
      getAgencyDetails();
    }
  }, []);

  useEffect(() => {
    if (agencyListSelector) {
      // let agencyDetails = [];
      // for (let index = 0; index < agencyListSelector.length; index++) {
      //   let newElement = agencyListSelector[index];
      //   agencyDetails.push({
      //     ...newElement,
      //     active_status: (
      //       <Switch
      //         defaultChecked={
      //           newElement.active_status === "Active" ? true : false
      //         }
      //       />
      //     ),
      //   });
      // }
      setdata(agencyListSelector);
    }
  }, [agencyListSelector]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="dashed"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Agency Name",
      dataIndex: "agency_name",
      key: "agency_name",
      ...getColumnSearchProps("agency_name"),
    },
    {
      title: "UserName",
      dataIndex: "user_details",
      key: "user_details",
      render: (userDetails) => {
        return userDetails && userDetails.length > 0
          ? userDetails[0].username
          : "";
      },
      // ...getColumnSearchProps("username"), // Assuming getColumnSearchProps is a function returning search props
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 700,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "Aadhar Number",
      dataIndex: "aadhar_no",
      key: "aadhar_no",
    },
    {
      title: "Status",
      dataIndex: "active_status",
      key: "active_status",
      render: (val, el) => {
        return (
          <Switch
            defaultChecked={el?.user_details[0]?.active_status === "Active"}
            onChange={() => {
              putHTTP(
                URLS.UPDATE_AGENCY_USER_URL + el?.user_details[0]?.id + "/",
                {
                  active_status:
                    el?.user_details[0]?.active_status === "Active"
                      ? "Inactive"
                      : "Active",
                },
                "Updated Successfully!"
              );
            }}
          />
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="agency-details-container">
      <Divider orientation="left">Agency Details</Divider>
      <div className="agency-add-button-container">
        <Button
          type="dashed"
          className="create-button"
          onClick={() => setOpen(true)}
        >
          <span>
            <PlusOutlined />
          </span>
        </Button>
        <Modal
          title={<Divider orientation="left">Create Agency</Divider>}
          open={open}
          style={{ top: 50, bottom: 50 }}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <CreateAgency
            setOpenFalse={{ setOpen, getAgencyDetails, open }}
          ></CreateAgency>
        </Modal>
      </div>

      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ ...setTableHeight(), x: 1800 }}
      ></Table>
      <div className="mt-2">Total {data.length}</div>
    </div>
  );
};

export default AgencyDetails;
