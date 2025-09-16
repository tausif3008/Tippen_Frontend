import { AppImages } from "../globals/AppImages";

export function getDashboardCards(departments) {
  const auth = JSON.parse(localStorage.getItem("user"));
  const user = auth?.user_details["role_name"];

  let cards = [
    {
      id: "totalScan",
      titleCard: "Total Scan Uploaded",
      count: 0,
      iconn: (
        <img
          src={AppImages.dashboardScanUploadImage}
          alt=""
          style={{ width: "100%", padding: "20%" }}
        />
      ),
    },
    {
      id: "totalRectify",
      titleCard: "Total Rectify",
      count: 0,
      iconn: (
        <img
          src={AppImages.dashboardRectifyImage}
          alt=""
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "totalDigitize",
      titleCard: "Total Digitize Completed",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardDigitizeImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "totalQC",
      titleCard: "Total QC Completed",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardQCImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "totalPdf",
      titleCard: "Total PDF Completed ",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardPDFImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "totalPolygon",
      titleCard: "Total Digitize Polygon",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardPolygonImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "belTotalScan",
      titleCard: "BEL Scan Uploaded",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardRectifyImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
    {
      id: "belTotalDraft",
      titleCard: "BEL Draft Uploaded",
      count: 0,
      iconn: (
        <img
          alt=""
          src={AppImages.dashboardDigitizeImage}
          style={{ width: "100%", padding: "20%" }}
        ></img>
      ),
    },
  ];

  let dataList = [];

  if (user === "Super Admin" || user === "Agency Admin") {
    dataList = cards;
  } else {
    if (departments.includes("Rectify")) {
      dataList.push(cards[1]);
    }

    if (departments.includes("Digitize")) {
      dataList.push(cards[2]);
    }

    if (departments.includes("QC")) {
      dataList.push(cards[3]);
      dataList.push(cards[4]);
    }

    if (departments.includes("Scan")) {
      dataList.push(cards[0]);
    }
  }
  return dataList;
}
