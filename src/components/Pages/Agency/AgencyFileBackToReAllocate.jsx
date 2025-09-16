import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  Button,
  Divider,
  Form,
  Pagination,
  Select,
  Space,
  Table,
  message,
  Collapse,
  Input,
} from "antd";
import "../fileAllocation.scss";
import { useSelector } from "react-redux";
import {
  allocateDigitizedFilesToUser,
  allocateDigitizedFilesToUserAction,
  allocateFilesToUserAction,
  getDepartmentListAction,
  getSelectedUserFilesAction,
  selectedDepartmentListExchange,
  setUserAllocationFeildFalse,
  setUserListEmpty,
  agencyListingAction,
} from "../../../store/Actions/BaseAction";
import { useOutletContext } from "react-router-dom";
import { URLS } from "../../../globals/urls";
import "./AgencyFileBackToReAllocate.scss";
import { SwapRightOutlined, SearchOutlined } from "@ant-design/icons";

const AgencyFileReAllocateContext = createContext();

const FileExchangeReducer = (state, action) => {
  switch (action.type) {
    case "set_department_dropdown": {
      return {
        ...state,
        departmentList: action.data,
      };
    }

    case "set_table_data": {
      return {
        ...state,
        tableData: action.data,
      };
    }

    case "set_user_list": {
      return { ...state, userList: action.data };
    }

    case "set_agency_list": {
      return { ...state, agencyList: action.data };
    }

    case "set_selected_user_files": {
      return { ...state, userFiles: action.data };
    }

    case "assing_file_to_another_user": {
      return {
        ...state,
        canAssign: action.data,
      };
    }

    case "set_selected_file_ids": {
      return {
        ...state,
        selectedFiles: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

// const SearchForm = () => {
//   function onFinish(values) {}
//   return (
//     <Collapse
//       className="file-exchange-collapse-search-form-container"
//       items={[
//         {
//           key: "1",
//           label: <SearchOutlined></SearchOutlined>,
//           children: (
//             <div className="file-exchange-search-form-container">
//               <Form
//                 className="search-form-container__form"
//                 onFinish={onFinish}
//                 layout="inline"
//               >
//                 <Form.Item name="file_name">
//                   <Input placeholder="File Name"></Input>
//                 </Form.Item>
//                 <Form.Item name="barcode_number">
//                   <Input placeholder="Barcode Number"></Input>
//                 </Form.Item>
//                 <Form.Item name="village_name">
//                   <Input name="Village Name"></Input>
//                 </Form.Item>
//                 <Form.Item name="village_code">
//                   <Input placeholder="Village Code"></Input>
//                 </Form.Item>
//                 <Form.Item name="taluka_name">
//                   <Input placeholder="Taluka Name"></Input>
//                 </Form.Item>
//                 <Form.Item name="taluka_code">
//                   <Input placeholder="Taluka Code"></Input>
//                 </Form.Item>
//                 <Form.Item name="district_name">
//                   <Input placeholder="District Name"></Input>
//                 </Form.Item>
//                 <Form.Item name="district_code">
//                   <Input placeholder="District Code"></Input>
//                 </Form.Item>
//                 <Form.Item name="map_code">
//                   <Input placeholder="Map Code"></Input>
//                 </Form.Item>
//               </Form>
//             </div>
//           ),
//         },
//       ]}
//     />
//   );
// };

const SelectUserForm = () => {
  const [form] = Form.useForm();
  const { dispatch } = useOutletContext();
  const selector = useSelector((state) => state.allDepartmentList);
  const userSelector = useSelector((state) => state.agencyFileExchangeList);

  const {
    setDepartmentDropdownList,
    getDepartmentList,
    setUserList,
    getUserList,
    setSelectedUserDetails,
    getSelectedFilesKeys,
    setAgencyList,
    getAgencyList,
  } = useContext(AgencyFileReAllocateContext);

  const [selectCurrentStatus, setselectCurrentStatus] = useState([]);

  //================================
  const [selectedAgencyID, setselectedAgencyID] = useState(null);
  const [selectAgency, setselectAgency] = useState([]);

  const handleAgency = (value) => {
    setselectedAgencyID(value);
  };
  const agencySelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    if (!agencySelector)
      dispatch(agencyListingAction({ URL: URLS.GET_AGENCIES_LIST_URL }));
  }, []);

  useEffect(() => {
    let agencies = [];
    if (agencySelector) {
      for (let index = 0; index < agencySelector.length; index++) {
        agencies.push({
          value: agencySelector[index]["id"],
          label: agencySelector[index]["agency_name"],
        });
      }
      setselectAgency(agencies);
    }
  }, [agencySelector]);

  //================================

  const currentStausSelector = useSelector((state) => state.agencyList);

  useEffect(() => {
    let current_status_options = [];
    if (currentStausSelector) {
      for (let index = 0; index < currentStausSelector.length; index++) {
        current_status_options.push({
          value: currentStausSelector[index]["id"],
          label: currentStausSelector[index]["agency_name"],
        });
      }
      setselectCurrentStatus(current_status_options);
    }
  }, [currentStausSelector]);

  useEffect(() => {
    dispatch(getDepartmentListAction());
  }, []);

  const selectedDepartmentName = form.getFieldValue("department");
  useEffect(() => {
    if (!selectedDepartmentName) {
      form.resetFields(["user"]);
      dispatch(setUserListEmpty());
    }
  }, [selectedDepartmentName]);

  useEffect(() => {
    if (selector?.data) {
      let data = [];

      for (const el of selector.data) {
        data.push({
          label: el.department_name,
          value: JSON.stringify({ id: el.id, name: el.department_name }),
        });
      }
      setDepartmentDropdownList(data);
    }
  }, [selector]);

  const handleDepartment = (departmentDeatils) => {
    departmentDeatils = JSON.parse(departmentDeatils);

    let get_deptwise_status = "Rectify Allocated";

    if (departmentDeatils["name"] === "Digitize") {
      get_deptwise_status = "Digitize Allocated";
    } else if (departmentDeatils["name"] === "Rectify") {
      get_deptwise_status = "Digitize Allocated";
    } else if (departmentDeatils["name"] === "QC") {
      get_deptwise_status = "QC Allocated";
    }
    form.resetFields(["user", "assign-user"]);
    const userListUrl =
      URLS.GET_AGENCY_WISE_ALLOCATED_LIST_URL +
      "current_status=" +
      get_deptwise_status +
      "&agency_name=MetaMind_Agency";
    //Rectify Allocated, Digitize Allocated, Qc Allocated
    dispatch(selectedDepartmentListExchange({ URL: userListUrl }));
  };

  useEffect(() => {
    if (userSelector?.data1) {
      const userSelectorList = [];
      for (const el of userSelector.data1) {
        userSelectorList.push({
          label: el.username,
          value: JSON.stringify({ id: el.id, name: el.username }),
        });
      }
      setUserList(userSelectorList);
    } else {
      setUserList([]);
    }
  }, [userSelector]);

  function handleUser(value) {
    let urlExtented =
      JSON.parse(selectedDepartmentName).name.toLowerCase() +
      "_by_username=" +
      JSON.parse(value).name;

    let fileStatus =
      "&current_status=" + JSON.parse(selectedDepartmentName).name;

    dispatch(
      getSelectedUserFilesAction({
        username: urlExtented,
        current_status: fileStatus,
      })
    );
  }

  function handleAssignedUser(value) {}

  const selectedUserFilesResultSelector = useSelector(
    (state) => state.selectedUserFilesResult
  );

  useEffect(() => {
    if (selectedUserFilesResultSelector?.results) {
      let rawData = selectedUserFilesResultSelector.results;
      const filtererdData = rawData.map((element) => {
        return {
          key: element?.id,
          ...element,
          district: element?.district_name?.district_name,
          village: element?.village_name?.village_name,
          taluka: element?.taluka_name?.taluka_name,
        };
      });

      setSelectedUserDetails(filtererdData);
    }
  }, [selectedUserFilesResultSelector]);

  function onFinish(value) {
    const selectedFileList = getSelectedFilesKeys();

    if (selectedFileList.length !== 0) {
      let departmentName = JSON.parse(selectedDepartmentName);
      let assingUserId = JSON.parse(value["assign-user"]);

      // if (departmentName.name === "Rectify") {
      //   let url =
      //     URLS.ALLCOATE_SCAN_UPLOAD_FILE_TO_USER + assingUserId.id + "/";
      //   dispatch(
      //     allocateFilesToUserAction({ document_id: selectedFileList, URL: url })
      //   );
      // } else if (departmentName.name === "Digitize") {
      //   let url = URLS.ALLOCATE_TO_AGENCY_TO_USER + assingUserId.id + "/";
      //   dispatch(
      //     allocateDigitizedFilesToUserAction({
      //       document_id: selectedFileList,
      //       URL: url,
      //     })
      //   );
      // } else if (departmentName.name === "QC") {
      //   let url = URLS.ALLOCATE_QC_FILES_ADMIN_TO_USER + assingUserId.id + "/";
      //   dispatch(
      //     allocateDigitizedFilesToUser({
      //       document_id: selectedFileList,
      //       URL: url,
      //     })
      //   );
      // }
      // setSelectedUserDetails([]);
    } else {
      message.info("Please Select Some Files!");
    }
  }

  const userFileAllocationSelector = useSelector(
    (state) => state.userAllocation
  );

  useEffect(() => {
    if (userFileAllocationSelector && getSelectedFilesKeys.length === 0) {
      handleUser(form.getFieldValue(["user"]));
      dispatch(setUserAllocationFeildFalse());
    }
  }, [userFileAllocationSelector, getSelectedFilesKeys]);

  return (
    <div className="file-exchange-form-container">
      <Form
        form={form}
        layout="inline"
        className="file-exchange-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="agency"
          rules={[
            {
              required: true,
              message: "Please Select Agency!",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select Agency"
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            onChange={handleAgency}
            options={selectAgency}
          />
        </Form.Item>

        <Form.Item
          name="department"
          rules={[
            {
              required: true,
              message: "Please Select Department!",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select Department"
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            onChange={(e) => handleDepartment(e)}
            options={getDepartmentList()}
          />
        </Form.Item>

        <span className="file-exchange-form__assign-to">
          <p>Assing</p>
          <SwapRightOutlined style={{ fontSize: "20px" }} />
        </span>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AgencyFileExchange = () => {
  const [agencyFileExchangeState, exchangeDispatch] = useReducer(
    FileExchangeReducer,
    {
      selectedFiles: [],
    }
  );

  const lodingFromState = useSelector((state) => state.loading);

  // Reducer Actions
  function setDepartmentDropdownList(data) {
    exchangeDispatch({
      type: "set_department_dropdown",
      data: data,
    });
  }

  function getDepartmentList() {
    return agencyFileExchangeState.departmentList
      ? agencyFileExchangeState.departmentList
      : [];
  }

  function setUserList(list) {
    exchangeDispatch({
      type: "set_user_list",
      data: list,
    });
  }

  function getUserList() {
    return agencyFileExchangeState.userList
      ? agencyFileExchangeState.userList
      : [];
  }

  function setAgencyList(list) {
    exchangeDispatch({
      type: "set_agency_list",
      data: list,
    });
  }

  function getAgencyList() {
    return agencyFileExchangeState.agencyList
      ? agencyFileExchangeState.agencyList
      : [];
  }

  function setSelectedUserDetails(data) {
    exchangeDispatch({
      type: "set_selected_user_files",
      data: data,
    });
  }

  function getSelectedUserDetails() {
    return agencyFileExchangeState.userFiles;
  }

  function getTableData() {
    return agencyFileExchangeState.tableData;
  }

  function setSelectedFileKeys(data) {
    exchangeDispatch({
      type: "set_selected_file_ids",
      data: data,
    });
  }

  function getSelectedFilesKeys() {
    return agencyFileExchangeState.selectedFiles;
  }

  return (
    <>
      <AgencyFileReAllocateContext.Provider
        value={{
          setDepartmentDropdownList,
          getDepartmentList,
          getTableData,
          setUserList,
          getUserList,
          setSelectedUserDetails,
          getSelectedUserDetails,
          setSelectedFileKeys,
          getSelectedFilesKeys,
          setAgencyList,
          getAgencyList,
        }}
      >
        <Divider orientation="left">Agency File Back To Re Allocate</Divider>
        <Space
          direction="vertical"
          wrap
          style={{ display: "flex" }}
          className="file-exchange-space"
        >
          {/* <Select 
optionFilterProp="label"
UserForm></SelectUserForm> */}
          {/* <SearchForm></SearchForm> */}
          {/* <FileTable></FileTable> */}
        </Space>
      </AgencyFileReAllocateContext.Provider>
    </>
  );
};

const FileTable = () => {
  const { onShowSizeChange, dispatch } = useOutletContext();
  const { getSelectedUserDetails, setSelectedFileKeys } = useContext(
    AgencyFileReAllocateContext
  );
  const columns = [
    {
      title: "Barcode Number",
      dataIndex: "barcode_number",
    },
    {
      title: "District",
      dataIndex: "district",
    },
    {
      title: "Taluka",
      dataIndex: "taluka",
    },
    {
      title: "Village",
      dataIndex: "village",
    },
    {
      title: "Map Code",
      dataIndex: "map_code",
    },
    {
      title: "Current Status",
      dataIndex: "current_status",
    },
  ];

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Button type="primary">Prev</Button>;
    }

    if (type === "next") {
      return <Button type="primary">Next</Button>;
    }

    return originalElement;
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedFileKeys(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const userFileAllocationSelector = useSelector(
    (state) => state.userAllocation
  );
  useEffect(() => {
    if (userFileAllocationSelector) {
      setSelectedRowKeys([]);
      setSelectedFileKeys([]);
    }
  }, [userFileAllocationSelector]);

  return (
    <>
      <Table
        rowSelection={rowSelection}
        dataSource={getSelectedUserDetails()}
        columns={columns}
        pagination={false}
      />
      <Pagination
        showSizeChanger
        showQuickJumpers
        itemRender={itemRender}
        style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
      />
    </>
  );
};

export default AgencyFileExchange;
