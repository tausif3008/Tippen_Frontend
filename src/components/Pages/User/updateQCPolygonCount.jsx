import {
  InputNumber,
  Button,
  Pagination,
  Table,
  Tag,
  Input,
  Space,
  message,
  Collapse,
  Form,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonDivider from "./../../CommonComponents/CommonDivider";
import MarginContainer from "./../CommonPages/MarginContainer";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getUpdatePolygonQcCount,
  QCPolygonCountUpdatePaginationAction,
  setPolygonCountFalse,
  updatePolygonCountAction,
  userQCPaginationAction,
} from "../../../store/Actions/BaseAction";
import { URLS } from "../../../globals/urls";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getSearchingUrl, setTableHeight } from "../../../globals/healpers";
import JustButtonToRight from "../../CommonComponents/JustButtonToRight";

const UpdateQCPolygonCount = () => {
  const { dispatch, fetchDataaa } = useOutletContext();

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
    {
      title: (
        <>
          Polygon <small> Digitization</small>
        </>
      ),
      dataIndex: "polygon_by_digitize",
      width: 200,
    },
    { title: "QC Polygon", dataIndex: "polygon_count" },
    {
      title: "Download Digitize",
      dataIndex: "download",
      width: 150,
    },
    {
      title: "Download Rectify",
      dataIndex: "downloadRectify",
      width: 150,
    },
  ];

  const selector = useSelector((state) => state.updatePolygonCountResult);
  const { onShowSizeChange } = useOutletContext();
  const [polygonCount, setPolygonCount] = useState({});
  const [digitizePolygonCount, setDigitizePolygonCount] = useState({});

  const [remarkObject, setremarkObject] = useState({});

  const [tableData, settableData] = useState([]);
  const [totalCount, settotalCount] = useState([]);
  const [currentPageSize, setCurrentPageSize] = useState([]);

  const changePaginationActionResult = useSelector(
    (state) => state.changePaginationActionResult
  );

  useEffect(() => {
    dispatch(getUpdatePolygonQcCount());
  }, [changePaginationActionResult]);

  useEffect(() => {
    if (selector) {
      let newTalbleArray = [];
      setPolygonCount({});
      let res = selector.results;
      for (let index = 0; index < res.length; index++) {
        if ([res[index]["remarks"]]) {
          remarkObject[[res[index]["id"]]] = res[index]["remarks"];
        }

        if ([res[index]["polygon_count"]]) {
          polygonCount[[res[index]["id"]]] = res[index]["polygon_count"];
        }

        newTalbleArray.push({
          ...res[index],
          key: res[index]["id"],
          district:
            res[index]?.district_name &&
            res[index].district_name?.district_name,
          taluka:
            res[index]?.taluka_name && res[index].taluka_name?.taluka_name,
          village:
            res[index]?.village_name && res[index].village_name?.village_name,
          polygon_by_digitize:
            res[index]["polygon_count"] !== 0 ? (
              <Tag color="blue" key={index}>
                {res[index]["polygon_count"]}
              </Tag>
            ) : (
              <InputNumber
                min={0}
                max={9999}
                maxLength={4}
                onChange={(value) => {
                  setDigitizePolygonCount((p) => {
                    return { ...p, [[res[index]["id"]]]: value };
                  });
                }}
              />
            ),

          polygon_count:
            res[index]["qc_polygon_count"] !== 0 ? (
              <Tag color="blue" key={index}>
                {res[index]["qc_polygon_count"]}
              </Tag>
            ) : (
              <InputNumber
                min={0}
                max={9999}
                onChange={(value) => {
                  setPolygonCount((p) => {
                    return {
                      ...p,
                      [res[index]["id"]]: value,
                    };
                  });
                }}
              />
            ),
          download: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_DIGITISE_DOCUMENT_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`download-button`}
                  onClick={(e) => {
                    const updatedTableDetailsArray = [...newTalbleArray];
                    const varName = document.querySelector(
                      `.dwn-btn-${res[index]["id"]}`
                    );

                    varName && varName.click();
                    updatedTableDetailsArray[index]["current_status"] =
                      "Qc Inprocess";

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

          downloadRectify: (
            <a
              href={`${URLS.BASE_URL}${URLS.DOWNLOAD_RECTIFY_DOCUMENT_URL}/${res[index]["id"]}/`}
              download={`image.${res[index]["file_name"].split(".")[1]}`}
            >
              {
                <Button
                  className={`dwn-btn-${res[index]["id"]} download-button`}
                  onClick={(e) => {
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
        });
      }

      settableData(newTalbleArray);
      settotalCount(selector.count);
      setCurrentPageSize(selector.per_page_count);
    }
  }, [selector]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [useUrl, setuseUrl] = useState(URLS.UPDATE_QC_POLYGON_COUNT_URL);
  const [selectedTableRows, setselectedTableRows] = useState([]);

  function getCurrentPageUrl(page) {
    if (currentPage) {
      return useUrl + `page=${page}`;
    }
  }

  const onSelectChange = (newSelectedRowKeys, selections) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setselectedTableRows(selections);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL],
  };

  function paginationPageChange(page, pageSize) {
    setSelectedRowKeys([]);
    setcurrentPage(page);
    setCurrentPageSize(pageSize);
    let url = getCurrentPageUrl(page);
    dispatch(QCPolygonCountUpdatePaginationAction({ URL: url }));
  }

  function handleSubmit() {
    if (selectedTableRows && selectedTableRows.length) {
      let canDispatch = true;

      const polyCount = Object.keys(polygonCount).length;
      const digitizationCount = Object.keys(digitizePolygonCount).length;

      if (canDispatch) {
        let can_proceed = true;

        if (polyCount > 0) {
          for (let index = 0; index < selectedRowKeys.length; index++) {
            if (typeof polygonCount[selectedRowKeys[index]] !== "number") {
              can_proceed = false;
              break;
            }
          }
        }

        if (digitizationCount > 0) {
          for (let index = 0; index < selectedRowKeys.length; index++) {
            if (
              typeof digitizePolygonCount[selectedRowKeys[index]] !== "number"
            ) {
              can_proceed = false;
              break;
            }
          }
        }

        if (can_proceed) {
          let updatedPolygonCount = [];
          let digitizeUpdatedPolygonCount = [];

          if (digitizationCount > 0) {
            for (let index = 0; index < selectedRowKeys.length; index++) {
              digitizeUpdatedPolygonCount.push({
                id: selectedRowKeys[index],
                polygon_count: digitizePolygonCount[selectedRowKeys[index]],
              });
            }

            dispatch(
              updatePolygonCountAction({
                URL: URLS.UPDATE_POLYGON_COUNT_URL,
                payload: digitizeUpdatedPolygonCount,
              })
            );
          }

          if (polyCount > 0) {
            for (let index = 0; index < selectedRowKeys.length; index++) {
              updatedPolygonCount.push({
                id: selectedRowKeys[index],
                qc_polygon_count: polygonCount[selectedRowKeys[index]],
              });
            }

            dispatch(
              updatePolygonCountAction({
                URL: URLS.UPDATE_POLYGON_COUNT_URL,
                payload: updatedPolygonCount,
              })
            );
          }
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
  }

  const polygonCountMessageSelector = useSelector(
    (state) => state.polygonCountMessage
  );

  useEffect(() => {
    if (polygonCountMessageSelector) {
      message.success("Successfully Updated!");
      dispatch(setPolygonCountFalse());
      dispatch(getUpdatePolygonQcCount());

      form.resetFields();
    }
  }, [polygonCountMessageSelector]);

  // useForm

  const [form] = Form.useForm();

  const [canSearch, setCanSearch] = useState(false);

  const onReset = () => {
    form.resetFields();
    setCanSearch(false);
    setuseUrl(URLS.UPDATE_QC_POLYGON_COUNT_URL);
    if (canSearch) dispatch(getUpdatePolygonQcCount());
  };

  useEffect(() => {
    if (canSearch) {
      let url = getSearchingUrl(canSearch, Object.keys(canSearch));

      let barcode_number;

      if (url) {
        barcode_number = url;
      }

      const newUrl = barcode_number
        ? URLS.UPDATE_QC_POLYGON_COUNT_URL + barcode_number
        : URLS.UPDATE_QC_POLYGON_COUNT_URL;

      console.log(newUrl, "--------------", url, "-----------------");

      setuseUrl(newUrl);

      dispatch(getUpdatePolygonQcCount({ search_params: url }));
    }
  }, [canSearch]);

  return (
    <div>
      <CommonDivider title={"Update Polygon Count"}></CommonDivider>
      <MarginContainer marginTop="10px"></MarginContainer>
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
                  <Input placeholder="District Name" />
                </Form.Item>
                <Form.Item name="taluka_name">
                  <Input placeholder="Taluka Name" />
                </Form.Item>
                <Form.Item name="village_name">
                  <Input placeholder="Village Name" />
                </Form.Item>
                <Form.Item name="district_code">
                  <Input placeholder="District Code" />
                </Form.Item>
                <Form.Item name="village_code">
                  <Input placeholder="Village Code" />
                </Form.Item>
                <Form.Item name="digitize_by_username">
                  <Input placeholder="Digitize By Username" />
                </Form.Item>

                <Form.Item name="qc_by_username">
                  <Input placeholder="QC by username" />
                </Form.Item>

                <Form.Item name="current_status">
                  <Input placeholder="Current Status" />
                </Form.Item>

                <Form.Item name="qc_agency_name">
                  <Input placeholder="QC Agency Name" />
                </Form.Item>

                <Form.Item name="polygon_count">
                  <Input placeholder="Digitize Polygon Count" />
                </Form.Item>

                <Form.Item name="qc_polygon_count">
                  <Input placeholder="QC polygon count" />
                </Form.Item>

                <Space>
                  <Form.Item>
                    <Button
                      className="search-button"
                      type="dashed"
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
      <MarginContainer marginTop="10px"></MarginContainer>

      <JustButtonToRight>
        <div> {hasSelected ? `Selected ${selectedRowKeys.length}` : ""}</div>

        <Button
          className="download-button"
          onClick={() => {
            fetchDataaa("Update_Polygon_Count", useUrl);
          }}
        >
          <span>
            <DownloadOutlined /> CSV
          </span>
        </Button>
      </JustButtonToRight>
      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      <MarginContainer marginTop="10px"></MarginContainer>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ ...setTableHeight(), x: 1800 }}
      ></Table>
      <div className="mt-2 mb-5 flex ml-auto">
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
          style={{
            display: "flex",
          }}
        />
      </div>
      <div className="flex">
        <Button
          className={`${
            selectedRowKeys.length !== 0 ? "download-button" : ""
          } m-auto`}
          type="primary"
          disabled={selectedRowKeys.length === 0}
          onClick={handleSubmit}
        >
          <Space style={{ display: "flex" }}>Update</Space>
        </Button>
      </div>
    </div>
  );
};

export default UpdateQCPolygonCount;
