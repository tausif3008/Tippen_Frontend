import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Form,
  Input,
  Pagination,
  Progress,
  Radio,
  Space,
  Table,
  message,
} from "antd";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationAction,
  allocateToRectifyAgency,
  uploadRectifyDocumentsPutActionRejected,
  uploadRectifyDocumentsPutAction,
  setAllocateToRectifyAgencyFalse,
} from "../../../store/Actions/BaseAction";
import "./userFileSection.scss";
import { URLS } from "../../../globals/urls";
import {
  DownloadOutlined,
  InboxOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { getSearchingUrl, setTableHeight } from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const UserFileSection = () => {
  const { onShowSizeChange } = useOutletContext();
  const dispatch = useDispatch();

  const rectificationDetails = [
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
    { title: "Download", 
      dataIndex: "download",
      width: 150,    },
    {
      title: "Rectify Remark",
      dataIndex: "remark",
      width: 230,
    },
    {
      title: "Digitize Remark",
      dataIndex: "digitize_remarks",
      width: 230,
    },
  ];

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState(1);

  useEffect(() => {
    if (!selector)
      dispatch(
        allocateToRectifyAgency({ URL: URLS.GET_AlLLOCATE_TO_RECTIFY_URL })
      );
  }, []);

  const selector = useSelector((state) => state.agencyRectify);

  const [remarkObject, setRemarkObject] = useState({});
  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    if (selector) {
      let res = selector.results;
      let tableDetailsNewArray = [];

      for (let index = 0; index < res.length; index++) {
        if ([res[index]["remarks"]]) {
          remarkObject[[res[index]["id"]]] = res[index]["remarks"];
        }

        tableDetailsNewArray.push({
          ...res[index],
          key: res[index]["id"],
          district:
            res[index].district_name && res[index].district_name.district_name,
          taluka: res[index].taluka_name && res[index].taluka_name.taluka_name,
          village:
            res[index].village_name && res[index].village_name.village_name,
          download: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DOCUMENT_SCAN_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`${
                    res[index]?.current_status === "Rectify Inprocess"
                      ? "already-downloaded-button"
                      : res[index]?.current_status === "Digitize Rejected"
                      ? "rejected-button"
                      : "download-button"
                  }`}
                  onClick={(e) => {
                    const updatedTableDetailsArray = [...tableDetailsNewArray];
                    updatedTableDetailsArray[index]["current_status"] =
                      "Rectify Inprocess";
                    e.currentTarget.disabled = true;
                  }}
                >
                  <span>
                    Download <DownloadOutlined></DownloadOutlined>
                  </span>
                </Button>
              }
            </a>
          ),

          remark: (
            <Input
              placeholder="Remark"
              defaultValue={[res[index]["remarks"]]}
              onChange={(event) => {
                const newValue = event.target.value;

                setRemarkObject((s) => {
                  return { ...s, [res[index]["id"]]: newValue };
                });
              }}
            />
          ),
        });
      }

      settableData(tableDetailsNewArray);

      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);
  const [selectedTableRows, setselectedTableRows] = useState([]);
  const [useUrl, setuseUrl] = useState(URLS.GET_AlLLOCATE_TO_RECTIFY_URL);

  let columns = rectificationDetails;

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedTableRows(selections);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  const hasSelected = selectedRowKeys.length > 0;
  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function DownlaodZipOfSelectedFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  function getPageDetails(url) {
    dispatch(paginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(paginationAction({ URL: url }));
  }

  const [setedStatus, setsetedStatus] = useState(null);

  function selectedStatus(e) {
    setsetedStatus(e.target.value);
  }

  // file upload section
  const [file, setFile] = useState(null);
  const lodingFromState = useSelector((state) => state.loading);

  const props = {
    name: "file",
    multiple: true,
    accept: "image/png, image/jpeg",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setedStatus) {
      if (setedStatus === "approved") {
        if (file) {
          if (
            selectedRowKeys &&
            selectedRowKeys.length !== 0 &&
            file.length === selectedRowKeys.length
          ) {
            let url = URLS.UPLOAD_REACTIFY_BULK_USER + setedStatus + "/";

            let selectedTableRowName = [];
            let uploadedTableRowName = [];

            for (let index = 0; index < selectedTableRows.length; index++) {
              selectedTableRowName.push(
                selectedTableRows[index]["barcode_number"]
              );
              uploadedTableRowName.push(file[index].name.split(".")[0]);
            }

            let canProceed = true;
            for (let index = 0; index < selectedTableRowName.length; index++) {
              if (!uploadedTableRowName.includes(selectedTableRowName[index])) {
                canProceed = false;
                break;
              }
            }

            if (canProceed) {
              const formData = new FormData();
              file.forEach((element) => {
                formData.append("files", element);
              });
              dispatch(uploadRectifyDocumentsPutAction({ URL: url, formData }));
              setFileList([]);
            } else {
              message.info(
                "Uploaded file names do not match with the selected file names!"
              );
            }
          } else {
            message.info(
              "Number of selected file from the table do not match with number of uploaded files!"
            );
          }
        } else {
          message.info("Please select file to upload!");
        }
      } else {
        if (selectedRowKeys && selectedRowKeys.length !== 0) {
          let url = URLS.UPLOAD_REACTIFY_BULK_USER + setedStatus + "/";
          let updatedRemarkList = [];

          for (let index = 0; index < selectedRowKeys.length; index++) {
            updatedRemarkList.push({
              id: selectedRowKeys[index],
              remarks: remarkObject[selectedRowKeys[index]]
                ? remarkObject[selectedRowKeys[index]]
                : "",
            });
          }

          dispatch(
            uploadRectifyDocumentsPutActionRejected({
              URL: url,
              remarksList: updatedRemarkList,
            })
          );

          setSelectedRowKeys([]);
        } else {
          message.info("Please select some file from the table!");
        }
      }
    } else {
      message.info(
        "Please specify whether the selected file should be marked as Approved, Rejected, or placed On Hold!"
      );
    }
  };

  const rectifySelector = useSelector((state) => state.rectifyFileUplaod);

  useEffect(() => {
    if (rectifySelector) {
      setcurrentPage(1);
      setSelectedRowKeys([]);
      message.success(rectifySelector.message);
      dispatch(setAllocateToRectifyAgencyFalse());
      dispatch(allocateToRectifyAgency({ URL: useUrl }));
    }
  }, [rectifySelector]);

  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

  const [totalFilesUploaded, settotalFilesUploaded] = useState(0);

  const uploadingProgress = ({ file, fileList }) => {
    const totalFiles = fileList.length;
    setFileList(fileList);
    const completedFiles = fileList.filter(
      (file) => file.status !== "uploading"
    ).length;

    if (file.status !== "uploading") {
      let formDataList = [];
      for (let i = 0; i < fileList.length; i++) {
        formDataList.push(fileList[i].originFileObj);
      }
      setFile(formDataList);
    }

    if (totalFiles > 0) {
      const progress = (completedFiles / totalFiles) * 100;
      settotalFilesUploaded(Math.floor(progress));
    }
  };

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    let baseUrl = URLS.GET_AlLLOCATE_TO_RECTIFY_URL;
    let url = getSearchingUrl(values, keys);

    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (canSearch) onFinish(canSearch);
  }, [canSearch]);

  const onReset = () => {
    form.resetFields();
  };

  if (totalFilesUploaded && totalFilesUploaded === 100 && lodingFromState) {
    settotalFilesUploaded(0);
    setFileList([]);
  }

  return (
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                layout="inline"
                form={form}
                name="searchForm"
                initialValues={{
                  remember: true,
                }}
                onFinish={(v) => {
                  if (JSON.stringify(v) !== JSON.stringify(canSearch))
                    setCanSearch(v);
                }}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >
                <Form.Item name="barcode_number">
                  <Input placeholder="Barcode Number" />
                </Form.Item>

                <Form.Item name="district_name">
                  <Input placeholder="District Names" />
                </Form.Item>

                <Form.Item name="district_code">
                  <Input placeholder="District Code" />
                </Form.Item>

                <Form.Item name="taluka_name">
                  <Input placeholder="Taluka Name" />
                </Form.Item>

                <Form.Item name="taluka_code">
                  <Input placeholder="Taluka Code" />
                </Form.Item>

                <Form.Item name="village_name">
                  <Input placeholder="Village Name" />
                </Form.Item>

                <Form.Item name="village_code">
                  <Input placeholder="Village Code" />
                </Form.Item>

                <Form.Item name="map_code">
                  <Input placeholder="Map Code" />
                </Form.Item>

                <Form.Item name="current_status">
                  <Input placeholder="Current Status" />
                </Form.Item>

                <Space>
                  <Form.Item>
                    <Button
                      type="dashed"
                      htmlType="submit"
                      className="search-button"
                    >
                      Search
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="clear-button"
                      type="primary"
                      onClick={() => {
                        onReset();
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            ),
          },
        ]}
      />
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
      <div className="upload-main-container">
        <div>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          {/* <Space wrap style={{ display: "flex" }}>
            <Button
              className="download-button ml-2"
              type="dashed"
              onClicnloadExlsFiles}
            >
              <DownloadOutlined></DownloadOutlined> Excel
            </Button>
          </Space> */}
        </div>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
        <Table
          bordered
          onShowSizeChange={onShowSizeChange}
          showSizeChanger
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ ...setTableHeight(), x: 1300 }}
        />
        <Pagination
          responsive
          onShowSizeChange={onShowSizeChange}
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount}`}
          onChange={paginationPageChange}
          style={{ marginTop: "10px", display: "flex", alignItems: "end" }}
        />
        <div style={{ height: "10px" }}></div>

        <div className="flex justify-center">
          <a
            href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_SCAN_URL}document_ids=${selectedRowKeys}`}
            download={``}
          >
            <Button
              type="primary"
              onClick={DownlaodZipOfSelectedFiles}
              disabled={selectedRowKeys.length === 0}
              className={`${
                selectedRowKeys.length === 0 ? "" : "download-button"
              } `}
            >
              Download Zip of Selected Files.
            </Button>
          </a>
        </div>

        <div className="allocation-button-container">
          <div className="allocation-button-container">
            <Space direction="vertical">
              <Radio.Group buttonStyle="solid" onChange={selectedStatus}>
                <Radio.Button value="approved">Approved</Radio.Button>
                <Radio.Button value="rejected">Rejected</Radio.Button>
                <Radio.Button value="onhold">Hold</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
        </div>
      </div>

      <div className="upload-container">
        <Dragger
          {...props}
          onChange={uploadingProgress}
          accept={("image/png", "image/jpeg")}
          listType="text"
          fileList={fileList}
          disabled={setedStatus !== "approved"}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag folder to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Only JPEG and JPG images are
            allowed.
          </p>
        </Dragger>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {totalFilesUploaded !== 0 ? (
            <Progress percent={totalFilesUploaded} strokeColor={twoColors} />
          ) : (
            ""
          )}
        </div>
        {setedStatus === "approved" ? (
          <Button
            type="primary"
            className={`${
              selectedRowKeys.length !== 0 ? "download-button" : ""
            }`}
            disabled={selectedRowKeys.length === 0}
            onClick={handleSubmit}
          >
            <Space style={{ display: "flex" }}>Upload</Space>
          </Button>
        ) : (
          <Button
            type="primary"
            className={`${
              selectedRowKeys.length !== 0 ? "download-button" : ""
            }`}
            onClick={handleSubmit}
            disabled={selectedRowKeys.length === 0}
          >
            <Space style={{ display: "flex" }}>Submit</Space>
          </Button>
        )}
      </div>
    </>
  );
};

export default UserFileSection;
