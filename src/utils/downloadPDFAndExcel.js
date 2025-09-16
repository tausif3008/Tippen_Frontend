import jsPDF from "jspdf";
import { AppImages } from "../globals/AppImages";
import moment from "moment";
import "jspdf-autotable";
import { getUserRole } from "../utils/sessionStorage";
let LoggedInUserRole = "";

if (getUserRole()) {
  LoggedInUserRole = getUserRole();
}

const generatePDF = (
  title,
  downloadFileName,
  tableHeaders,
  tableDetails,
  id
) => {
  const doc = new jsPDF();
  doc.setFont("Helvetica", "bold", 10);
  let atrss = !id
    ? { head: [tableHeaders], body: tableDetails }
    : {
        html: "#myTable",
      };
  const today = new Date();
  const day = today.getDate();

  const month = today.getMonth();
  const year = today.getFullYear();

  doc.setFontSize(12);
  const formattedDate = `${day}/${month + 1}/${year}`;
  doc.autoTable({
    ...atrss,
    styles: {
      lineWidth: 0.01,
      // fillColor: "orange",
    },

    columnStyles: {
      europe: { halign: "center" },
      theme: "striped",
    },

    rowStyle: { europe: { halign: "center" } },

    margin: { horizontal: 10, vertical: 23 },
    bodyStyles: { valign: "top" },
    showHead: "everyPage",

    // 🔽 This makes the last row (Total) bold
    didParseCell: function (data) {
      const isLastRow = data.row.index === tableDetails.length - 1;
      if (data.section === 'body' && isLastRow) {
        data.cell.styles.fontStyle = 'bold';
      }
    },

    didDrawPage: function (data) {
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(`${title}`, data.settings.margin.left, 10);
      let pageSize = doc.internal.pageSize;
      let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

      doc.addImage(
        AppImages.metaiImage,
        "JPEG",
        pageSize.getWidth() - 38,
        5,
        28,
        7
      );

      doc.setFontSize(10);
      doc.line(5, 15, pageSize.getWidth() - 7, 15);

      doc.text(`Date: ${formattedDate}`, pageSize.getWidth() - 39, 20);

      doc.addImage(
        AppImages.pdfFooterImage,
        "JPEG",
        0,
        pageHeight - 20,
        pageSize.getWidth() - 10,
        15
      );
    },
  });

  doc.setFont("Helvetica", "bold", 10);
  doc.save(`${downloadFileName}_${formattedDate}.pdf`);
};

