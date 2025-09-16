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
} from "antd";
import "../fileAllocation.scss";
import { useSelector } from "react-redux";
import {
  allocateDigitizedFilesToUser,
  allocateDigitizedFilesToUserAction,
  allocateFilesToUserAction,
  allocateTopologyFilesToUserAction,
  getDepartmentListAction,
  getSelectedUserFilesAction,
  selectedDepartmentListExchange,
  setUserAllocationFeildFalse,
  setUserListEmpty,
} from "../../../store/Actions/BaseAction";
import { useOutletContext } from "react-router-dom";
import { URLS } from "../../../globals/urls";
import "./UserFileExchange.scss";
import { SwapRightOutlined } from "@ant-design/icons";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import { setTableHeight } from "../../../globals/healpers";
const FileExchangeContext = createContext();

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

const SelectUserForm = () => {
  const [form] = Form.useForm();
  const { dispatch } = useOutletContext();
  const selector = useSelector((state) => state.allDepartmentList);
  const userSelector = useSelector((state) => state.fileExchangeUserList);

  const {
    setDepartmentDropdownList,
    getDepartmentList,
    setUserList,
    getUserList,
    setSelectedUserDetails,
    getSelectedFilesKeys,
  } = useContext(FileExchangeContext);

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
    form.resetFields(["user", "assign-user"]);
    const userListUrl =
      URLS.DEPARTMENT_WISE_USER_LIST_URL + departmentDeatils.id;
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

      if (departmentName.name === "Rectify") {
        let url =
          URLS.REALLCOATE_SCAN_UPLOAD_FILE_TO_USER + assingUserId.id + "/";
        dispatch(
          allocateFilesToUserAction({ document_id: selectedFileList, URL: url })
        );
      } else if (departmentName.name === "Digitize") {
        let url = URLS.REALLOCATE_TO_AGENCY_TO_USER + assingUserId.id + "/";
        dispatch(
          allocateDigitizedFilesToUserAction({
            document_id: selectedFileList,
            URL: url,
          })
        );
      } else if (departmentName.name === "QC") {
        let url = URLS.REALLOCATE_QC_FILES_ADMIN_TO_USER + assingUserId.id + "/";
        dispatch(
          allocateDigitizedFilesToUser({
            document_id: selectedFileList,
            URL: url,
          })
        );
      } else if (departmentName.name === "Topology") {
        let url = URLS.ALLOCATE_TOPOLOGY_AGENCY_TO_USER + assingUserId.id + "/";
        dispatch(
          allocateTopologyFilesToUserAction({
            document_id: selectedFileList,
            URL: url,
          })
        );
      }
      setSelectedUserDetails([]);
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
    <div>
      <Form
        form={form}
        layout="inline"
        className="file-exchange-form"
        onFinish={onFinish}
      >
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
        <Form.Item
          name="user"
          rules={[
            {
              required: true,
              message: "Please Select User!",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select User"
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            onChange={handleUser}
            options={getUserList()}
          />
        </Form.Item>
        <span className="file-exchange-form__assign-to">
          <p className="mr-3"> Assing to </p>
          <SwapRightOutlined style={{ fontSize: "20px" }} />
        </span>
        <Form.Item
          name="assign-user"
          rules={[
            {
              required: true,
              message: "Please Select User!",
            },
          ]}
        >
          <Select
            optionFilterProp="label"
            showSearch
            defaultValue="Select User to assign"
            style={{
              width: 300,
              marginBottom: "10px",
            }}
            onChange={handleAssignedUser}
            options={getUserList()}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="search-button mb-2"
          >
            Assign
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const UserFileExchange = () => {
  const [fileExchangeState, exchangeDispatch] = useReducer(
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
    return fileExchangeState.departmentList
      ? fileExchangeState.departmentList
      : [];
  }

  function setUserList(list) {
    exchangeDispatch({
      type: "set_user_list",
      data: list,
    });
  }

  function getUserList() {
    return fileExchangeState.userList ? fileExchangeState.userList : [];
  }

  function setSelectedUserDetails(data) {
    exchangeDispatch({
      type: "set_selected_user_files",
      data: data,
    });
  }

  function getSelectedUserDetails() {
    return fileExchangeState.userFiles;
  }

  function getTableData() {
    return fileExchangeState.tableData;
  }

  function setSelectedFileKeys(data) {
    exchangeDispatch({
      type: "set_selected_file_ids",
      data: data,
    });
  }

  function getSelectedFilesKeys() {
    return fileExchangeState.selectedFiles;
  }

  return (
    <FileExchangeContext.Provider
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
      }}
    >
      <Divider orientation="left">Exchange User Files</Divider>
      <SelectUserForm></SelectUserForm>
      <FileTable></FileTable>
    </FileExchangeContext.Provider>
  );
};

const FileTable = () => {
  const { onShowSizeChange, dispatch } = useOutletContext();
  const { getSelectedUserDetails, setSelectedFileKeys } =
    useContext(FileExchangeContext);
  const columns = [
    {
      title: "Barcode Number",
      dataIndex: "barcode_number",
      width: 200,
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
        bordered
        rowSelection={rowSelection}
        dataSource={getSelectedUserDetails()}
        columns={columns}
        pagination={false}
        scroll={setTableHeight()}
      />
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <Pagination showSizeChanger showQuickJumpers responsive />
    </>
  );
};

export default UserFileExchange;
