import React, { useEffect } from "react";
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Pagination,
  Progress,
  Radio,
  Space,
  Table,
  message,
} from "antd";

import { useState } from "react";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  digitizeResultsActionUser,
  downloadExcelFile,
  setDigitizeFileUploadFalse,
  updatePolygonCountAction,
  uploadDigitizeDocumentsPutActionRejected,
  uploadDigitizedFileByUser,
  userDigitizePaginationAction,
} from "../../../store/Actions/BaseAction";
import "./DigitizeDocument.scss";

import {
  InboxOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { URLS } from "../../../globals/urls";
import Dragger from "antd/es/upload/Dragger";
import { getSearchingUrl, setTableHeight } from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import "../../../style/tableStyle.scss";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";

const DigitizeSection = () => {
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
    { title: "Polygon Count", dataIndex: "polygon_count" },
    {
      title: "Download",
      dataIndex: "download",
      width: 150,

    },
    {
      title: "Rectify Remark",
      dataIndex: "remarks",
    },
    {
      title: "Digitize Remark",
      width: 230,
      dataIndex: "digitize_remark",
    },
    {
      title: "QC Remark",
      dataIndex: "qc_remarks",
    },
  ];

  const [tableData, settableData] = useState([]);
  const { onShowSizeChange } = useOutletContext();

  const [totalCount, settotalCount] = useState(1);
  const [remarkObject, setremarkObject] = useState({});
  const [selectedTableRows, setselectedTableRows] = useState([]);
  const [fileList, setfileList] = useState([]);

  const [useUrl, setuseUrl] = useState(URLS.GET_ALLOCATE_TO_DIGITISE_URL);

  const selector = useSelector((state) => state.digitizationUserFiles);

  useEffect(() => {
    if (!selector)
      dispatch(
        digitizeResultsActionUser({ URL: URLS.GET_ALLOCATE_TO_DIGITISE_URL })
      );
  }, []);

  const agencySelector = useSelector((state) => state.agencyList);
  const [polygonCount, setPolygonCount] = useState({});

  useEffect(() => {
    if (selector) {
      setPolygonCount({});
      let newTalbleArray = [];

      let res = selector.results;

      for (let index = 0; index < res.length; index++) {
        if ([res[index]["digitize_remarks"]]) {
          remarkObject[[res[index]["id"]]] = res[index]["digitize_remarks"];
        }

        if ([res[index]["polygon_count"]]) {
          polygonCount[[res[index]["id"]]] = res[index]["polygon_count"];
        }

        newTalbleArray.push({
          ...res[index],
          key: res[index]["id"],
          district:
            res[index].district_name && res[index].district_name.district_name,
          taluka: res[index].taluka_name && res[index].taluka_name.taluka_name,
          village:
            res[index].village_name && res[index].village_name.village_name,
          download: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DOCUMENT_RECTIFY_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`${res[index]?.current_status === "Digitize Inprocess"
                      ? "already-downloaded-button"
                      : res[index]?.current_status === "Qc Rejected"
                        ? "rejected-button"
                        : "download-button"
                    }`}
                  onClick={(e) => {
                    const updatedTableDetailsArray = [...newTalbleArray];
                    updatedTableDetailsArray[index]["current_status"] =
                      "Digitize Inprocess";
                    e.currentTarget.disabled = true;
                  }}
                >
                  <span>
                    <DownloadOutlined></DownloadOutlined> Download
                  </span>{" "}
                </Button>
              }
            </a>
          ),
          polygon_count: (
            <InputNumber
              min={0}
              max={9999}
              maxLength={4}
              onChange={(value) => {
                setPolygonCount((p) => {
                  return { ...p, [[res[index]["id"]]]: value };
                });
              }}
            />
          ),

          digitize_remark: (
            <Input
              defaultValue={[res[index]["digitize_remarks"]]}
              onChange={(event) => {
                const newValue = event.target.value;

                if ([res[index]["digitize_remarks"]]) {
                  remarkObject[[res[index]["id"]]] = [res[index]["digitize_remarks"]];
                }

                if (newValue === "") {
                  delete remarkObject[[res[index]["id"]]];
                  setremarkObject((s) => {
                    return { ...s, [res[index]["id"]]: "" };
                  });
                } else {
                  setremarkObject((s) => {
                    return { ...s, [res[index]["id"]]: newValue };
                  });
                }
              }}
            />
          ),
        });
      }

      settableData(newTalbleArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  useEffect(() => {
    let agencies = [];
    if (agencySelector) {
      for (let index = 0; index < agencySelector.length; index++) {
        agencies.push({
          value: agencySelector[index]["id"],
          label: agencySelector[index]["agency_name"],
        });
      }
    }
  }, [agencySelector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  let columns = rectificationDetails;

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys((s) => newSelectedRowKeys);
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

  function getPageDetails(url) {
    setSelectedRowKeys([]);
    dispatch(userDigitizePaginationAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(userDigitizePaginationAction({ URL: url }));
  }

  const [setedStatus, setsetedStatus] = useState(null);
  const [file, setFile] = useState(null);

  // upload file or reject file(update remark and update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setedStatus) {
      if (setedStatus === "approved") {
        if (file && file.length === 1) {
          if (file && file.length !== 0) {
            if (
              selectedTableRows &&
              file &&
              selectedTableRows.length === file.length
            ) {
              let canDispatch = true;
              let selectedFiles = [];

              for (let index = 0; index < selectedTableRows.length; index++) {
                selectedFiles.push(selectedTableRows[index]["barcode_number"]);
              }

              for (let index = 0; index < file.length; index++) {
                if (
                  !selectedFiles.includes(
                    file[index]["name"].trim().split(".")[0]
                  )
                ) {
                  canDispatch = false;
                  break;
                }
              }

              if (canDispatch) {
                let can_proceed = true;

                for (let index = 0; index < selectedRowKeys.length; index++) {
                  if (
                    typeof polygonCount[selectedRowKeys[index]] !== "number"
                  ) {
                    can_proceed = false;
                    break;
                  }
                }

                if (can_proceed) {
                  const formData = new FormData();

                  file.forEach((element) => {
                    formData.append("files", element);
                  });

                  let url = URLS.UPLOAD_DIGITIZED_FILES_URL + setedStatus + "/";

                  for (let index = 0; index < selectedRowKeys.length; index++) {
                    formData.append(
                      "digitize_remarks",
                      remarkObject[selectedRowKeys[index]]
                    );

                    formData.append(
                      "polygon_count",
                      polygonCount[selectedRowKeys[index]]
                    );
                  }

                  dispatch(uploadDigitizedFileByUser({ URL: url, formData }));
                  
                  localStorage.setItem("refresh",true)
                  setTimeout(() => {
                                        localStorage.setItem("refresh",false)
                  }, 1000);

                } else {
                  message.info(
                    "Update the number of polygons for the files you've chosen in the table."
                  );
                }
              } else {
                message.info(
                  "The selected files from the table do not match the uploaded file names!"
                );
              }
            } else {
              message.info(
                "The number of selected files from the table does not align with the count of uploaded files!"
              );
            }
          } else {
            message.info("Please Upload files!");
          }
        } else {
          message.info("You can upload only 1 file at once!");
        }
      } else {
        if (selectedRowKeys && selectedRowKeys.length !== 0) {
          let url = URLS.UPLOAD_DIGITIZED_FILES_URL + setedStatus + "/";

          let updatedRemarkList = [];
          for (let index = 0; index < selectedRowKeys.length; index++) {
            updatedRemarkList.push({
              id: selectedRowKeys[index],
              digitize_remarks: remarkObject[selectedRowKeys[index]]
                ? remarkObject[selectedRowKeys[index]]
                : "",
            });
          }

          dispatch(
            uploadDigitizeDocumentsPutActionRejected({
              URL: url,
              remarksList: updatedRemarkList,
            })
          );

          setSelectedRowKeys([]);
        } else {
          message.info(
            "Select a file from the table and decide whether to reject it or place it on hold."
          );
        }
      }
    } else {
      message.info(
        "Please specify whether the selected file should be marked as Approved, Rejected, or placed On Hold!"
      );
    }
  };

  function selectedStatus(e) {
    setsetedStatus(e.target.value);
  }

  const props = {
    name: "file",
    multiple: true,

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        let formDataList = [];
        for (let i = 0; i < info.fileList.length; i++) {
          formDataList.push(info.fileList[i].originFileObj);
        }
        setFile(formDataList);
      }
    },
  };

  const rectifySelector = useSelector((state) => state.digitizeFileUpoadResult);

  useEffect(() => {
    if (rectifySelector) {
      setSelectedRowKeys([]);
      setcurrentPage(1);

      dispatch(digitizeResultsActionUser({ URL: useUrl }));
      message.success(rectifySelector.message);

      dispatch(setDigitizeFileUploadFalse());
      setfileList([]);
    }
  }, [rectifySelector]);

  const [totalFilesUploaded, setTotalFilesUploaded] = useState(0);

  const uploadingProgress = ({ file, fileList }) => {
    const totalFiles = fileList.length;
    setfileList(fileList);

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
      setTotalFilesUploaded(Math.floor(progress));
    }
  };

  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const lodingFromState = useSelector((state) => state.loading);

  // seraching content
  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    let baseUrl = URLS.GET_ALLOCATE_TO_DIGITISE_URL;
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
    setTotalFilesUploaded(0);
    setfileList([]);
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
                <Form.Item name="file_name">
                  <Input placeholder="File Name" />
                </Form.Item>

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
                      className="download-button"
                      htmlType="submit"
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

      <div>
        <Space direction="vertical" wrap style={{ display: "flex" }}></Space>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
        <div>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          {/* <Button
            className="download-button ml-2"
            type="dashed"
            onClick={downloadExlsFiles}
          >
            <DownloadOutlined></DownloadOutlined> Excel
          </Button> */}
        </div>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ ...setTableHeight(), x: 1500 }}
        />
        <div>
          <Pagination
            className="mt-2 flex"
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            total={totalCount}
            current={currentPage}
            showQuickJumpers
            pageSize={currentPageSize}
            defaultPageSize={currentPageSize}
            showTotal={(total) => `Total ${totalCount}`}
            onChange={paginationPageChange}
          />
        </div>
        <CollapseButtonMarginContainer></CollapseButtonMarginContainer>
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
          fileList={fileList}
          accept={".dwg"}
          listType="text"
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
        <div style={{ display: "flex", alignItems: "center" }}>
          {setedStatus === "approved" ? (
            <Button
              type="primary"
              className={`${selectedRowKeys.length !== 0 ? "download-button" : ""
                }`}
              disabled={selectedRowKeys.length === 0}
              onClick={handleSubmit}
            >
              <Space style={{ display: "flex" }}>Upload</Space>
            </Button>
          ) : (
            <Button
              className={`${selectedRowKeys.length !== 0 ? "download-button" : ""
                }`}
              type="primary"
              onClick={handleSubmit}
              disabled={selectedRowKeys.length === 0}
            >
              <Space style={{ display: "flex" }}>Submit</Space>
            </Button>
          )}

          {fileList.length > 0 ? (
            <Button
              className="clear-button"
              type="primary"
              onClick={() => {
                setfileList([]);
              }}
            >
              Clear uploaded files
            </Button>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
};

export default DigitizeSection;
