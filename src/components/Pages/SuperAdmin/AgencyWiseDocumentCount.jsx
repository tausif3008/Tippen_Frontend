import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agencyWiseDocumetCountAction,
  getDistrictList,
  paginationAction,
} from "../../../store/Actions/BaseAction";
import {
  Button,
  Collapse,
  Divider,
  Form,
  Select,
  Space,
  Table,
  DatePicker,
} from "antd";
import {
  getChangedDataPattern,
  getSearchingUrl,
  setTableHeight,
} from "../../../globals/healpers";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { URLS } from "../../../globals/urls.js";
import { API_CONSTANTS } from "../../../globals/ApiConstants.js";
import MarginContainer from "./../CommonPages/MarginContainer";
import { CSVLink } from "react-csv";
import { generatePDF } from "../../../utils/downloadPDFAndExcel.js";
const { RangePicker } = DatePicker;

const AgencyWiseDocumentCount = () => {
  const [useUrl, setuseUrl] = useState(URLS.GET_AlLLOCATE_TO_RECTIFY_URL);

  const dispatch = useDispatch();

  const selector = useSelector((state) => state.agencyWiseDocumentCount);
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "agency_name",
      width: 250,
    },
    {
      title: "District",
      dataIndex: "district_name",
    },
    // {
    //   title: "Total Scan Uploaded",
    //   dataIndex: "total_scan_uploaded",
    // },
    // {
    //   title: "Rectify Allocated",
    //   dataIndex: "rectify_allocated",
    // },
    // {
    //   title: "Rectify Completed",
    //   dataIndex: "rectify_completed",
    // },
    // {
    //   title: "Digitize Allocated",
    //   dataIndex: "digitize_allocated",
    // },
    {
      title: "Digitize Map",
      dataIndex: "digitize_completed",
    },
    // {
    //   title: "QC Allocated",
    //   dataIndex: "qc_allocated",
    // },
    { title: "QC Map", dataIndex: "qc_completed" },
    // { title: "pdf_allocated", dataIndex: "pdf_allocated" },
    { title: "PDF Completed", dataIndex: "pdf_completed" },

    // {
    //   title: "BEL Scan Upload",
    //   dataIndex: "bel_scan_uploaded_count",
    // },
    // {
    //   title:  "BEL Scan Approved",//Bel Gov Scan Qc Approved
    //   dataIndex: "bel_gov_scan_qc_approved_count",
    // },
    {
      title: "BEL Draft Map",//Bel Draft Upload
      dataIndex: "bel_draft_uploaded_count",
    },
    {
      title: "BEL Draft Polygon",//Bel Draft Upload
      dataIndex: "bel_draft_qcpolygon_count",
    },
    {
      title: "BEL Draft Approved",//Bel Gov Draft Qc Approved
      dataIndex: "bel_gov_draft_qc_approved_count",
    },
    {
      title: "BEL Approved Polygon",//Bel Gov Draft Qc Approved
      dataIndex: "bel_draft_approved_qcpolygon_count",
    }
  ];

  const [form] = useForm();
  const [data, setdata] = useState([]);
  const [title, setTitle] = useState(" - All Dates Consolidated");

  const [dateRange, setDateRange] = useState({});

  const districtSelector = useSelector((state) => state.districtListResult);
  const [districtListResult, setdistrictListResult] = useState([]);


  useEffect(() => {
    if (!districtSelector) dispatch(getDistrictList({}));
  }, []);

  

  useEffect(() => {
    if (!selector && !selector?.counts_by_maptype) {
      dispatch(agencyWiseDocumetCountAction());
    }
  }, []);

  useEffect(() => {
    if (selector && selector.counts_by_maptype) {
      setdata(selector.counts_by_maptype);
    }
  }, [selector]);

  
  useEffect(() => {
      if (districtSelector) {
        let rawDistrictDetails = districtSelector.data;
        let theDistrictList = [];
  
        for (let index = 0; index < rawDistrictDetails.length; index++) {
          theDistrictList.push({
            label: rawDistrictDetails[index]["district_name"],
            value: rawDistrictDetails[index]["district_code"],
          });
        }
        setdistrictListResult(theDistrictList);
      }
    }, [districtSelector]);

  

  const onReset = () => {
    form.resetFields();
    dispatch(agencyWiseDocumetCountAction());
  };

  

  useEffect(() => {
    if (dateRange.start_date) {
      let title = " - All Dates Consolidated";

      if (dateRange.start_date) {
        title = " - from " + dateRange.start_date + " to " + dateRange.end_date;
      }

      setTitle(title);
    }
  }, [dateRange]);


  const onFinish = (values) => {

    if (values["scan_end_date"]) {
      let start = values["scan_end_date"][0];
      let end = values["scan_end_date"][1];

      values["start_date"] = getChangedDataPattern(start);
      values["end_date"] = getChangedDataPattern(end);

      delete values["scan_end_date"];

      setDateRange({
        ...dateRange,
        start_date: values["start_date"],
        end_date: values["end_date"],
      });

    }

    if (values["district_id"]) {
        console.log(values["district_id"])
    }

    let keys = Object.keys(values);
    let url = getSearchingUrl(values, keys);
    dispatch(agencyWiseDocumetCountAction({}, "?" + url));

    
  };

  function handleDownloadData() {
    let tableDetailss = [];
    for (let index = 0; index < data.length; index++) {
      let row = [];
      row.push(data[index]["agency_name"]);
      row.push(data[index]["district_name"]);
      // row.push(data[index]["total_scan_uploaded"]);
      // row.push(data[index]["rectify_allocated"]);
      // row.push(data[index]["rectify_completed"]);

      // row.push(data[index]["digitize_allocated"]);
      row.push(data[index]["digitize_completed"]);
      row.push(data[index]["polygon_count"]);
      // row.push(data[index]["qc_allocated"]);
      row.push(data[index]["qc_completed"]);
      row.push(data[index]["qc_polygon_count"]);
      // row.push(data[index]["pdf_allocated"]);
      // row.push(data[index]["pdf_completed"]);


      // row.push(data[index]["bel_scan_uploaded_count"]);
      // row.push(data[index]["bel_gov_scan_qc_approved_count"]);

      row.push(data[index]["bel_draft_uploaded_count"]);
      row.push(data[index]["bel_draft_qcpolygon_count"]);
      row.push(data[index]["bel_gov_draft_qc_approved_count"]);
      row.push(data[index]["bel_draft_approved_qcpolygon_count"]);

      tableDetailss.push(row);
    }

    return tableDetailss;
  }

  function handleDownloadColumns() {
    const tableHeaders = [
      "Vendor Name",
      "District",
      // "Total Scan Uploaded",
      // "Rectify Pending",
      // "Rectify Completed",
      // "Digitize Pending",
      "Digitize Map",
      "Digitize Polygon",
      // "QC Pending",
      "QC Map",
      "QC Polygon",
      // "PDF Pending",
      // "PDF Completed",
      // "BEL Scan",//Uploaded
      // "BEL Scan Approved", //BEL Gov Scan Qc Approved
      "BEL Draft Map",
      "BEL Draft Polygon",
      "BEL Approved Map",//BEL Gov Draft Qc Approved
      "BEL Approved Polygon"//BEL Gov Draft Qc Approved
    ];

    return tableHeaders;
  }

  // const callGeneratePDF = () => {
  //   generatePDF(
  //     "Vendor Wise Digitize Report " + title,
  //     "Vendor Wise Digitize Report " + title,
  //     handleDownloadColumns(),
  //     handleDownloadData()
  //   );
  // };

  const callGeneratePDF = () => {
  const headers = handleDownloadColumns(); // e.g. ['Vendor', 'Digitized', 'Pending']
  const data = handleDownloadData();       // e.g. [['Vendor A', 10, 5], ['Vendor B', 20, 10]]

  // Clone data to avoid modifying original
  const updatedData = [...data];

  // Calculate totals for numeric columns
  const totals = headers.map((_, colIndex) => {
    if (colIndex === 0) return 'Total'; // First column label
    return data.reduce((sum, row) => sum + Number(row[colIndex] || 0), 0);
  });

  // Append total row
  updatedData.push(totals);

  // Call PDF generator with updated data
  generatePDF(
    "Vendor Wise Digitize Report " + title,
    "Vendor Wise Digitize Report " + title,
    headers,
    updatedData
  );
};


  return (
    <div>
      <Divider orientation="left"> Vendor Wise Digitize Report </Divider>
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
                onFinish={onFinish}
                autoComplete="off"
                style={{ maxWidth: "100%" }}
              >
                <Form.Item name="scan_end_date">
                  <RangePicker
                    placeholder={["Start Date", "End Date"]}
                  ></RangePicker>
                </Form.Item>

                <Form.Item name={"district_id"} noStyle>
                    <Select
                      optionFilterProp="label"
                      showSearch
                      defaultValue="Select District"
                      style={{
                        width: 300,
                      }}
                      options={districtListResult}
                    />
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

      <MarginContainer marginBottom={"10px"}></MarginContainer>

      <div className="flex w-full flex-wrap justify-end gap-2 mb-3">
        <Button
          type="dashed"
          onClick={callGeneratePDF}
          className="download-button"
        >
          <span>
            <DownloadOutlined></DownloadOutlined> PDF
          </span>{" "}
        </Button>

        <Button type="dashed" className="download-button">
          <CSVLink
            filename={"Vendor Wise Digitize Report " + title}
            data={handleDownloadData()}
            headers={handleDownloadColumns()}
          >
            <span>
              <DownloadOutlined></DownloadOutlined> Excel
            </span>
          </CSVLink>
        </Button>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ ...setTableHeight(), x: 1800 }}
      ></Table>
      <div className="mt-2">Total {data.length}</div>
    </div>
  );
};

export default AgencyWiseDocumentCount;
