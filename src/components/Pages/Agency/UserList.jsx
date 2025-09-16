import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAgencyUserAction,
  deactivateUserAction,
  getDepartmentList,
  updateUserDetalsAction,
  userDetailspaginationAction,
  userWiseDcocumentList,
} from "../../../store/Actions/BaseAction";
import "./UserList.scss";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Select,
  Table,
  message,
  Switch,
} from "antd";
import { setTableHeight } from "../../../globals/healpers";
import { URLS } from "../../../globals/urls";
import { API_CONSTANTS } from "../../../globals/ApiConstants";
import {
  EditOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

function AddUserForm({ formRef }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  form.resetFields();
  formRef.current && form.setFieldsValue(formRef.current);

  const [allDepartments, setallDepartmens] = useState(null);
  const allDepartmentListSelector = useSelector(
    (state) => state.allDepartmentList
  );

  if (!allDepartments && allDepartmentListSelector) {
    const departmentListt = allDepartmentListSelector.data.map(
      (element, index) => {
        return (
          <Select.Option key={index} value={element.id}>
            {element.department_name}
          </Select.Option>
        );
      }
    );
    setallDepartmens(departmentListt);
  }

  useEffect(() => {
    if (!allDepartmentListSelector) dispatch(getDepartmentList({}));
  }, []);

  const onFinish = (val) => {
    if (formRef.current) {
      const url = URLS.UPDATE_AGENCY_USER_URL + formRef.current.id + "/";
      dispatch(updateUserDetalsAction({ val, URL: url }));
    } else {
      dispatch(addAgencyUserAction(val));
    }
  };

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
    <div className="ant-form-component">
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="form-elements">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input
              style={{ width: "100%" }}
              disabled={formRef.current && true}
            />
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required!",
              },
            ]}
          >
            <Input type="email" disabled={formRef.current && true} />
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
            <InputNumber
              disabled={formRef.current && true}
              style={{ display: "flex", width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Aadhar Number"
            name="aadhar_no"
            rules={[
              {
                required: true,
                message: "Aadhar numeber is required!",
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

          <Form.Item
            label="Department"
            name="department"
            rules={[
              {
                required: true,
                message: "Department feild is required!",
              },
            ]}
          >
            <Select
              optionFilterProp="label"
              showSearch
              placeholder={"select department"}
              mode="multiple"
            >
              {allDepartments && allDepartments}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item className="form-submit-btn">
            <Button type="primary" htmlType="submit" className="search-button">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

const UserDocumentCount = () => {
  const dispatch = useDispatch();
  const { onShowSizeChange } = useOutletContext();
  const formRef = useRef();
  const [dataSource, setdataSource] = useState([]);

  const addAgencyUserResponse = useSelector(
    (state) => state.addAgencyUserResponse
  );

  useEffect(() => {
    if (addAgencyUserResponse) {
      setOpen(false);

      if (formRef.current)
        message.success("User Details Updated successfully!");
      else message.success("User create successfully!");

      dispatch({
        type: API_CONSTANTS.SET_USER_CREATION_FORM_SUBMISSION_RESULT,
      });
      dispatch(userWiseDcocumentList({}));
    }
  }, [addAgencyUserResponse]);

  const userListSelector = useSelector(
    (state) => state.agencyUserDocumentCountList
  );

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 240,
    },

    {
      title: "Aadhar Number",
      dataIndex: "aadhar_no",
      key: "aadhar_no",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "View Details",
      dataIndex: "viewDetails",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "active_status",
      key: "status",
      render: (record, a) => {
        return (
          <div key={a.id}>
            <Switch
              key={a.id}
              size="small"
              defaultChecked={record === "Active"}
              onChange={(e) => deactivateUser(e, a.id)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </div>
        );
      },
    },
  ];

  const [currentPageSize, setCurrentPageSize] = useState(20);

  const deactivateUser = (checked, id) => {
    const url = URLS.UPDATE_AGENCY_USER_URL + id + "/";
    dispatch(
      deactivateUserAction({
        url,
        payload: { active_status: checked ? "Active" : "Inactive" },
      })
    );
  };

  useEffect(() => {
    if (!userListSelector) dispatch(userWiseDcocumentList({}));
  }, []);

  function getDetails(detils) {
    formRef.current = detils;
    setOpen(true);
    setmodalTitle("Update User Details");
  }

  const [totalCount, settotalCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [modalTitle, setmodalTitle] = useState("Create User");
  const [useUrl, setuseUrl] = useState(URLS.AGENCY_USERS_LIST_URL);

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function paginationPageChange(page, pageSize) {
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(userDetailspaginationAction({ URL: url }));
  }

  useEffect(() => {
    if (userListSelector) {
      let userDetailsList = [];
      const userList = userListSelector.results;

      for (let index = 0; index < userList.length; index++) {
        let element = userList[index];
        element["viewDetails"] = (
          <Button className="edit-button" onClick={() => getDetails(element)}>
            <span>
              <EditOutlined></EditOutlined>
            </span>
          </Button>
        );
        userDetailsList.push(element);
      }

      settotalCount(userListSelector.count);
      setCurrentPageSize(userListSelector.per_page_count);
      setdataSource(userList);
    }
  }, [userListSelector]);

  // ------- Modal -------

  const [open, setOpen] = useState(false);
  function resetFormFun() {
    setOpen(false);
  }

  const showModal = () => {
    formRef.current = null;
    setmodalTitle("Add User");
    setOpen(true);
  };

  return (
    <div className="user-list-container-agency">
      <Divider orientation="left">User Details</Divider>
      <div className="user-add-button-container">
        <Button
          type="dashed"
          onClick={() => showModal()}
          className="create-button"
        >
          <span>
            <PlusOutlined></PlusOutlined>
          </span>
        </Button>
      </div>
      <Modal
        width={800}
        style={{ top: 50 }}
        title={
          <Divider
            orientation="left"
            style={{ color: "black", borderColor: "black" }}
          >
            {modalTitle}
          </Divider>
        }
        onCancel={() => {
          resetFormFun();
        }}
        open={open}
      >
        <AddUserForm formRef={formRef}></AddUserForm>
      </Modal>

      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ ...setTableHeight(), x: 1400 }}
      ></Table>
      <div className="mt-2"></div>
      <div className="flex justify-end">
        <Pagination
          onShowSizeChange={onShowSizeChange}
          showSizeChanger
          responsive
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
        />
      </div>
    </div>
  );
};

export default UserDocumentCount;
