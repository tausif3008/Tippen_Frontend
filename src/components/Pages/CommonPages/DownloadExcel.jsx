// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getCSVDataToDownloadCSV } from "../../../store/Actions/BaseAction";
// // import { CSVLink } from "react-csv";
// // import moment from "moment";

// import { useEffect } from "react";

// const DownloadExcel = ({ url, canProcess }) => {
//   const [excelData, setExcelData] = useState([]);
//   const dispatch = useDispatch();
//   const [canReturn, setcanReturn] = useState(false);
//   useEffect(() => {
//     if (canProcess) {
//       console.log(
//         "inside dispatssssssssssssssssssssssssssssssssssssssssssssssssssch"
//       );
//       dispatch(
//         getCSVDataToDownloadCSV({
//           URL: url,
//         })
//       );
//     }
//   }, [canProcess]);

//   const selector = useSelector((state) => state.allDocumentListSuperAdmin);
//   const [canDownload, setCanDownload] = useState(false);

//   useEffect(() => {
//     if (selector) {
//       if (selector.results) {
//         setExcelData((res) => [...res, ...selector.results]);
//       }
//       if (selector.next) {
//         setcanReturn(true);
//         // dispatch(
//         //   getAllDocumentListSuperAdmin({
//         //     URL: selector.next,
//         //   })
//         // );
//         setCanDownload(true);
//       } else {
//         console.log(
//           "excelDataexcelDataexcelDataexcelDataexcelDataexcelDataexcelData",
//           excelData
//         );
//       }
//     }
//   }, [selector]);

//   const rectificationDetails = [
//     {
//       title: "Barcode Number",
//       dataIndex: "barcode_number",
//     },
//     {
//       title: "District",
//       dataIndex: "district_name",
//     },
//     {
//       title: "District Code",
//       dataIndex: "district_code",
//     },
//     {
//       title: "Taluka",
//       dataIndex: "taluka_name",
//     },
//     {
//       title: "Taluka Code",
//       dataIndex: "taluka_code",
//     },
//     {
//       title: "Village",
//       dataIndex: "village_name",
//     },
//     {
//       title: "Village Code",
//       dataIndex: "village_code",
//     },
//     {
//       title: "Map Code",
//       dataIndex: "map_code",
//     },
//     {
//       title: "Polygon Count",
//       dataIndex: "polygon_count",
//     },
//     {
//       title: "Current Status",
//       dataIndex: "current_status",
//     },
//     {
//       title: "BEL Uploaded Status",
//       dataIndex: "bel_scan_uploaded",
//       render: (text, record) => {
//         const belScanUploaded = record.bel_scan_uploaded ? "1" : "0";
//         const belGovScanQCApproved = record.bel_gov_scan_qc_approved
//           ? "1"
//           : "0";
//         const belDraftUploaded = record.bel_draft_uploaded ? "1" : "0";
//         const belGovDraftQCApproved = record.bel_gov_draft_qc_approved
//           ? "1"
//           : "0";

//         //const belScanUploaded = record.bel_scan_uploaded ? '1' : '0';

//         // const CircleContainer = () => {
//         //   return (
//         //     <div className="circle-container">
//         //       <Tag className="circle" color="red"></Tag>
//         //       <Tag className="circle" color="blue"></Tag>
//         //       <Tag className="circle" color="green"></Tag>
//         //       <Tag className="circle" color="yellow"></Tag>
//         //     </div>
//         //   );
//         // };

