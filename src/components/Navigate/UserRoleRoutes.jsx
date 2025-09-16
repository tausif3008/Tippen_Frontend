import { Route } from "react-router-dom";
import { lazy } from "react";
import { getUser } from "../../utils/sessionStorage";

const TodaysPreDraftDocumentList = lazy(() =>
  import("../Pages/CommonPages/TodaysPreDraftDocumentList")
);
const UserToAgency = lazy(() => import("../Pages/SuperAdmin/UserToAgency"));
const TodaysPreScanDocumentList = lazy(() =>
  import("../Pages/CommonPages/TodaysPreScanDocumentList")
);
const UpdateQCPolygonCount = lazy(() =>
  import("../Pages/User/updateQCPolygonCount")
);
const DashboardPage = lazy(() => import("../Pages/Dashboard/DashboardPage"));
const ScanUpload = lazy(() => import("../Pages/SuperAdmin/Upload"));
const FileUploadSection = lazy(() =>
  import("../Pages/SuperAdmin/FileUploadSection")
);
const AgencyUploadSection = lazy(() =>
  import("../Pages/Agency/AgencyUploadSection")
);
const UserFiles = lazy(() => import("../Pages/User/UserFiles"));
const AllDocumentList = lazy(() =>
  import("../Pages/CommonPages/AllDocumentList")
);
const AgencyDetails = lazy(() => import("../Pages/SuperAdmin/AgencyDetails"));
const NotFoundFiles = lazy(() => import("../Pages/SuperAdmin/NotFoundFiles"));
const CreateVillage = lazy(() =>
  import("../Pages/SuperAdmin/Forms/CreateVillage")
);
const CreateDistrict = lazy(() =>
  import("../Pages/SuperAdmin/Forms/CreateDistrict")
);
const CreateTaluka = lazy(() =>
  import("../Pages/SuperAdmin/Forms/CreateTaluka")
);
const MapTypeDocumentList = lazy(() =>
  import("../Pages/SuperAdmin/MapTypeDocumentList")
);
const ReScanUpload = lazy(() => import("../Pages/SuperAdmin/ReUpload"));
const UserList = lazy(() => import("../Pages/Agency/UserList"));
const UserWiseDocumentCount = lazy(() =>
  import("../Pages/Agency/UserWiseDocumentCount")
);
const AgencyWiseDocumentCount = lazy(() =>
  import("../Pages/SuperAdmin/AgencyWiseDocumentCount")
);
const UserFileExchange = lazy(() => import("../Pages/Agency/UserFileExchange"));
const CreatePrescanDocument = lazy(() =>
  import("../Pages/User/CreatePrescanDocument")
);
const PreScanDocumentList = lazy(() =>
  import("../Pages/CommonPages/PreScanDocumentList")
);

const BellUploding = lazy(() => import("../Pages/CommonPages/BellUploding"));
const CreateTalukaAdminForm = lazy(() =>
  import("../Pages/SuperAdmin/Forms/CreateTalukaAdminForm")
);

const CreateDistrictAdmin = lazy(() =>
  import("../Pages/SuperAdmin/Forms/CreateDistrictAdmin")
);

const PreDraftList = lazy(() => import("../Pages/SuperAdmin/PreDraftList"));
const ReportSection = lazy(() => import("../Pages/CommonPages/Reports"));
const TodaysMapTypeReport = lazy(() =>
  import("../Pages/CommonPages/TodaysMapTypeReport")
);

const CommonRoutes = () => {
  return (
    <>
      <Route path="dashboard" element={<DashboardPage></DashboardPage>}></Route>
      <Route
        path="allDocumentList/page=/:pageNumber"
        element={<AllDocumentList></AllDocumentList>}
      ></Route>
    </>
  );
};

