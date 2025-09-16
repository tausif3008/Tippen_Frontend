import {
  Form,
  Space,
  Button,
  Divider,
  InputNumber,
  Input,
  DatePicker,
  message,
  Select,
} from "antd";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./CreatePrescannedDocument.scss";
import TalukaDropdown from "../../CommonComponents/TalukaDropdown";
import DistrictDropdown from "../../CommonComponents/DistrictDropdown";
import {
  mapTypeListAction,
  postPrescanDocumentAction,
  setPostPrescanDocumentFalseAction,
} from "../../../store/Actions/BaseAction";
import { useOutletContext } from "react-router";
import { useSelector } from "react-redux";

export const CreatePrescanDocumentContext = createContext();

function CreatePrescanDocumentReducer(state, action) {
  switch (action.type) {
    case "set_district_value": {
      return {
        ...state,
        districtId: action.payload.districtId,
      };
    }

    case "set_taluks_value": {
      return {
        ...state,
        talukaId: action.payload.talukaId,
      };
    }

    case "can_reset_taluka": {
      return {
        ...state,
        canResetTaluka: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const CreatePrescanDocument = () => {
  const [createPrescanDocumentState, createPrescanDocumentDispatch] =
    useReducer(CreatePrescanDocumentReducer, { districtId: null });

  function getDistrictValue() {
    return createPrescanDocumentState.districtId;
  }

  function setDistrictValue(districtId) {
    createPrescanDocumentDispatch({
      type: "set_district_value",
      payload: { districtId: districtId },
    });
  }

  function setTalukaId(talukaId) {
    createPrescanDocumentDispatch({
      type: "set_taluks_value",
      payload: { talukaId },
    });
  }

  function canResetTaluka(value) {
    createPrescanDocumentDispatch({
      type: "can_reset_taluka",
      payload: value,
    });
  }

  function getCanResetTaluks() {
    return createPrescanDocumentState.canResetTaluka;
  }

  function getTalukaId() {
    return createPrescanDocumentState.talukaId;
  }

  return (
    <div>
      {
        <CreatePrescanDocumentContext.Provider
          value={{
            getDistrictValue,
            setDistrictValue,
            setTalukaId,
            getTalukaId,
            canResetTaluka,
            getCanResetTaluks,
          }}
        >
          <CreatePrescanDocumentForm></CreatePrescanDocumentForm>
        </CreatePrescanDocumentContext.Provider>
      }
    </div>
  );
};

const CreatePrescanDocumentForm = () => {
  const [form] = Form.useForm();
  const {
    getDistrictValue,
    setDistrictValue,
    setTalukaId,
    getTalukaId,
    getCanResetTaluks,
    canResetTaluka,
  } = useContext(CreatePrescanDocumentContext);

  let districtCode = JSON.parse(getDistrictValue())?.districtCode;
  const { dispatch } = useOutletContext();

  function onFinish(values) {
    values["taluka_id"] = getTalukaId();
    values["district_id"] = JSON.parse(getDistrictValue()).districtId;
    let mis_date = values["mis_date"];
    let final_mis_date =
      mis_date.$y + "-" + (mis_date.$M + 1) + "-" + mis_date.$D;
    values.mis_date = final_mis_date;
    dispatch(postPrescanDocumentAction(values));
  }

  function getDistrictValueTry(value) {
    setDistrictValue(value);
  }

  useEffect(() => {
    if (getCanResetTaluks()) {
      canResetTaluka(false);
      form.resetFields(["taluka_id"]);
    }
  }, [getCanResetTaluks()]);

  function setTalukaValueSet(value) {
    setTalukaId(value);
  }

  const postPreScanResult = useSelector(
    (state) => state.postPrescanDetailsResult
  );

  useEffect(() => {
    if (postPreScanResult) {
      message.success("Successfully Created!");
      form.resetFields();
      dispatch(setPostPrescanDocumentFalseAction());
    }
  }, [postPreScanResult]);

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
    <div className="create-prescanned-document-container">
      <Divider orientation="left">Create Prescan Document</Divider>
      <Form
        form={form}
        name="searchForm"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ maxWidth: "95%", margin: "auto" }}
      >
        <Space className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 p-3">
          <DistrictDropdown
            context={CreatePrescanDocumentContext}
            getDistrictValueTry={getDistrictValueTry}
          ></DistrictDropdown>
          <TalukaDropdown
            districtCode={districtCode}
            setTalukaValueSet={setTalukaValueSet}
          ></TalukaDropdown>
          <Form.Item
            rules={[{ required: false, message: "This field is required!" }]}
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
            rules={[{ required: true, message: "This field is required!" }]}
            name="doc_received_count"
            label="Document Received Count"
          >
            <InputNumber placeholder="Document Received Count" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="pre_scanning_count"
            label="Pre Scanning Count"
          >
            <InputNumber placeholder="Pre Scanning Count" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="scanning_complete_count"
            label="Scanning Complete Count"
          >
            <InputNumber placeholder="Scanning Complete Count" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="rescanning_count"
            label="Rescanning Count"
          >
            <InputNumber placeholder="Rescanning Count" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="document_return"
            label="Document Return"
          >
            <InputNumber placeholder="Document Return" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="number_of_people_present"
            label="Number of people Present"
          >
            <InputNumber placeholder="Number of people Present" />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="document_rejected"
            label="Document Rejected"
          >
            <Input placeholder="Document Rejected"></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="mis_date"
            label="Mis Date"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
            name="remark"
            label="Remark"
          >
            <Input placeholder="Remark" />
          </Form.Item>
        </Space>
        <div className="flex justify-end mb-4">
          <Form.Item
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="search-button mr-2"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreatePrescanDocument;
