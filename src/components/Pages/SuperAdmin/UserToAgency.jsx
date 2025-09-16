import React, { useEffect, useState } from "react";
import CommonDivider from "../../CommonComponents/CommonDivider";
import { Form, Input, Select, Table, Pagination, Button, message } from "antd";
import { useOutletContext } from "react-router";
import {
  getAgencyListing,
  getDepartmentList,
  getFilesFromAgency,
  retrieveFilesFromAgency,
  retrieveFilesFromAgencyFalse,
  setGetFilesFromAgencyFalse,
} from "../../../store/Actions/BaseAction";
import { useSelector } from "react-redux";
import { getSearchingUrl, setTableHeight } from "../../../globals/healpers";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const UserToAgency = () => {
  const { dispatch, onShowSizeChange } = useOutletContext();

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

  const [agencyFileList, setAgencyFileList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [totalCount, settotalCount] = useState(1);
  const [agencyDetails, setAgencyDetails] = useState([]);
  const [searchParamsAgency, setSearchParamsAgency] = useState(false);
  const [status, setStatus] = useState("");

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function paginationPageChange(page, pageSize) {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    let params = getSearchingUrl(
      searchParamsAgency,
      Object.keys(searchParamsAgency)
    );

    dispatch(retrieveFilesFromAgency("", params + "page=" + page));
  }

  const agencyFileSelector = useSelector((state) => state.retrieveFileResult);

  useEffect(() => {
    return () => {
      dispatch(retrieveFilesFromAgencyFalse());
    };
  }, []);

  useEffect(() => {
    if (agencyFileSelector?.results) {
      let finalList = agencyFileSelector.results.map((el) => {
        return {
          key: el.id,
          district: el?.district_name?.district_name,
          taluka: el?.taluka_name?.taluka_name,
          village: el?.village_name?.village_name,
          barcode_number: el?.barcode_number,
          map_code: el?.map_code,
          current_status: el?.current_status,
        };
      });

      setAgencyFileList(finalList);
      settotalCount(agencyFileSelector.count);
      setCurrentPage(agencyFileSelector.current_page);
      setCurrentPageSize(agencyFileSelector.per_page_count);
    }
  }, [agencyFileSelector]);

  const [form] = Form.useForm();

  function getAgencyDetails() {
    dispatch(getAgencyListing({}));
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
      let list = agencyListSelector.map((el) => {
        return {
          label: el?.agency_name,
          value: el?.agency_name,
        };
      });

      setAgencyDetails(list);
    }
  }, [agencyListSelector]);

  const handleAgencyChange = (agency) => {
    setSearchParamsAgency(agency);
  };

  useEffect(() => {
    if (searchParamsAgency) {
      let params = getSearchingUrl(
        searchParamsAgency,
        Object.keys(searchParamsAgency)
      );
      dispatch(retrieveFilesFromAgency("", params + "page=" + 1));
    }
  }, [searchParamsAgency]);

  const selector = useSelector((state) => state.allDepartmentList);

  useEffect(() => {
    if (!selector) dispatch(getDepartmentList({}));
  }, []);

  const [departmentLists, setdepartmentLists] = useState([]);

  useEffect(() => {
    if (selector?.data) {
      let departmentId = [];
      let list = selector.data;

      for (let index = 0; index < list.length; index++) {
        if (list[index].department_name !== "Scan") {
          departmentId.push({
            value: list[index].department_name.toLowerCase(),
            label: list[index].department_name,
          });
        }
      }

      setdepartmentLists(departmentId);
    }
  }, [selector]);

  const [formValues, setFormValues] = useState(false);

  const handleDepartment = (e) => {
    const formData = new FormData();

    console.log(formData);
    //file.forEach((element) => {
    // formData.append("files", element);
    //});

    let val = {
      [e.department.toLowerCase() + "_agency_name"]: e.agency_name,
      current_status: e.department.toLowerCase() + " " + status,
      barcode_number: e.barcode_number,
      district_code: e.district_code,
      district_name: e.district_name,
      taluka_code: e.taluka_code,
      taluka_name: e.taluka_name,
      village_code: e.village_code,
      village_name: e.village_name,
      map_code: e.map_code,
    };

    handleAgencyChange(val);
  };
  useEffect(() => {
    if (formValues) {
      handleDepartment(formValues);
    }
  }, [formValues]);

  const handleFileRetrieval = () => {
    let department = form.getFieldsValue();
    dispatch(
      getFilesFromAgency({
        action: department.department,
        payload: { document_id: selectedRowKeys },
      })
    );
  };

  const handleDepartmentChange = () => {
    form.resetFields(["agency_name"]);
    setAgencyFileList([]);
  };

  const getFileFromAgencyResultSelector = useSelector(
    (state) => state.getFileFromAgencyResult
  );

  useEffect(() => {
    if (getFileFromAgencyResultSelector) {
      setSelectedRowKeys([]);
      let feildsVal = form.getFieldValue();
      let val = {
        [feildsVal.department.toLowerCase() + "_agency_name"]:
          feildsVal.agency_name,
        current_status: feildsVal.department.toLowerCase(),
      };
      handleAgencyChange(val);
      message.success(getFileFromAgencyResultSelector.message);
      dispatch(setGetFilesFromAgencyFalse());
    }
  }, [getFileFromAgencyResultSelector]);

  return (
    <div>
      <CommonDivider title={"Retrieve Files From Agency"}> </CommonDivider>
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) =>
          JSON.stringify(v) !== JSON.stringify(formValues)
            ? setFormValues(v)
            : "console.log(selectedRowKeys)"
        }
      >
        <div className="flex gap-3 items-center flex-wrap">
          <Form.Item
            noStyle
            label="Select Department"
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
              placeholder="Select Department"
              showSearch
              style={{
                width: 300,
              }}
              options={departmentLists}
              onChange={handleDepartmentChange}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="agency_name"
            label="Agency"
            rules={[
              {
                required: true,
                message: "Please Select Agency!",
              },
            ]}
          >
            <Select
              optionFilterProp="label"
              style={{ width: "300px" }}
              placeholder="Select Agency"
              options={agencyDetails}
              onChange={() => setAgencyFileList([])}
            ></Select>
          </Form.Item>
          <Form.Item noStyle name="current_status" label="status">
            <Select
              optionFilterProp="label"
              style={{ width: "300px" }}
              placeholder="Select Status"
              options={[
                { label: "Allocated", value: "Allocated" },
                { label: "Inprocess", value: "Inprocess" },
                { label: "Rejected", value: "Rejected" },
              ]}
              onChange={setStatus}
            ></Select>
          </Form.Item>
          <div className="w-full"></div> {/* new line */}
          <Form.Item name="barcode_number">
            <Input placeholder="Barcode Number" />
          </Form.Item>
          <Form.Item name="district_code" style={{ width: "120px" }}>
            <Input placeholder="District Code" />
          </Form.Item>
          <Form.Item name="district_name">
            <Input placeholder="District Name" />
          </Form.Item>
          <Form.Item name="taluka_code" style={{ width: "120px" }}>
            <Input placeholder="Taluka Code" />
          </Form.Item>
          <Form.Item name="taluka_name">
            <Input placeholder="Taluka Name" />
          </Form.Item>
          <Form.Item name="village_code" style={{ width: "120px" }}>
            <Input placeholder="Village Code" />
          </Form.Item>
          <Form.Item name="village_name">
            <Input placeholder="Village Name" />
          </Form.Item>
          <Form.Item name="map_code" style={{ width: "120px" }}>
            <Input placeholder="Map Code" />
          </Form.Item>
          <div className="w-full"></div> {/* new line */}
          <Form.Item className="mt-7" noStyle>
            <Button htmlType="submit" className="search-button">
              <span> Search </span>
            </Button>
          </Form.Item>
        </div>
      </Form>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

      <Table
        bordered
        rowSelection={rowSelection}
        dataSource={agencyFileList}
        columns={columns}
        pagination={false}
        scroll={setTableHeight()}
      />
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <div className="flex ml-auto">
        <Pagination
          responsive
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
          style={{ marginTop: "15px", display: "flex", alignItems: "end" }}
        />
      </div>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <div className="flex flex-col justify-center mt-10">
        <Button
          disabled={selectedRowKeys.length === 0}
          className={`${
            selectedRowKeys.length > 0 ? "download-button" : ""
          } w-36 m-auto`}
          onClick={handleFileRetrieval}
        >
          Retrieve Files
        </Button>
      </div>
    </div>
  );
};