const SuperAdminRoutes = () => {
  return (
    <>
      <Route path="upload" element={<ScanUpload></ScanUpload>}></Route>
      <Route path="reupload" element={<ReScanUpload></ReScanUpload>}></Route>
      <Route
        path="fileAllocations"
        element={<FileUploadSection></FileUploadSection>}
      ></Route>
      <Route
        path="agencyDetails"
        element={<AgencyDetails></AgencyDetails>}
      ></Route>
      <Route
        path="notFoundFiles"
        element={<NotFoundFiles></NotFoundFiles>}
      ></Route>
      <Route
        path="createVillage"
        element={<CreateVillage></CreateVillage>}
      ></Route>
      <Route
        path="createDistrict"
        element={<CreateDistrict></CreateDistrict>}
      ></Route>
      <Route
        path="createTaluka"
        element={<CreateTaluka></CreateTaluka>}
      ></Route>
      <Route path="reports" element={<ReportSection></ReportSection>}></Route>
      <Route
        path="todaysMapTypeReports"
        element={<TodaysMapTypeReport></TodaysMapTypeReport>}
      ></Route>
      <Route
        path="mapTyleDocumentList"
        element={<MapTypeDocumentList></MapTypeDocumentList>}
      ></Route>
      <Route
        path="agencyWiseDocumentCount"
        element={<AgencyWiseDocumentCount></AgencyWiseDocumentCount>}
      ></Route>
      <Route
        path="preScanDocumentList"
        element={<PreScanDocumentList></PreScanDocumentList>}
      ></Route>
      <Route
        path="todaysPreScanDocumentList"
        element={<TodaysPreScanDocumentList></TodaysPreScanDocumentList>}
      ></Route>
      <Route
        path="todaysPreDraftDocumentList"
        element={<TodaysPreDraftDocumentList></TodaysPreDraftDocumentList>}
      ></Route>
      <Route
        path="bellUploading"
        element={<BellUploding></BellUploding>}
      ></Route>
      <Route
        path="createTalukaAdminForm"
        element={<CreateTalukaAdminForm></CreateTalukaAdminForm>}
      ></Route>
      <Route
        path="createDistrictAdmin"
        element={<CreateDistrictAdmin></CreateDistrictAdmin>}
      ></Route>
      <Route
        path="preDraftList"
        element={<PreDraftList></PreDraftList>}
      ></Route>
      <Route path="userFileSection" element={<UserFiles></UserFiles>}></Route>
      <Route
        path="updateQCPolygonCount"
        element={<UpdateQCPolygonCount></UpdateQCPolygonCount>}
      ></Route>
      <Route
        path="userToAgency"
        element={<UserToAgency></UserToAgency>}
      ></Route>
    </>
  );
};

export default SuperAdminRoutes;

const AgencyAdminRoutes = () => {
  return (
    <>
      <Route
        path="fileAllocationToUser"
        element={<AgencyUploadSection></AgencyUploadSection>}
      />
      <Route
        path="UserFileExchange"
        element={<UserFileExchange></UserFileExchange>}
      ></Route>
      <Route path="userList" element={<UserList></UserList>}></Route>
      <Route
        path="userWiseDocumentCount"
        element={<UserWiseDocumentCount></UserWiseDocumentCount>}
      ></Route>
      <Route path="reports" element={<ReportSection></ReportSection>}></Route>
      <Route
        path="todaysMapTypeReports"
        element={<TodaysMapTypeReport></TodaysMapTypeReport>}
      ></Route>
      <Route
        path="createVillage"
        element={<CreateVillage></CreateVillage>}
      ></Route>
    </>
  );
};

const DistrictAdminRoutes = () => {
  return (
    <>
      <Route path="upload" element={<ScanUpload></ScanUpload>}></Route>
      <Route path="reupload" element={<ReScanUpload></ReScanUpload>}></Route>
      <Route
        path="preScanDocumentList"
        element={<PreScanDocumentList></PreScanDocumentList>}
      ></Route>
      <Route
        path="todaysPreScanDocumentList"
        element={<TodaysPreScanDocumentList></TodaysPreScanDocumentList>}
      ></Route>
      <Route
        path="preDraftList"
        element={<PreDraftList></PreDraftList>}
      ></Route>
      <Route
        path="todaysPreDraftDocumentList"
        element={<TodaysPreDraftDocumentList></TodaysPreDraftDocumentList>}
      ></Route>
      <Route path="userFileSection" element={<UserFiles></UserFiles>}></Route>
    </>
  );
};

const TalukaAdminRoutes = () => {
  return (
    <>
      <Route path="upload" element={<ScanUpload></ScanUpload>}></Route>
      <Route path="reupload" element={<ReScanUpload></ReScanUpload>}></Route>

      <Route
        path="createPrescanDocument"
        element={<CreatePrescanDocument></CreatePrescanDocument>}
      ></Route>
      <Route
        path="preScanDocumentList"
        element={<PreScanDocumentList></PreScanDocumentList>}
      ></Route>
      <Route
        path="todaysPreScanDocumentList"
        element={<TodaysPreScanDocumentList></TodaysPreScanDocumentList>}
      ></Route>
      <Route
        path="todaysPreDraftDocumentList"
        element={<TodaysPreDraftDocumentList></TodaysPreDraftDocumentList>}
      ></Route>
    </>
  );
};

const UserRoutes = () => {
  return (
    <>
      <Route path="userFileSection" element={<UserFiles></UserFiles>}></Route>
      <Route
        path="updateQCPolygonCount"
        element={<UpdateQCPolygonCount></UpdateQCPolygonCount>}
      ></Route>
    </>
  );
};

const auth = getUser();

function getUserRoutes() {
  if (auth) {
    let role = auth?.user_details["role_name"];
    if (role === "Super Admin") {
      return SuperAdminRoutes();
    } else if (role === "Agency Admin") {
      return AgencyAdminRoutes();
    } else if (role === "District Admin") {
      return DistrictAdminRoutes();
    } else if (role === "Taluka Admin") {
      return TalukaAdminRoutes();
    } else {
      return UserRoutes();
    }
  }
}

export { getUserRoutes, CommonRoutes };
