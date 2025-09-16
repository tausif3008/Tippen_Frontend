import {
  Button,
  Divider,
  Form,
  Space,
  Input,
  message,
  Select,
  DatePicker,
} from "antd";
import React, { useState, useEffect, createContext, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDraftReportAction,
  getDepartmentList,
  mapTypeListAction,
  setCreateDraftReportFalseAction,
} from "../../../../store/Actions/BaseAction";
// import "../../addUserFrom.scss";
// import "./CreateDistrict.scss";
import DistrictDropdown from "../../../CommonComponents/DistrictDropdown";
import TalukaDropdown from "../../../CommonComponents/TalukaDropdown";

export const CreatePreDraftingReportFormContext = createContext();

const CreateTalukaAdminReducer = (state, action) => {
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
const CreatePreDraftingReportForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [createTalukaAdminState, createTalukaAdminDispatcher] = useReducer(
    CreateTalukaAdminReducer,
    initialState
  );

  const onFinish = (values) => {
    values["district_id"] = JSON.parse(values.district_id).districtId;

    const date = values["pre_drafting_date"];
    values["pre_drafting_date"] =
      date.$y + "-" + (parseInt(date.$M) + 1) + "-" + date.$D;
    dispatch(createDraftReportAction(values));
  };

  function canResetTaluka(val) {
    createTalukaAdminDispatcher({ type: "can_reset_taluka", data: val });
  }

  function getDistrictValueTry(value) {
    createTalukaAdminDispatcher({
      type: "set_district_id",
      data: JSON.parse(value).districtCode,
    });
  }

  function getDistrcitId() {
    return createTalukaAdminState.districtId;
  }

  function getCanResetTaluks() {
    return createTalukaAdminState.canResetTaluka;
  }

  function setTalukaValueSet(value) {}

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

  const preDraftListResultSelector = useSelector(
    (state) => state.createPreDraftReportResult
  );

  useEffect(() => {
    if (preDraftListResultSelector) {
      message.success("Successfully Created!");
      form.resetFields();
      dispatch(setCreateDraftReportFalseAction());
      setOpen(false);
    }
  }, [preDraftListResultSelector]);

  useEffect(() => {
    dispatch(mapTypeListAction());
  }, []);

  const [mapTypeDocumentList, setMapTypeDocumentList] = useState([]);
  const mapTypeDocumentListResultSelector = useSelector(
    (state) => state.mapTypeListResult
  );

  useEffect(() => {
    if (mapTypeDocumentListResultSelector?.data) {
      let mapType = mapTypeDocumentListResultSelector.data.map((element) => {
        return { label: element.map_code, value: element.id };
      });

      setMapTypeDocumentList(mapType);
    }
  }, [mapTypeDocumentListResultSelector]);

  return (
    <CreatePreDraftingReportFormContext.Provider value={{ canResetTaluka }}>
      <div>
        <Divider orientation="left">Pre Drafting Report</Divider>
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
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
          >
            <DistrictDropdown
              getDistrictValueTry={getDistrictValueTry}
              context={CreatePreDraftingReportFormContext}
            ></DistrictDropdown>
            <TalukaDropdown
              districtCode={getDistrcitId()}
              setTalukaValueSet={setTalukaValueSet}
            ></TalukaDropdown>
            <Form.Item
              rules={[{ required: true, message: "This field is required!" }]}
              name="map_type_code"
              label="Map Type"
            >
              <Select
                optionFilterProp="label"
                mode="multiple"
                placeholder="Map Type"
                aria-multiselectable
                options={mapTypeDocumentList.reverse()}
              />
            </Form.Item>
            <Form.Item
              label="Drafting Map Count"
              name="drafting_map_count"
              rules={[
                { required: true, message: "Drafting map count is required!" },
              ]}
            >
              <Input placeholder="Drafting Map Count" />
            </Form.Item>
            <Form.Item
              label="Pre Scanning Count"
              name="pre_scanning_count"
              rules={[
                { required: true, message: " Pre Scanning Count is required!" },
              ]}
            >
              <Input placeholder="Pre Scanning Count" />
            </Form.Item>
            <Form.Item
              labelCol={10}
              label="Correction Uploading Map Count"
              name="correction_uploading_map_count"
              rules={[
                {
                  required: true,
                  message: "Correction Uploading Map Count is required!",
                },
              ]}
            >
              <Input placeholder="Correction Uploading Map Count" />
            </Form.Item>

            <Form.Item
              label="Pre Drafting Date"
              name="pre_drafting_date"
              rules={[
                { required: true, message: "Pre Drafting Date is required!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Remark"
              name="remark"
              rules={[{ required: true, message: "Remark is required!" }]}
            >
              <Input placeholder="Remark" />
            </Form.Item>
          </Space>
          <div className="flex justify-end">
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
    </CreatePreDraftingReportFormContext.Provider>
  );
};

export default CreatePreDraftingReportForm;