export default UserToAgency;
// const UserToAgency = () => {
//   // variables
//   const { dispatch } = useOutletContext();
//   const [userFiles, setUserFiles] = useState([]);
//   const [userListData, setUserListData] = useState([]);

//   const [departmentDropdownList, setDepartmentDropdownList] = useState([]);
//   const [form] = Form.useForm();
//   const selector = useSelector((state) => state.allDepartmentList);
//   const [selectedUserDetails, setSelectedUserDetails] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState(false);

// const columns = [
//   {
//     title: "Barcode Number",
//     dataIndex: "barcode_number",
//     width: 200,
//   },
//   {
//     title: "District",
//     dataIndex: "district",
//   },
//   {
//     title: "Taluka",
//     dataIndex: "taluka",
//   },
//   {
//     title: "Village",
//     dataIndex: "village",
//   },
//   {
//     title: "Map Code",
//     dataIndex: "map_code",
//   },
//   {
//     title: "Current Status",
//     dataIndex: "current_status",
//   },
// ];

//   useEffect(() => {
//     if (!selector) dispatch(getDepartmentListAction());
//   }, []);

//   const selectedDepartmentName = form.getFieldValue("department");
//   useEffect(() => {
//     if (!selectedDepartmentName) {
//       form.resetFields(["user"]);
//       dispatch(setUserListEmpty());
//     }
//   }, [selectedDepartmentName]);

