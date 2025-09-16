import { API_CONSTANTS } from "../../globals/ApiConstants";
import { contentType } from "../../globals/ContentType";
import { URLS } from "../../globals/urls";

function userLogin(payload) {
  return {
    type: API_CONSTANTS.USER_LOGIN,
    payload,
    URL: URLS.USER_LOGIN_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userProfileAction(payload) {
  return {
    type: API_CONSTANTS.USER_PROFILE,
    payload,
    URL: URLS.USER_PROFILE_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createUserPostAction(payload) {
  return {
    type: API_CONSTANTS.CREATE_USER,
    payload,
    URL: URLS.ADD_USER_URL,
  };
}

function uploadScannedFilesPostAction(payload, isFinal) {
  return {
    type: API_CONSTANTS.UPLOAD_SCANNED_FILES,
    payload,
    isFinal,
    URL: URLS.UPLOAD_SCANNED_FILES_ULR,
    contentType: contentType.formDataType,
  };
}

function uploadRectifyDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_RECTIFY_FILES,
    payload,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadRectifyDocumentsPutActionRejected(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_RECTIFY_FILES_REJECTED,
    payload: payload.remarksList,
    URL: payload.URL,
    message: "Successfully Updated!",
    contentType: contentType.jsonContentTpye,
  };
}

function uploadDigitizedDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_DIGITIZED_FILES,
    payload,
    URL: URLS.UPLOAD_DIGITIZED_FILES_URL,
    contentType: contentType.formDataType,
  };
}

function uploadShapeDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_SHAPE_FILES,
    payload,
    URL: URLS.UPLOAD_SHAPE_FILES_URL,
    contentType: contentType.formDataType,
  };
}

function uploadTopologyDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_TOPOLOGY_FILES,
    payload,
    URL: URLS.UPLOAD_TOPOLOGY_FILES_URL,
    contentType: contentType.formDataType,
  };
}

function uploadQcDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_QC_FILES,
    payload,
    URL: URLS.UPLOAD_QC_FILES_URL,
    contentType: contentType.formDataType,
  };
}

function uploadGovQcDocumentsPutAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_GOV_QC_FILES,
    payload,
    URL: URLS.UPLOAD_GOV_QC_FILES_URL,
    contentType: contentType.formDataType,
  };
}

