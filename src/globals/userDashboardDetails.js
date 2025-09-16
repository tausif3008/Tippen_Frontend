import {
  FileOutlined,
  FormOutlined,
  ProfileOutlined,
  TableOutlined,
  UploadOutlined,
  UserOutlined,
  SwapLeftOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { getUser } from "../utils/sessionStorage";

const superAdminDashboardDetails = [
  {
    key: "allDocumentList",
    labels: "All Documents",
    icon: TableOutlined,
  },
  {
    key: "fileAllocations",
    labels: "File Allocation",
    icon: FileOutlined,
  },
  {
    key: "notFoundFiles",
    labels: "Not Found Files",
    icon: FileOutlined,
  },
  {
    key: "mapTyleDocumentList",
    labels: "Map Type List",
    icon: TableOutlined,
  },
  {
    key: "upload",
    labels: "Upload Files",
    icon: UploadOutlined,
  },
  {
    key: "agencyDetails",
    labels: "Agency Details",
    icon: UserOutlined,
  },
  {
    key: "agencyWiseDocumentCount",
    labels: "Agency Document Count",
    icon: FileOutlined,
  },
  {
    labels: "District List",
    key: "createDistrict",
    icon: TableOutlined,
  },
  {
    labels: "Taluka List",
    key: "createTaluka",
    icon: TableOutlined,
  },
  {
    key: "createVillage",
    labels: "Village List",
    icon: TableOutlined,
  },
  {
    key: "reports",
    labels: "Reports",
    icon: ProfileOutlined,
  },
  {
    key: "todaysMapTypeReports",
    labels: "Todays Reports",
    icon: ProfileOutlined,
  },
  {
    key: "reupload",
    labels: "Re Upload Files",
    icon: UploadOutlined,
  },
  {
    key: "preScanDocumentList",
    labels: "Pre-scan List",
    icon: ScanOutlined,
  },
  {
    key: "todaysPreScanDocumentList",
    labels: "Todays Pre-scan List",
    icon: ScanOutlined,
  },
  {
    key: "preDraftList",
    labels: "Pre Draft List",
    icon: TableOutlined,
  },
  {
    key: "todaysPreDraftDocumentList",
    labels: "Todays Pre-draft List",
    icon: ScanOutlined,
  },
  {
    key: "bellUploading",
    labels: "Bel Uploading",
    icon: UploadOutlined,
  },
  {
    key: "createTalukaAdminForm",
    labels: "Create Taluka Admin Form",
    icon: FormOutlined,
  },
  {
    key: "createDistrictAdmin",
    labels: "Create District Admin Form",
    icon: FormOutlined,
  },
  {
    key: "updateQCPolygonCount",
    labels: "Update Polygon Count",
    icon: FileOutlined,
  },
  {
    key: "userToAgency",
    labels: "Retrieve Files From Agency",
    icon: SwapLeftOutlined,
  },
];

const adminDashboardDetails = [
  {
    key: "allDocumentList",
    labels: "All Documents",
    icon: TableOutlined,
  },
  {
    key: "fileAllocationToUser",
    labels: "File Allocation",
    icon: FileOutlined,
  },
  {
    key: "UserFileExchange",
    labels: "User File Exchange",
    icon: FileOutlined,
  },
  {
    key: "userList",
    labels: "User List",
    icon: UserOutlined,
  },
  {
    key: "userWiseDocumentCount",
    labels: "User Document Count",
    icon: UserOutlined,
  },
  {
    key: "reports",
    labels: "Reports",
    icon: ProfileOutlined,
  },
  {
    key: "todaysMapTypeReports",
    labels: "Todays Reports",
    icon: ProfileOutlined,
  },
];

const talukaAdminMenu = [
  {
    key: "allDocumentList",
    labels: "All Documents",
    icon: TableOutlined,
  },
  {
    key: "upload",
    labels: "Upload Scan Files",
    icon: UploadOutlined,
  },
  // {
  //   key: "reupload",
  //   labels: "Re Upload Scanned Files",
  //   icon: UploadOutlined,
  // },
  {
    key: "createPrescanDocument",
    labels: "Pre-scan Form",
    icon: ScanOutlined,
  },
  {
    key: "preScanDocumentList",
    labels: "Pre-can List",
    icon: ScanOutlined,
  },
  {
    key: "todaysPreScanDocumentList",
    labels: "Todays Pre-scan List",
    icon: ScanOutlined,
  },
];

const districtAdminMenu = [
  {
    key: "allDocumentList",
    labels: "All Documents",
    icon: TableOutlined,
  },
  {
    key: "reupload",
    labels: "Re Upload Scanned Files",
    icon: UploadOutlined,
  },
  {
    key: "preScanDocumentList",
    labels: "Pre-scan List",
    icon: ScanOutlined,
  },
  {
    key: "todaysPreScanDocumentList",
    labels: "Todays Pre-scan List",
    icon: ScanOutlined,
  },
  {
    key: "preDraftList",
    labels: "Pre Draft List",
    icon: TableOutlined,
  },
  {
    key: "todaysPreDraftDocumentList",
    labels: "Todays Pre-draft List",
    icon: ScanOutlined,
  },
  {
    key: "userFileSection",
    labels: "Govt QC Upload Files",
    icon: UploadOutlined,
  },
];

const userDashboardDetails = [
  { key: "userFileSection", labels: "Users File Section", icon: FileOutlined },
  {
    key: "updateQCPolygonCount",
    labels: "Update Polygon Count",
    icon: FileOutlined,
  },
];

const auth = getUser();

const getUserLinks = () => {
  if (auth) {
    let role = auth?.user_details["role_name"];
    if (role === "Super Admin") {
      return superAdminDashboardDetails;
    } else if (role === "Agency Admin") {
      return adminDashboardDetails;
    } else if (role === "District Admin") {
      return districtAdminMenu;
    } else if (role === "Taluka Admin") {
      return talukaAdminMenu;
    } else {
      return userDashboardDetails;
    }
  }
};

export { getUserLinks };
