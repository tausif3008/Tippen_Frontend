import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  message,
  Table,
  Tag,
} from "antd";
import "../fileAllocation.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  NotFoundDocumentPaginationSuperAdminAction,
  downloadExcelFile,
  getBarcodeFromImage,
  getNotFoundFilesSuperAdmin,
  setBarcodeResultFalse,
  updateBarcodeAction,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import "../CommonPages/allDocument.scss";
import {
  canShowStaticTableColumn,
  downloadCSVFronBackend,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import { useOutletContext } from "react-router-dom";
import "./NotFoundFiles.scss";
import CollapseButtonMarginContainer from "../../CommonComponents/CollapseButtonMarginContainer";
import JustButtonToRight from "./../../CommonComponents/JustButtonToRight";

function NotFoundUpdateForm({ id, barcodeNumber }) {
  const [form] = Form.useForm();
  const { dispatch } = useOutletContext();
  barcodeNumber && form.setFieldsValue({ barcode_name: barcodeNumber });

  function onFinish() {
    dispatch(updateBarcodeAction({ id, barcode_number: barcodeNumber }));
  }

  return (
    <div className="not-found-updated-form">
      <Divider orientation="left">Update Barcode Number Form</Divider>
      <div className="form-container">
        <Form form={form} onFinish={onFinish}>
          <Form.Item name={"barcode_name"} label="Correct Barcode Number">
            <Input disabled></Input>
          </Form.Item>
          <div className="form-submit-button">
            <Form.Item>
              Click{" "}
              <Button
                type="link"
                style={{ border: "1px dashed black" }}
                htmlType="submit"
                className="clear-button"
              >
                {" "}
                here
              </Button>
              {"  "}
              to correct barcode number.
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

const ImageBarcodeReader = ({ imageUrl }) => {
  const [barcodeResults, setBarcodeResults] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setBarcodeResults(null);

    if (imageUrl) dispatch(getBarcodeFromImage({ id: imageUrl.id }));
  }, [imageUrl]);

  const selector = useSelector((state) => state.barcodeImageResult);
  useEffect(() => {
    if (selector) {
      if (typeof selector.barcodes[0] == "string") {
        setBarcodeResults(selector["barcodes"][0]);
      } else {
        setBarcodeResults(selector["barcodes"][0].message);
      }
    }
  }, [selector]);

  return (
    <div className="barcode-reader-main-container">
      <div>
        <div>
          <div>Database File Barcode Number : {imageUrl.barcode_number}</div>
          Image Barcode Number :{" "}
          {barcodeResults || " Checking image barcode number..."}
        </div>
        <div>
          <span>
            Result:
            {barcodeResults
              ? barcodeResults === imageUrl.barcode_number
                ? " Barcode number matched"
                : " Barcode number did not matched"
              : " Please Wait..."}
          </span>
        </div>
        <div className="barcode-reader-image">
          <img src={imageUrl.image} alt="" />
        </div>
      </div>
      <div>
        {barcodeResults &&
        barcodeResults !== imageUrl.barcode_number &&
        Number(barcodeResults) ? (
          <NotFoundUpdateForm
            id={imageUrl.id}
            barcodeNumber={barcodeResults}
          ></NotFoundUpdateForm>
        ) : (
          <h3>{barcodeResults}</h3>
        )}
        {barcodeResults === imageUrl.barcode_number && (
          <p className="note-para" style={{ fontSize: "18px" }}>
            <b>Note : </b> Check if the Village, Taluka, District is missing. If
            then create and reupload file.
          </p>
        )}
      </div>
    </div>
  );
};

const NotFoundFiles = () => {
  const dispatch = useDispatch();
  const { onShowSizeChange } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [barcodeImageReader, setBarcodeImageReader] = useState();

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
      title: "District Code",
      dataIndex: "district_code",
    },
    {
      title: "Taluka",
      dataIndex: "taluka",
    },
    {
      title: "Taluka Code",
      dataIndex: "taluka_code",
    },
    {
      title: "Village",
      dataIndex: "village",
    },
    {
      title: "Village Code",
      dataIndex: "village_code",
    },

    {
      title: "Current Status",
      dataIndex: "current_status",
    },
    {
      title: "Map Code",
      dataIndex: "map_code",
      fixed: canShowStaticTableColumn() ? "right" : "",
      width:100,
    },
    {
      title: "View Barcode",
      dataIndex: "view_barcode",
      fixed: canShowStaticTableColumn() ? "right" : "",
      width: 200,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, settableData] = useState([]);

  const [totalCount, settotalCount] = useState(1);
  const [useUrl, setuseUrl] = useState(URLS.GET_NOT_FOUND_DOCUMENT_LIST_API);
  const updateResultOfImageBarcodeNumberSelector = useSelector(
    (state) => state.updateResultOfImageBarcodeNumber
  );

  const selector = useSelector((state) => state.notFoundDocumentList);

  useEffect(() => {
    if (!selector) {
      dispatch(
        getNotFoundFilesSuperAdmin({
          URL: URLS.GET_NOT_FOUND_DOCUMENT_LIST_API,
        })
      );
    }
    if (updateResultOfImageBarcodeNumberSelector) {
      message.success("Successfully Updated!");
      setOpen(false);
      dispatch(setBarcodeResultFalse());
    }
  }, [updateResultOfImageBarcodeNumberSelector]);

  let thisPageMainUrl = false;
  if (selector && thisPageMainUrl === false) {
    thisPageMainUrl = selector.next;
  }

  useEffect(() => {
    if (selector && selector?.results?.length >= 0) {
      let tableDetailsArray = [];
      let res = selector.results;

      function getMapCode(mapCode) {
        try {
          const map = parseInt(mapCode);
          const finalMapCode = map >= 0 && map <= 13;
          if (finalMapCode) {
            return map;
          } else if (map) {
            return (
              <Tag color="red" style={{ background: "red", color: "white" }}>
                {map}
              </Tag>
            );
          } else {
            return mapCode;
          }
        } catch (error) {
          return mapCode;
        }
      }

      for (let index = 0; index < res?.length; index++) {
        tableDetailsArray.push({
          ...res[index],
          map_code: getMapCode(res[index].map_code),
          key: res[index]["id"],
          district:
            res[index]?.district_name && res[index].district_name.district_name,
          taluka:
            res[index]?.taluka_name && res[index]?.taluka_name.taluka_name,
          village:
            res[index]?.village_name && res[index]?.village_name.village_name,
          view_barcode: (
            <Button
              type="primary"
              className="upload-button"
              onClick={() => {
                setBarcodeImageReader({
                  id: res[index].id,
                  image: res[index].scan_upload,
                  barcode_number: res[index].barcode_number,
                });
                setOpen(true);
              }}
            >
              Check Image Barcode
            </Button>
          ),
        });
      }

      settableData(tableDetailsArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  let columns = rectificationDetails;

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  function DownlaodZipOfSelectedFiles() {
    alert(selectedRowKeys.length + " Files selected and its downloading");
  }

  function getPageDetails(url) {
    dispatch(NotFoundDocumentPaginationSuperAdminAction({ URL: url }));
  }

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(NotFoundDocumentPaginationSuperAdminAction({ URL: url }));
  }

  const [form] = Form.useForm();
  const [canSearch, setCanSearch] = useState();

  const onFinish = (values) => {
    let keys = Object.keys(values);
    let baseUrl = URLS.GET_NOT_FOUND_DOCUMENT_LIST_API;
    let url = getSearchingUrl(values, keys);
    setuseUrl(baseUrl + url);
    getPageDetails(baseUrl + url);
    setcurrentPage(1);
  };

  useEffect(() => {
    if (canSearch) onFinish(canSearch);
  }, [canSearch]);

  const onReset = () => {
    setuseUrl(URLS.GET_NOT_FOUND_DOCUMENT_LIST_API);
    form.resetFields();
  };

  function downloadExlsFiles() {
    dispatch(downloadExcelFile({ URL: useUrl + "&is_export=1" }));
  }

  const downloadExcelSelector = useSelector((state) => state.downloadFilePath);
  const handleDownloadCompletion = () => {
    dispatch({ type: "SET_DOWNLOAD_EXCEL_FILE_FALSE" });
  };

  useEffect(() => {
    if (downloadExcelSelector) {
      if (downloadExcelSelector) {
        downloadCSVFronBackend(downloadExcelSelector.csv_path);
        handleDownloadCompletion();
      }
    }
  }, [downloadExcelSelector]);

  function handleCloseModal() {
    setOpen(false);
    setBarcodeImageReader(null);
  }

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Divider orientation="left">Not Found Files</Divider>
      <Modal
        width={1000}
        open={barcodeImageReader && open}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
      >
        <ImageBarcodeReader imageUrl={barcodeImageReader}></ImageBarcodeReader>
      </Modal>
      <Collapse
        items={[
          {
            key: "1",
            label: <SearchOutlined></SearchOutlined>,
            children: (
              <Form
                form={form}
                name="searchForm"
                layout="inline"
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
                      className="search-button"
                      htmlType="submit"
                    >
                      Search
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="clear-button"
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
      <div className="flex align-content-center  justify-between flex-wrap">
        <div>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </div>
        <Button
          type="dashed"
          onClick={downloadExlsFiles}
          className="download-button"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> Excel
          </span>
        </Button>
      </div>
      <CollapseButtonMarginContainer></CollapseButtonMarginContainer>

      <div>
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ ...setTableHeight(), x: 2000 }}
        />
        <Pagination
          responsive
          onShowSizeChange={onShowSizeChange}
          showSizeChanger
          total={totalCount}
          current={currentPage}
          showQuickJumpers
          pageSize={currentPageSize}
          defaultPageSize={currentPageSize}
          showTotal={(total) => `Total ${totalCount} details`}
          onChange={paginationPageChange}
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "end",
          }}
        />

        <a
          href={`${URLS.BASE_URL}${URLS.DOWNLOAD_ZIP_NOT_FOUND_URL}document_ids=${selectedRowKeys}`}
          download={``}
        >
          <Button
            type="primary"
            onClick={DownlaodZipOfSelectedFiles}
            disabled={selectedRowKeys.length === 0 ? true : false}
            className={`${
              selectedRowKeys.length === 0 ? "" : "download-button"
            }`}
          >
            Downlaod Zip of Selected Files
          </Button>
        </a>
      </div>
    </>
  );
};

export default NotFoundFiles;