function allocateToRectifySuper(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_RECTIFY_AGENCY,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToDigitizeySuper(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_DIGITIZE,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToShapeSuper(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_SHAPE,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToRectifyAgency(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_RECTIFY_AGENCY,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setAllocateToRectifyAgencyFalse() {
  return {
    type: API_CONSTANTS.SET_ALLOCATE_TO_AGENCIES_RESULT_FALSE,
  };
}

function allocateToUserDigitizeAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_DIGITIZE_AGENCY,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToUserShapeAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_SHAPE_AGENCY,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToUserTopologyAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_TOPOLOGY_AGENCY,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToRectifyPut(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_RECTIFY_PUT,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
    message: "Details Assigned Successfully.",
  };
}

// pagination action
function paginationAction(payload) {
  return {
    type: API_CONSTANTS.GET_PAGINATION_DETAILS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

// pagination action
function digitizePaginationAction(payload) {
  return {
    type: API_CONSTANTS.GET_DIGITIZE_PAGINATION_DETAILS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

// pagination action
function shapePaginationAction(payload) {
  return {
    type: API_CONSTANTS.GET_SHAPE_PAGINATION_DETAILS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

// pagination action
function GovtQCPdfPaginationCompleteDocList(payload) {
  return {
    type: API_CONSTANTS.GET_GOV_QC_PDF_DOC_LIST_PAGINATION_DETAILS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function digitizeSubmitToAgency(payload) {
  return {
    type: API_CONSTANTS.SUBMIT_TO_AGENCY,
    payload,
    URL: payload.URL,
    message: "Files submitted to the agency successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function shapeSubmitToAgency(payload) {
  return {
    type: API_CONSTANTS.SHAPE_SUBMIT_TO_AGENCY,
    payload,
    URL: payload.URL,
    message: "Files submitted to the agency successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function topologySubmitToAgency(payload) {
  return {
    type: API_CONSTANTS.TOPOLOGY_SUBMIT_TO_AGENCY,
    payload,
    URL: payload.URL,
    message: "Files submitted to the agency successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function agencyListingAction(payload) {
  return {
    type: API_CONSTANTS.AGENCY_LISTING,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userListAction(payload) {
  return {
    type: API_CONSTANTS.ALL_USERS_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyUserListAction(payload) {
  return {
    type: API_CONSTANTS.AGENCY_USER_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyDigitizeUseList(payload) {
  return {
    type: API_CONSTANTS.DIGITIZE_AGENCY_USER_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyShapeUseList(payload) {
  return {
    type: API_CONSTANTS.SHAPE_AGENCY_USER_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyTopologyUserList(payload) {
  return {
    type: API_CONSTANTS.TOPOLOGY_AGENCY_USER_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyQCUseList(payload) {
  return {
    type: API_CONSTANTS.QC_AGENCY_USER_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function districtUserList(payload) {
  return {
    type: API_CONSTANTS.DISTRICT_USER_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateTopologySuper(payload) {
  return {
    type: API_CONSTANTS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userRectifAction(payload) {
  return {
    type: API_CONSTANTS.GET_USER_RECTIFY_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateFilesToUserAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TO_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
    message: "File assigned to selected user.",
  };
}

function allocateDigitizedFilesToUserAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_DIGITIZE_FILES_TO_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
    message: "File assigned to selected user.",
  };
}

function allocateShapeFilesToUserAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_SHAPE_FILES_TO_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
    message: "File assigned to selected user.",
  };
}

function allocateTopologyFilesToUserAction(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_TOPOLOGY_FILES_TO_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
    message: "File assigned to selected user.",
  };
}

// pagination action
function DigitizePaginationAgencyAction(payload) {
  return {
    type: API_CONSTANTS.DIGITIZE_AGENCY_PAGINATION_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function ShapePaginationAgencyAction(payload) {
  return {
    type: API_CONSTANTS.SHAPE_AGENCY_PAGINATION_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function TopologyPaginationAgencyAction(payload) {
  return {
    type: API_CONSTANTS.TOPOLOGY_AGENCY_PAGINATION_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function digitizeResultsActionUser(payload) {
  return {
    type: API_CONSTANTS.DIGITIZATION_PROCESS_USER,
    payload,
    URL: payload.URL,
    message: "Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function shapeResultsActionUser(payload) {
  return {
    type: API_CONSTANTS.SHAPE_PROCESS_USER,
    payload,
    URL: payload.URL,
    message: "Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function topologyResultsActionUser(payload) {
  return {
    type: API_CONSTANTS.TOPOLOGY_PROCESS_USER,
    payload,
    URL: payload.URL,
    message: "Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function userDigitizePaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_PAGINATION_DIGITIZE_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userShapePaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_PAGINATION_SHAPE_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userTopologyPaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_PAGINATION_TOPOLOGY_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function uploadDigitizedFileByUser(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadShapeFileByUser(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadTopologyFileByUser(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER,
    payload,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadDigitizeDocumentsPutActionRejected(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER_REJECTED,
    payload: payload.remarksList,
    URL: payload.URL,
    message: "Successfully Updated!",
    contentType: contentType.jsonContentTpye,
  };
}

function uploadShapeDocumentsPutActionRejected(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER_REJECTED,
    payload: payload.remarksList,
    URL: payload.URL,
    message: "Successfully Updated!",
    contentType: contentType.jsonContentTpye,
  };
}

function uploadTopologyDocumentsPutActionRejected(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER_REJECTED,
    payload: payload.remarksList,
    URL: payload.URL,
    message: "Successfully Updated!",
    contentType: contentType.jsonContentTpye,
  };
}

function GetQcFileSuperAdminAction(payload) {
  return {
    type: API_CONSTANTS.GET_QC_DETAILS,
    payload,
    URL: payload.URL,
    message: "Files assigned to the selected agency.",
    contentType: contentType.jsonContentTpye,
  };
}

function QcDetailsPagination(payload) {
  return {
    type: API_CONSTANTS.QC_DETAILS_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocateToQCAdmin(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_QC_FILES_TO_AGENCY,
    payload,
    URL: payload.URL,
    message: "Files submitted to the agency successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function AssignQcFilesToUser(payload) {
  return {
    type: API_CONSTANTS.GET_QC_FILE_AGENCY_ADMIN,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function QCPaginationAgencyAction(payload) {
  return {
    type: API_CONSTANTS.QC_AGENCY_PAGINATION_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function AssignGovtQcFilesToDistrictAdmin(payload) {
  return {
    type: API_CONSTANTS.GET_GOVT_QC_FILE_DIST_ADMIN,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function GovtQCPaginationDistrictAdminAction(payload) {
  return {
    type: API_CONSTANTS.GOVT_QC_PAGINATION_DIST_ADMIN_ACTION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function allocatePdfFilesToDistAdmin(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_PDF_FILES_TO_DIST_ADMIN,
    payload,
    URL: payload.URL,
    message: "Selected files assigned to the user successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function allocateDigitizedFilesToUser(payload) {
  return {
    type: API_CONSTANTS.ALLOCATE_DIGITIZED_FILES_TO_USER,
    payload,
    URL: payload.URL,
    message: "Selected files assigned to the user successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function GetQcFilesUserAction(payload) {
  return {
    type: API_CONSTANTS.GET_QC_FILES_TO_USER,
    payload,
    URL: payload.URL,
    message: "Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function userQCPaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_QC_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function QCPolygonCountUpdatePaginationAction(payload) {
  return {
    type: API_CONSTANTS.QC_POLYGON_COUNT_UPDATE,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function uploadQCFilesAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_QC_FILES_USER,
    payload: payload.data,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadGovQCFilesAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_GOV_QC_FILES_USER,
    payload: payload.data,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function GetGovPDFFilesUserAction(payload) {
  return {
    type: API_CONSTANTS.GET_GOV_PDF_FILES_TO_USER,
    payload,
    URL: payload.URL,
    message: "Gov PDF Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function GetPDFFilesUserAction(payload) {
  return {
    type: API_CONSTANTS.GET_PDF_FILES_TO_USER,
    payload,
    URL: payload.URL,
    message: "PDF Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function userPDFPaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_PDF_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function GetGovQCFilesUserAction(payload) {
  return {
    type: API_CONSTANTS.GET_GOV_QC_FILES_TO_USER,
    payload,
    URL: payload.URL,
    message: "Gov QC Files Submitted Successfully.",
    contentType: contentType.jsonContentTpye,
  };
}

function userGovQCPaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_GOV_QC_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userGovPDFPaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_GOV_PDF_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function uploadGovPDFFilesAction(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_GOV_PDF_FILES_USER,
    payload: payload.data,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadQCFilesActionPdf(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_QC_FILES_USER_PDF,
    payload: payload.data,
    URL: payload.URL,
    contentType: contentType.formDataType,
  };
}

function uploadQCDocumentsPutActionRejected(payload) {
  return {
    type: API_CONSTANTS.UPLOAD_QC_FILES_REJECTED,
    payload: payload.remarksList,
    URL: payload.URL,
    message: "Successfully Updated!",
    contentType: contentType.jsonContentTpye,
  };
}

function updatePolygonCountAction(payload) {
  return {
    type: API_CONSTANTS.UPDATE_POLYGON_COUNT,
    payload: payload.payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function addAgencyUserAction(payload) {
  return {
    type: API_CONSTANTS.ADD_AGENCY_USER,
    payload,
    URL: URLS.ADD_AGENCY_USER_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getAllDocumentListSuperAdmin(payload) {
  return {
    type: API_CONSTANTS.GET_ALL_DOCUMENT_LIST_SUPER_AND_ADMIN,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

// pagination action
function allDocumentPaginationSuperAdminAction(payload) {
  return {
    type: API_CONSTANTS.ALL_DOCUMENT_PAGINATION_ACTION_SUPER_ADMIN,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getDashboardDetailsAction(payload) {
  return {
    type: API_CONSTANTS.GET_DASHBOARD_DETAILS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getDepartmentList(payload) {
  return {
    type: API_CONSTANTS.GET_DEPARTMENT_LIST,
    URL: URLS.GET_DEPARTMENT_LIST_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setUploadingFlase() {
  return {
    type: API_CONSTANTS.SET_UPLOADING_FALSE,
  };
}

function getAgencyListing(payload) {
  return {
    type: API_CONSTANTS.GET_AGENCY_LISTING,
    payload,
    URL: URLS.AGENCY_LISTING_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getAgencyListingUpdate(payload) {
  return {
    type: API_CONSTANTS.GET_AGENCY_LISTING,
    payload,
    URL: URLS.UPDATED_AGENCY_LITS_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userWiseDcocumentList(payload) {
  return {
    type: API_CONSTANTS.USER_WISE_DOCUMENT_COUNT,
    payload,
    URL: URLS.AGENCY_USERS_LIST_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createAgencyUser(payload) {
  return {
    type: API_CONSTANTS.CREATE_AGENCY,
    payload,
    URL: URLS.CREATE_AGENCY_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getNotFoundFilesSuperAdmin(payload) {
  return {
    type: API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

// pagination action
function NotFoundDocumentPaginationSuperAdminAction(payload) {
  return {
    type: API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_PAGINATION_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createAgency(payload) {
  return {
    type: API_CONSTANTS.CREATE_AGENCY_AND_ADMIN,
    payload,
    URL: URLS.CREATE_AGENCY_AND_ADMIN_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getDistrictwiseDocumentList(payload) {
  return {
    type: API_CONSTANTS.GET_DISTRICT_WISE_DOCUMENT_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function downloadExcelFile(payload) {
  return {
    type: API_CONSTANTS.DOWNLOAD_EXCEL_FILE,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createDistrict(payload) {
  return {
    type: API_CONSTANTS.CREATE_DISTRICT_FORM,
    payload,
    URL: URLS.CREATE_DISTRICT_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createVillage(payload) {
  return {
    type: API_CONSTANTS.CREATE_VILLAGE_FORM,
    payload,
    URL: URLS.CREATE_VILLAGE_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function createTaluka(payload) {
  return {
    type: API_CONSTANTS.CREATE_TALUKA_FORM,
    payload,
    URL: URLS.CREATE_TALUKA_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getDistrictList(payload) {
  return {
    type: API_CONSTANTS.GET_DISTRICT_LIST,
    payload,
    URL: URLS.GET_DISTRICT_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getTalukaListAction(payload) {
  return {
    type: API_CONSTANTS.GET_TALUKA_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setLoadingTrue() {
  return {
    type: API_CONSTANTS.SET_LOADING_TRUE,
  };
}

function setLoadingFalse() {
  return {
    type: API_CONSTANTS.SET_LOADING_FALSE,
  };
}

function getMapTypeDocumentList(payload) {
  return {
    type: API_CONSTANTS.MAP_TYPE_DOCUMET_LIST_COUNT,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function filterMapTypeByVillage(payload) {
  return {
    type: API_CONSTANTS.FILETER_MAP_TYPE_BY_VILLAGE,
    payload,
    URL: URLS.FILETER_MAP_TYPE_BY_VILLAGE_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function userDetailspaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_LIST_PAGEINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getVillageAction(payload) {
  return {
    type: API_CONSTANTS.GET_VILLAGE_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setVillageListFalse() {
  return {
    type: API_CONSTANTS.SET_VILLAGE_LIST_MAP_FLASSE,
  };
}

function setTalukaListFalse() {
  return {
    type: API_CONSTANTS.SET_TALUKA_LIST_MAP_TYPE_FALSE,
  };
}

function getTalukaListMapTypeAction(payload) {
  return {
    type: API_CONSTANTS.GET_TALUKS_LIST_MAP_TYPE,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setTalukaListMapTypeFalse() {
  return {
    type: API_CONSTANTS.SET_TALUKA_LIST_MAP_TPYE_FALSE,
  };
}

function setVillageListMapTypeFalse() {
  return {
    type: API_CONSTANTS.SET_DISTRICT_MAP_TYPE_TO_FALSE,
  };
}

function getTalukaMapTypeList(payload) {
  return {
    type: API_CONSTANTS.GET_TALUKA_MAP_TYPE_LIST_RECORDS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getVillageMapTypeList(payload) {
  return {
    type: API_CONSTANTS.GET_VILLAGE_MAP_TYPE_LIST_RECORDS,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getVillageTypeList(payload) {
  return {
    type: API_CONSTANTS.GET_VILLAGE_WISE_MAP_TYPE_COUNT,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function reUploadScannedFilesPostAction(payload) {
  return {
    type: API_CONSTANTS.RE_UPLOAD_SCANNED_FILES,
    payload,
    URL: URLS.RE_UPLOAD_SCANNED_FILES_ULR,
    contentType: contentType.formDataType,
  };
}

function userWiseDocumentCountAction(payload) {
  return {
    type: API_CONSTANTS.USER_WISE_DOCUMENT_COUNT_COUNT,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function updateUserDetalsAction(payload) {
  return {
    type: API_CONSTANTS.UPDATE_AGENCY_USER,
    URL: payload.URL,
    payload: payload.val,
    contentType: contentType.jsonContentTpye,
  };
}

function userDocumentCountpaginationAction(payload) {
  return {
    type: API_CONSTANTS.USER_DETAILS_DOCUMENT_COUNT_PAGINATION,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function changePaginationSize(payload) {
  return {
    type: API_CONSTANTS.CHANGE_PAGE_SIZE_ACTION,
    payload: payload.payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function agencyWiseDocumetCountAction(payload, query = "") {
  return {
    type: API_CONSTANTS.AGENCY_WISE_DOCUMENT_COUNT,
    payload,
    URL: URLS.AGENCY_WISE_DOCUMENT_COUNT_URL + query,
    contentType: contentType.jsonContentTpye,
  };
}

function getDepartmentListAction(payload) {
  return {
    type: API_CONSTANTS.GET_DEPARTMENT_LIST,
    payload,
    URL: URLS.DEPEARTMENT_LIST_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function selectedDepartmentListExchange(payload) {
  return {
    type: API_CONSTANTS.GET_FILE_EXCHANGE_USER_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setDigitizeFileUploadFalse(payload) {
  return {
    type: API_CONSTANTS.SET_UPLOAD_DIGITIZED_FILES_BY_USER_FALSE,
  };
}

function setShapeFileUploadFalse(payload) {
  return {
    type: API_CONSTANTS.SET_UPLOAD_SHAPE_FILES_BY_USER_FALSE,
  };
}

function setTopologyFileUploadFalse(payload) {
  return {
    type: API_CONSTANTS.SET_UPLOAD_TOPOLOGY_FILES_BY_USER_FALSE,
  };
}

function selectedAgencyAllocatedListExchange(payload) {
  return {
    type: API_CONSTANTS.GET_AGENCY_ALLOCATED_EXCHANGE_LIST,
    payload,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setUserListEmpty() {
  return {
    type: API_CONSTANTS.SET_USER_LIST_EMPTY,
  };
}

function getSelectedUserFilesAction(payload) {
  return {
    type: API_CONSTANTS.GET_SELECTED_USER_FILES,
    payload,
    URL:
      URLS.USER_FILE_EXCHNAGE_URL + payload.username + payload.current_status,
    contentType: contentType.jsonContentTpye,
  };
}

function setUserAllocationFeildFalse() {
  return {
    type: API_CONSTANTS.SET_USER_ALLOCATION_FEILD_FALSE,
  };
}

function getCommonTalukaListAction(payload) {
  return {
    type: API_CONSTANTS.GET_COMMON_TALUKA_DETAILS,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getCommonDistrictListAction(payload) {
  return {
    type: API_CONSTANTS.GET_COMMON_TALUKA_DETAILS,
    URL: payload.URL,
    contentType: contentType.jsonContentTpye,
  };
}

function postPrescanDocumentAction(payload) {
  return {
    type: API_CONSTANTS.POST_PRESCAN_DOCUMENT,
    URL: URLS.POST_PRESCAN_document_URL,
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setPostPrescanDocumentFalseAction(payload) {
  return {
    type: API_CONSTANTS.SET_POST_PRESCAN_DOCUMENT_SUCCESS,
  };
}

function getPostPreScanListAction() {
  return {
    type: API_CONSTANTS.GET_POST_PRESCAN_DOCUMENT_LIST,
    URL: URLS.PRE_SCAN_DOCUMENT_LIST,
    contentType: contentType.jsonContentTpye,
  };
}
function getDistTalPreScanListAction(payload) {
  let searchParams = payload?.searchingParameters
    ? payload?.searchingParameters
    : "";
  let page = payload.page ? "page=" + payload?.page : "";
  searchParams += page;
  return {
    type: API_CONSTANTS.DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST,
    URL:
      URLS.DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST_URL +
      payload.district_code +
      "/?" +
      searchParams,

    contentType: contentType.jsonContentTpye,
  };
}

function uploadBelExcelFile(payload) {
  return {
    type: API_CONSTANTS.POST_BELL_EXCEL_FILE,
    payload: payload.file,
    URL: URLS.POST_BEL_EXCEL_FILE + payload.statusAction + "/",
    contentType: contentType.formDataType,
  };
}

function setBelUploadFalse() {
  return {
    type: API_CONSTANTS.POST_BELL_EXCEL_FILE_FALSE,
  };
}

function mapTypeListAction() {
  return {
    type: API_CONSTANTS.GET_MAP_TYPE_LIST,
    URL: URLS.MAP_TYPE_LIST_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getBarcodeFromImage(payload) {
  return {
    type: API_CONSTANTS.GET_BARCODE_FROM_IMAGE,
    URL: URLS.CHECK_BARCODE_NUMBER_URL + payload.id + "/",
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function updateBarcodeAction(payload) {
  return {
    type: API_CONSTANTS.UPDATE_BARCODE_NUMBER,
    URL: URLS.UPDATE_BARCODE_NUMBER_URL,
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setBarcodeResultFalse() {
  return {
    type: API_CONSTANTS.SET_BARCODE_UPDATE_RESULT_FALSE,
  };
}

function createTalukaAdminAction(payload) {
  return {
    type: API_CONSTANTS.CREATE_TALUKA_ADMIN,
    URL: URLS.CREATE_TALUKA_ADMIN_URL,
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setTalukaCreateAdminFalse() {
  return {
    type: API_CONSTANTS.SET_CREATE_TALUKA_ADMIN_RESULT_FALSE,
  };
}

function createDistrictAdminAction(payload) {
  return {
    type: API_CONSTANTS.CREATE_DISTRICT_ADMIN,
    URL: URLS.CREATE_DISTRICT_ADMIN_URL,
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setCreateDistrictAdminFalse() {
  return {
    type: API_CONSTANTS.SET_CREATE_DISTRICT_ADMIN_FALSE,
  };
}

function createDraftReportAction(payload) {
  return {
    type: API_CONSTANTS.CREATE_PRE_DRAFT_REPORT,
    URL: URLS.CREATE_PRE_DRAFT_REPORT_URL,
    payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setCreateDraftReportFalseAction() {
  return {
    type: API_CONSTANTS.SET_CREATE_PRE_DRAFT_REPORT_FALSE,
  };
}

function preDraftDocumentListAction() {
  return {
    type: API_CONSTANTS.PRE_DRAFT_DOCUMENT_LIST,
    URL: URLS.PRE_DRAFT_DOCUMENT_LIST_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function getPreDraftDistrictListAction(payload) {
  let searchParams = payload?.searchingParameters
    ? payload?.searchingParameters
    : "";
  let page = payload.page ? "page=" + payload?.page : "";
  searchParams += page;
  return {
    type: API_CONSTANTS.PRE_DRAFT_SUB_DOCUMENT_LIST,
    URL:
      URLS.GET_PRE_DRAFT_DISTRICT_DOCUMENT_LIST +
      payload.district_code +
      "?" +
      searchParams,
    contentType: contentType.jsonContentTpye,
  };
}

function setPaginationCountChangeFalse() {
  return {
    type: API_CONSTANTS.SET_PAGINATION_COUNT_CHANGE_FALSE,
  };
}

function getTodaysMapTypeReportAction() {
  return {
    type: API_CONSTANTS.GET_TODAYS_MAP_TYPE_REPORT,
    URL: URLS.GET_TODAYS_MAP_TYPE_REPORT_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setPdfFileUploadingFalse() {
  return {
    type: API_CONSTANTS.SET_PDF_FILE_UPLOADED_FALSE,
  };
}

function setQcFileUploadFalse() {
  return {
    type: API_CONSTANTS.SET_QC_FILE_UPLOAD_FALSE,
  };
}

function setGovQCFileUploadingFalse() {
  return {
    type: API_CONSTANTS.SET_GOV_QC_FILE_UPLOADED_FALSE,
  };
}

function setGovPDFFileUploadingFalse() {
  return {
    type: API_CONSTANTS.SET_GOV_PDF_FILE_UPLOADED_FALSE,
  };
}

function getPreScanDocumentListRowSpan(url) {
  return {
    type: API_CONSTANTS.GET_PRE_SCAN_DOCUMENT_LIST_ROW_SPAN,
    URL: URLS.GET_TODAY_PRESCAN_DOCUMENT_LIST_URL + url,
    contentType: contentType.jsonContentTpye,
  };
}

function getPreDraftDocumentListRowSpan(url) {
  return {
    type: API_CONSTANTS.GET_PRE_DRAFT_DOCUMENT_LIST_ROW_SPAN,
    URL: URLS.GET_TODAY_PREDRAFT_DOCUMENT_LIST_URL + url,
    contentType: contentType.jsonContentTpye,
  };
}

function getUpdatePolygonQcCount(v) {
  let barcode_number;

  if (v) {
    barcode_number = v?.search_params;
  }

  return {
    type: API_CONSTANTS.UPDATE_POLYGON_QC_COUNT_RAW,
    URL: barcode_number
      ? URLS.UPDATE_QC_POLYGON_COUNT_URL + barcode_number
      : URLS.UPDATE_QC_POLYGON_COUNT_URL,
    contentType: contentType.jsonContentTpye,
  };
}

function setPolygonCountFalse() {
  return {
    type: API_CONSTANTS.SET_UPDATE_POLYGON_COUNT_FALSE,
  };
}

function retrieveFilesFromAgency(page, searchParams) {
  let url = URLS.RETRIEVE_FILE_FROM_AGENCY_URL;
  if (page) {
    url = url + "page=" + page;
  }

  if (searchParams) {
    url = url + searchParams;
  }
  return {
    type: API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY,
    URL: url,
    contentType: contentType.jsonContentTpye,
  };
}

function retrieveFilesFromAgencyFalse() {
  return {
    type: API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY_FALSE,
  };
}

function getFilesFromAgency(payload) {
  return {
    type: API_CONSTANTS.GET_FILES_FROM_AGENCY,
    URL: URLS.GET_FILE_FROM_AGENCY_URL + payload.action + "/",
    payload: payload.payload,
    contentType: contentType.jsonContentTpye,
  };
}

function setGetFilesFromAgencyFalse() {
  return {
    type: API_CONSTANTS.SET_GET_FILE_FROM_AGENCY_FALSE,
  };
}

function deactivateUserAction(payload) {
  return {
    type: API_CONSTANTS.DEACTIVATE_USER,
    URL: payload.url,
    payload: payload.payload,
    contentType: contentType.jsonContentTpye,
  };
}

export {
  QCPolygonCountUpdatePaginationAction,
  deactivateUserAction,
  setGetFilesFromAgencyFalse,
  getFilesFromAgency,
  retrieveFilesFromAgencyFalse,
  retrieveFilesFromAgency,
  setPolygonCountFalse,
  getUpdatePolygonQcCount,
  getPreDraftDocumentListRowSpan,
  getPreScanDocumentListRowSpan,
  setQcFileUploadFalse,
  setPdfFileUploadingFalse,
  setGovQCFileUploadingFalse,
  getTodaysMapTypeReportAction,
  setPaginationCountChangeFalse,
  getPreDraftDistrictListAction,
  preDraftDocumentListAction,
  setCreateDraftReportFalseAction,
  createDraftReportAction,
  setCreateDistrictAdminFalse,
  createDistrictAdminAction,
  setTalukaCreateAdminFalse,
  createTalukaAdminAction,
  setBarcodeResultFalse,
  updateBarcodeAction,
  getBarcodeFromImage,
  setBelUploadFalse,
  mapTypeListAction,
  userLogin,
  createUserPostAction,
  uploadScannedFilesPostAction,
  allocateToRectifySuper,
  uploadRectifyDocumentsPutAction,
  uploadDigitizedDocumentsPutAction,
  uploadShapeDocumentsPutAction,
  uploadTopologyDocumentsPutAction,
  uploadQcDocumentsPutAction,
  paginationAction,
  allocateToRectifyPut,
  agencyListingAction,
  userListAction,
  userProfileAction,
  allocateToRectifyAgency,
  agencyUserListAction,
  userRectifAction,
  allocateFilesToUserAction,
  uploadRectifyDocumentsPutActionRejected,
  allocateToDigitizeySuper,
  allocateToShapeSuper,
  digitizePaginationAction,
  shapePaginationAction,
  GovtQCPdfPaginationCompleteDocList,
  digitizeSubmitToAgency,
  shapeSubmitToAgency,
  topologySubmitToAgency,
  allocateToUserDigitizeAction,
  allocateToUserShapeAction,
  allocateToUserTopologyAction,
  allocateDigitizedFilesToUserAction,
  allocateShapeFilesToUserAction,
  allocateTopologyFilesToUserAction,
  DigitizePaginationAgencyAction,
  ShapePaginationAgencyAction,
  TopologyPaginationAgencyAction,
  digitizeResultsActionUser,
  shapeResultsActionUser,
  topologyResultsActionUser,
  userDigitizePaginationAction,
  userShapePaginationAction,
  userTopologyPaginationAction,
  uploadDigitizedFileByUser,
  uploadShapeFileByUser,
  uploadTopologyFileByUser,
  uploadDigitizeDocumentsPutActionRejected,
  uploadShapeDocumentsPutActionRejected,
  uploadTopologyDocumentsPutActionRejected,
  GetQcFileSuperAdminAction,
  QcDetailsPagination,
  allocateToQCAdmin,
  AssignQcFilesToUser,
  QCPaginationAgencyAction,
  AssignGovtQcFilesToDistrictAdmin,
  GovtQCPaginationDistrictAdminAction,
  allocateDigitizedFilesToUser,
  allocatePdfFilesToDistAdmin,
  GetQcFilesUserAction,
  userQCPaginationAction,
  uploadQCFilesAction,
  GetPDFFilesUserAction,
  userPDFPaginationAction,
  GetGovQCFilesUserAction,
  userGovQCPaginationAction,
  uploadQCDocumentsPutActionRejected,
  updatePolygonCountAction,
  addAgencyUserAction,
  getAllDocumentListSuperAdmin,
  allDocumentPaginationSuperAdminAction,
  getDashboardDetailsAction,
  getDepartmentList,
  agencyDigitizeUseList,
  agencyShapeUseList,
  agencyTopologyUserList,
  agencyQCUseList,
  districtUserList,
  allocateTopologySuper,
  setUploadingFlase,
  getAgencyListing,
  userWiseDcocumentList,
  getAgencyListingUpdate,
  createAgencyUser,
  getNotFoundFilesSuperAdmin,
  NotFoundDocumentPaginationSuperAdminAction,
  createAgency,
  getDistrictwiseDocumentList,
  downloadExcelFile,
  createDistrict,
  createVillage,
  createTaluka,
  getDistrictList,
  getTalukaListAction,
  setLoadingTrue,
  setLoadingFalse,
  getMapTypeDocumentList,
  filterMapTypeByVillage,
  userDetailspaginationAction,
  getVillageAction,
  setVillageListFalse,
  setTalukaListFalse,
  getTalukaListMapTypeAction,
  setTalukaListMapTypeFalse,
  getTalukaMapTypeList,
  getVillageMapTypeList,
  getVillageTypeList,
  reUploadScannedFilesPostAction,
  userWiseDocumentCountAction,
  setVillageListMapTypeFalse,
  updateUserDetalsAction,
  userDocumentCountpaginationAction,
  changePaginationSize,
  agencyWiseDocumetCountAction,
  getDepartmentListAction,
  selectedDepartmentListExchange,
  selectedAgencyAllocatedListExchange,
  setUserListEmpty,
  getSelectedUserFilesAction,
  setUserAllocationFeildFalse,
  getCommonTalukaListAction,
  getCommonDistrictListAction,
  postPrescanDocumentAction,
  setPostPrescanDocumentFalseAction,
  getPostPreScanListAction,
  getDistTalPreScanListAction,
  uploadBelExcelFile,
  uploadQCFilesActionPdf,
  uploadGovQCFilesAction,
  uploadGovQcDocumentsPutAction,
  GetGovPDFFilesUserAction,
  userGovPDFPaginationAction,
  uploadGovPDFFilesAction,
  setGovPDFFileUploadingFalse,
  setDigitizeFileUploadFalse,
  setShapeFileUploadFalse,
  setTopologyFileUploadFalse,
  setAllocateToRectifyAgencyFalse,
};