//   const handleGetUserList = (departmentDeatils) => {
//     departmentDeatils = JSON.parse(departmentDeatils);
//     form.resetFields(["user", "assign-user"]);
//     setSelectedUserDetails([]);
//     const userListUrl =
//       URLS.DEPARTMENT_WISE_USER_LIST_URL + departmentDeatils.id;
//     dispatch(selectedDepartmentListExchange({ URL: userListUrl }));
//   };

//   useEffect(() => {
//     if (selector?.data) {
//       let data = [];
//       for (const el of selector.data) {
//         data.push({
//           label: el.department_name,
//           value: JSON.stringify({ id: el.id, name: el.department_name }),
//         });
//       }

//       setDepartmentDropdownList(data);
//     }
//   }, [selector]);

//   const handleUserFiles = (value) => {
//     console.log(value, selectedDepartmentName);

//     let urlExtented =
//       JSON.parse(selectedDepartmentName).name.toLowerCase() +
//       "_by_username=" +
//       JSON.parse(value).name;
//     let fileStatus =
//       "&current_status=" + JSON.parse(selectedDepartmentName).name;

//     dispatch(
//       getSelectedUserFilesAction({
//         username: urlExtented,
//         current_status: fileStatus,
//       })
//     );
//   };

//   const userSelector = useSelector((state) => state.fileExchangeUserList);

//   useEffect(() => {
//     if (userSelector?.data1) {
//       const userSelectorList = [];
//       for (const el of userSelector.data1) {
//         userSelectorList.push({
//           label: el.username,
//           value: JSON.stringify({ id: el.id, name: el.username }),
//         });
//       }
//       setUserListData(userSelectorList);
//     } else {
//       setUserListData([]);
//     }
//   }, [userSelector]);

//   const selectedUserFilesResultSelector = useSelector(
//     (state) => state.selectedUserFilesResult
//   );

//   useEffect(() => {
//     if (selectedUserFilesResultSelector?.results) {
//       let rawData = selectedUserFilesResultSelector.results;
//       const filtererdData = rawData.map((element) => {
//         return {
//           key: element?.id,
//           ...element,
//           district: element?.district_name?.district_name,
//           village: element?.village_name?.village_name,
//           taluka: element?.taluka_name?.taluka_name,
//         };
//       });

//       setSelectedUserDetails(filtererdData);
//     }
//   }, [selectedUserFilesResultSelector]);

// const [selectedRowKeys, setSelectedRowKeys] = useState([]);

// const onSelectChange = (newSelectedRowKeys) => {
//   setSelectedRowKeys(newSelectedRowKeys);
// };

// const rowSelection = {
//   selectedRowKeys,
//   onChange: onSelectChange,
// };

//   const onFinish = () => {
//     console.log(selectedRowKeys);
//   };

//   return (
//     <div>
//       <CommonDivider title={"Retrieve Files"}></CommonDivider>
//       <div>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           className="flex align-middle gap-3 items-center "
//         >
//           <Form.Item name="department" label="Select Department">
//             <Select
// optionFilterProp = "label";

//               style={{ width: "250px" }}
//               showSearch
//               placeholder="Select Department"
//               onChange={handleGetUserList}
//               options={departmentDropdownList}
//             />
//           </Form.Item>
//           <Form.Item name={"user"} label={"Select User"}>
//             <Select
// optionFilterProp = "label";

//               style={{ width: "250px" }}
//               showSearch
//               placeholder="Select User"
//               onChange={handleUserFiles}
//               options={userListData}
//             />
//           </Form.Item>
//           <Form.Item htmlFor="submit">
//             <Button
//               className="search-button mt-7 font-semibold text-md text-white"
//               htmlType="submit"
//             >
//               <span> Retrieve Files</span>
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>

// <Table
//   bordered
//   rowSelection={rowSelection}
//   dataSource={selectedUserDetails}
//   columns={columns}
//   scroll={setTableHeight()}
// />
// <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
// <Space direction="vertical">
//   <Radio.Group buttonStyle="solid" onChange={selectedStatus}>
//     <Radio.Button value="approved">Approved</Radio.Button>
//     <Radio.Button value="rejected">Rejected</Radio.Button>
//     <Radio.Button value="onhold">Hold</Radio.Button>
//   </Radio.Group>
// </Space>
//     </div>
//   );
// };

// export default UserToAgency;