const getAllDocumentsDownloadingResult = (res) => {
  let rectificationDetails = [];

  if (LoggedInUserRole === "Super Admin") {
    rectificationDetails = [];
    rectificationDetails = [
      "Barcode Number",
      "District",
      "District Code",
      "Taluka",
      "Taluka Code",
      "Village",
      "Village Code",
      "Map Code",
      "Digitize Polygon Count",
      "QC Polygon Count",
      "Current Status",
      "Scan By",
      "Scan Uploaded Date",
      "Rectify Agency",
      "Rectify User",
      "Rectify Date",
      "Rectify Remarks",
      "Digitize Agency",
      "Digitize User",
      "Digitize Date",
      "Digitize Remarks",
      "QC Agency",
      "QC User",
      "QC Date",
      "QC Remarks",
      "Topology By Username",
      "Topology Assign Date",
      "Topology Completed Date",
      "Shape By Username",
      "Shape Assign Date",
      "Shape Completed Date",
      "BEL Scan",
      "Govt Scan Approved",
      "BEL Draft",
      "Govt Draft Approved",
    ];
  } else {
    rectificationDetails = [];
    rectificationDetails = [
      "Barcode Number",
      "District",
      "Taluka",
      "Village",
      "Map Code",
      "Polygon Count",
      "Current Status",
      "Rectify Agency",
      "Rectify User",
      "Rectify Date",
      "Digitize Agency",
      "Digitize User",
      "Digitize Date",
      "Topology By Username",
      "Topology Assign Date",
      "Topology Completed Date",
      "Shape By Username",
      "Shape Assign Date",
      "Shape Completed Date",
    ];
  }
  let tableDetailsArray = [];
  for (let index = 0; index < res.length; index++) {
    // tableDetailsArray.push({
    //   ...res[index],
    //   key: res[index]["id"],
    //   district:
    //     res[index].district_name && res[index].district_name.district_name,
    //   taluka: res[index].taluka_name && res[index].taluka_name.taluka_name,
    //   village: res[index].village_name && res[index].village_name.village_name,
    // });

    if (LoggedInUserRole === "Super Admin") {
      tableDetailsArray.push([
        res[index]?.barcode_number + "_" || "-",
        (res[index]?.district_name && res[index].district_name.district_name) ||
          "-",
        res[index]?.district_code || "-",
        (res[index]?.taluka_name && res[index].taluka_name.taluka_name) || "-",
        res[index]?.taluka_code || "-",
        (res[index]?.village_name && res[index].village_name.village_name) ||
          "-",
        res[index]?.village_code || "-",
        res[index]?.map_code || "-",
        res[index]?.polygon_count || "-",
        res[index]?.qc_polygon_count || "-",
        res[index]?.current_status || "-",
        res[index]?.scan_by_username || "-",
        (res[index]?.scan_uploaded_date &&
          moment(res[index]?.scan_uploaded_date).format("DD-MM-YYYY") + "_") ||
          "",
        res[index]?.rectify_agency_name || "-",
        res[index]?.rectify_by_username || "-",
        (res[index]?.rectify_completed_date &&
          moment(res[index]?.rectify_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "-",
        res[index]?.remarks?.replace(/,/g, ".") || "-",
        res[index]?.digitize_agency_name || "-",
        res[index]?.digitize_by_username || "-",
        res[index]?.digitize_completed_date
          ? moment(res[index]?.digitize_completed_date).format("DD-MM-YYYY") +
            "_"
          : "-",
        res[index]?.digitize_remarks?.replace(/,/g, ".") || "-",
        res[index]?.qc_agency_name || "-",
        res[index]?.qc_by_username || "-",
        (res[index]?.qc_completed_date &&
          moment(res[index]?.qc_completed_date).format("DD-MM-YYYY") + "_") ||
          "-",
        res[index]?.qc_remarks?.replace(/,/g, ".") || "-",
        res[index]?.topology_by_username || "-",
        (res[index]?.topology_assign_date &&
          moment(res[index]?.topology_assign_date).format("DD-MM-YYYY") +
            "_") ||
          "-",
        (res[index]?.topology_completed_date &&
          moment(res[index]?.topology_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "-",
        res[index]?.shape_by_username || "-",
        (res[index]?.shape_assign_date &&
          moment(res[index]?.shape_assign_date).format("DD-MM-YYYY") + "_") ||
          "-",
        (res[index]?.shape_completed_date &&
          moment(res[index]?.shape_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "-",
        res[index]?.bel_scan_uploaded || "-",
        res[index]?.bel_gov_scan_qc_approved || "-",
        res[index]?.bel_draft_uploaded || "-",
        res[index]?.bel_gov_draft_qc_approved || "-",
      ]);
    } else {
      tableDetailsArray.push([
        res[index]?.barcode_number + "_" || "-",
        (res[index]?.district_name && res[index].district_name.district_name) ||
          "-",
        (res[index]?.taluka_name && res[index].taluka_name.taluka_name) || "-",
        (res[index]?.village_name && res[index].village_name.village_name) ||
          "-",
        res[index]?.map_code || "-",
        res[index]?.polygon_count || "-",
        res[index]?.current_status || "-",
        res[index]?.rectify_agency_name || "-",
        res[index]?.rectify_by_username || "-",
        (res[index]?.rectify_completed_date &&
          moment(res[index]?.rectify_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "",
        res[index]?.digitize_agency_name || "-",
        res[index]?.digitize_by_username || "-",
        (res[index]?.digitize_completed_date &&
          moment(res[index]?.digitize_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "",
        res[index]?.topology_by_username || "-",
        (res[index]?.topology_assign_date &&
          moment(res[index]?.topology_assign_date).format("DD-MM-YYYY") +
            "_") ||
          "",
        (res[index]?.topology_completed_date &&
          moment(res[index]?.topology_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "",
        res[index]?.shape_by_username || "-",
        (res[index]?.shape_assign_date &&
          moment(res[index]?.shape_assign_date).format("DD-MM-YYYY") + "_") ||
          "",
        (res[index]?.shape_completed_date &&
          moment(res[index]?.shape_completed_date).format("DD-MM-YYYY") +
            "_") ||
          "",
      ]);
    }
  }

  let data =
    `${rectificationDetails.join(",")}` +
    "\n" +
    tableDetailsArray
      .map((laptop) => Object.values(laptop).join(","))
      .join("\n");
  return data;
};
export { generatePDF, getAllDocumentsDownloadingResult };