//         return `${belScanUploaded}${belDraftUploaded}${belGovScanQCApproved}${belGovDraftQCApproved}`;
//       },
//     },
//     {
//       title: "Scan By",
//       dataIndex: "scan_by_username",
//     },
//     {
//       title: "Scan Uploaded Date",
//       dataIndex: "scan_uploaded_date",
//       render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
//     },
//     {
//       title: "Rectify Agency",
//       dataIndex: "rectify_agency_name",
//     },
//     {
//       title: "Rectify User",
//       dataIndex: "rectify_by_username",
//     },
//     {
//       title: "Digitize Agency",
//       dataIndex: "digitize_agency_name",
//     },
//     {
//       title: "Digitize User",
//       dataIndex: "digitize_by_username",
//     },
//     {
//       title: "Digitize Date",
//       dataIndex: "digitize_completed_date",
//       render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
//     },
//     {
//       title: "QC Agency",
//       dataIndex: "qc_agency_name",
//     },
//     {
//       title: "QC User",
//       dataIndex: "qc_by_username",
//     },
//     {
//       title: "QC Date",
//       dataIndex: "qc_completed_date",
//       render: (text) => moment(text).format("DD-MM-YYYY hh:mm:ss"), // Formatting the date
//     },
//   ];

//   function handleDownloadExcelData() {
//     let tableDetails = [];

//     if (excelData[0]) {
//       const tableHeaders = rectificationDetails;
//       let tableHeadersNew = [];
//       let pdfTablelength = rectificationDetails.length;

//       for (let index = 0; index < pdfTablelength; index++) {
//         tableHeadersNew.push(tableHeaders[index]?.dataIndex);
//       }

//       for (let index = 0; index < excelData.length; index++) {
//         let row = [];
//         for (let r = 0; r < tableHeadersNew.length; r++) {
//           if (tableHeadersNew[r] == "barcode_number") {
//             row.push(`${excelData[index][tableHeadersNew[r]]}_`);
//           } else if (tableHeadersNew[r] == "district_name") {
//             row.push(`${excelData[index][tableHeadersNew[r]]?.district_name}`);
//           } else if (tableHeadersNew[r] == "taluka_name") {
//             row.push(`${excelData[index][tableHeadersNew[r]]?.taluka_name}`);
//           } else if (tableHeadersNew[r] == "village_name") {
//             row.push(`${excelData[index][tableHeadersNew[r]]?.village_name}`);
//           } else if (
//             excelData[index][tableHeadersNew[r]] &&
//             (tableHeadersNew[r] == "scan_uploaded_date" ||
//               tableHeadersNew[r] == "digitize_completed_date" ||
//               tableHeadersNew[r] == "qc_completed_date")
//           ) {
//             row.push(
//               `${excelData[index][tableHeadersNew[r]]
//                 .toString()
//                 .substr(0, 10)}` + "_"
//             );
//           } else {
//             if (excelData[index][tableHeadersNew[r]]) {
//               row.push(`${excelData[index][tableHeadersNew[r]]}`);
//             } else row.push("");
//           }
//           //   console.log(tableHeadersNew[r], excelData[index]);
//         }

//         tableDetails.push(row);
//       }
//     }

//     return tableDetails;
//   }
//   function handleDownloadExcelColumns() {
//     let tableHeadersNames = [];

//     if (excelData[0]) {
//       let pdfTablelength = 0;
//       pdfTablelength = rectificationDetails.length;

//       for (let index = 0; index < pdfTablelength; index++) {
//         tableHeadersNames.push(rectificationDetails[index]["title"]);
//         console.log(rectificationDetails[index]["title"]);
//       }
//     }
//     return tableHeadersNames;
//   }
//   const [data, setData] = useState(false);

//   useEffect(() => {
//     if (canReturn) {
//       // document.querySelector("#csvLink").click();
//       let excelData = handleDownloadExcelData();
//       let columns = handleDownloadExcelColumns();
//       if (excelData && columns) {
//         setData({ data: excelData, columns });
//       }
//     }
//   }, [canReturn]);

//   useEffect(() => {
//     if (data) {
//       setCanDownload(true);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (canDownload) {
//       // document.querySelector("#csvLink").click();
//     }
//   }, [canDownload]);

//   return (
//     <>
//       {canDownload && (
//         <CSVLink
//           id="csvLink"
//           filename={"District_Wise_Completed_Files"}
//           data={data?.data ? data.data : []}
//           headers={data?.columns ? data?.canProcess : []}
//         ></CSVLink>
//       )}
//     </>
//   );
// };

// export default DownloadExcel;
