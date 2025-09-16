import { Button, Divider, Form, Input, message, Select, Space } from "antd";
import React, { useState, useEffect, createContext, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createTalukaAdminForm.scss";
import {
  createDistrictAdminAction,
  getDepartmentList,
  setCreateDistrictAdminFalse,
  setTalukaCreateAdminFalse,
} from "../../../../store/Actions/BaseAction";
import "../../addUserFrom.scss";
import "./CreateDistrict.scss";
import DistrictDropdown from "../../../CommonComponents/DistrictDropdown";

export const CreateDistrictAdminFormContext = createContext();

const CreateDistrictAdminReducer = (state, action) => {
  switch (action.type) {
    case "can_reset_taluka": {
      return {
        ...state,
        canResetTaluka: action.data,
      };
    }

    case "set_district_id": {
      return { ...state, districtId: action.data };
    }

    default:
      return state;
  }
};

let initialState = {
  canResetTaluka: false,
  districtId: null,
};

const CreateDistrictAdminForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [createTalukaAdminState, createTalukaAdminDispatcher] = useReducer(
    CreateDistrictAdminReducer,
    initialState
  );

  const onFinish = (values) => {
    values["district_id"] = JSON.parse(values.district_id).districtId;
    dispatch(createDistrictAdminAction(values));
  };

  function canResetTaluka(val) {
    createTalukaAdminDispatcher({ type: "can_reset_taluka", data: val });
  }

  const createDistrctResult = useSelector(
    (state) => state.createDistrictAdminResult
  );

  useEffect(() => {
    if (createDistrctResult) {
      // message.success("District Created Successfully!");
      form.resetFields();
      dispatch(setCreateDistrictAdminFalse());
    }
  }, [createDistrctResult]);

  function getDistrictValueTry(value) {
    createTalukaAdminDispatcher({
      type: "set_district_id",
      data: JSON.parse(value).districtCode,
    });
  }

  function getCanResetTaluks() {
    return createTalukaAdminState.canResetTaluka;
  }

  useEffect(() => {
    if (getCanResetTaluks()) {
      canResetTaluka(false);
      form.resetFields(["taluka_id"]);
    }
  }, [getCanResetTaluks()]);

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
    dispatch(getDepartmentList({}));
  }, []);

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

  const districtListResultSelector = useSelector(
    (state) => state.createDistrictAdminResult
  );

  useEffect(() => {
    if (districtListResultSelector) {
      message.success("Successfully Created!");
      form.resetFields();
      dispatch(setTalukaCreateAdminFalse());
    }
  }, [districtListResultSelector]);

  return (
    <CreateDistrictAdminFormContext.Provider value={{ canResetTaluka }}>
      <div>
        <Divider orientation="left"> Create District Admin Form</Divider>
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
          <Space
            wrap
            className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2"
          >
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "First name is required!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Last name is required!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              type="email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="mobile_number"
              rules={[
                { required: true, message: "Mobile Number is required!" },
                { validator: validator },
              ]}
            >
              <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Mobile Number is required!" },
              ]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Aadhar Number"
              name="aadhar_no"
              rules={[
                { required: true, message: "Aadhar Number is required!" },
                { validator: validator },
              ]}
            >
              <Input placeholder="Aadhar Number" />
            </Form.Item>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Department Number is required!" },
              ]}
            >
              <Select
                optionFilterProp="label"
                showSearch
                placeholder={"Select Department"}
                mode="multiple"
              >
                {allDepartments && allDepartments}
              </Select>
            </Form.Item>
            <DistrictDropdown
              getDistrictValueTry={getDistrictValueTry}
              context={CreateDistrictAdminFormContext}
            ></DistrictDropdown>
          </Space>
          <div className="submit-button">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="search-button"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </CreateDistrictAdminFormContext.Provider>
  );
};

export default CreateDistrictAdminForm;
