import { takeEvery } from "redux-saga/effects";
import {
  AllocateToRectifyGetDetailsGenerator,
  CreateFormsGenerator,
  GetCommonGenerator,
  GetPaginationDetailsGenerator,
  UploadProcessedFilesGenerator,
  UploadScannedFileGenerator,
  UploadScannedFilesGeneratorMain,
  UserLogin,
  addAgencyUser,
  commonGetGenerator,
  putCommonGenerator,
} from "./CommonSagas";
import { API_CONSTANTS } from "../../globals/ApiConstants";

export function* RootSaga() {
  yield takeEvery(API_CONSTANTS.USER_LOGIN, UserLogin);
  yield takeEvery(
    API_CONSTANTS.UPLOAD_SCANNED_FILES,
    UploadScannedFilesGeneratorMain
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_RECTIFY,
    AllocateToRectifyGetDetailsGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_RECTIFY_AGENCY,
    AllocateToRectifyGetDetailsGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_DIGITIZED_FILES,
    UploadProcessedFilesGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_SHAPE_FILES,
    UploadProcessedFilesGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_TOPOLOGY_FILES,
    UploadProcessedFilesGenerator
  );
  yield takeEvery(API_CONSTANTS.UPLOAD_QC_FILES, UploadProcessedFilesGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_PAGINATION_DETAILS,
    GetPaginationDetailsGenerator
  );
  yield takeEvery(API_CONSTANTS.ALLOCATE_TO_RECTIFY_PUT, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.ALL_USERS_LIST, commonGetGenerator);
  yield takeEvery(API_CONSTANTS.AGENCY_LISTING, commonGetGenerator);
  yield takeEvery(API_CONSTANTS.AGENCY_USER_LIST, commonGetGenerator);
  yield takeEvery(API_CONSTANTS.ALLOCATE_TO_USER, putCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.UPLOAD_RECTIFY_FILES,
    UploadScannedFileGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_RECTIFY_FILES_REJECTED,
    putCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_DIGITIZE,
    AllocateToRectifyGetDetailsGenerator
  );

  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_SHAPE,
    AllocateToRectifyGetDetailsGenerator
  );

  yield takeEvery(
    API_CONSTANTS.GET_DIGITIZE_PAGINATION_DETAILS,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_SHAPE_PAGINATION_DETAILS,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_GOV_QC_PDF_DOC_LIST_PAGINATION_DETAILS,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.SUBMIT_TO_AGENCY, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.SHAPE_SUBMIT_TO_AGENCY, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.TOPOLOGY_SUBMIT_TO_AGENCY, putCommonGenerator);

  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_DIGITIZE_AGENCY,
    AllocateToRectifyGetDetailsGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_SHAPE_AGENCY,
    AllocateToRectifyGetDetailsGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TO_TOPOLOGY_AGENCY,
    AllocateToRectifyGetDetailsGenerator
  );
  yield takeEvery(
    API_CONSTANTS.DIGITIZE_AGENCY_PAGINATION_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.SHAPE_AGENCY_PAGINATION_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.TOPOLOGY_AGENCY_PAGINATION_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_DIGITIZE_FILES_TO_USER,
    putCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_SHAPE_FILES_TO_USER,
    putCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_TOPOLOGY_FILES_TO_USER,
    putCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.DIGITIZATION_PROCESS_USER, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.SHAPE_PROCESS_USER, GetCommonGenerator);

  yield takeEvery(API_CONSTANTS.TOPOLOGY_PROCESS_USER, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.USER_PAGINATION_DIGITIZE_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.USER_PAGINATION_SHAPE_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.USER_PAGINATION_TOPOLOGY_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER,
    UploadScannedFileGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER,
    UploadScannedFileGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER,
    UploadScannedFileGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER_REJECTED,
    putCommonGenerator
  );

  yield takeEvery(
    API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER_REJECTED,
    putCommonGenerator
  );
  
  yield takeEvery(
    API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER_REJECTED,
    putCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_QC_DETAILS, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.QC_DETAILS_PAGINATION, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_QC_FILES_TO_AGENCY,
    putCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_QC_FILE_AGENCY_ADMIN, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.QC_AGENCY_PAGINATION_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_DIGITIZED_FILES_TO_USER,
    putCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_QC_FILES_TO_USER, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.USER_QC_PAGINATION, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.QC_POLYGON_COUNT_UPDATE, GetCommonGenerator);

  yield takeEvery(
    API_CONSTANTS.UPLOAD_QC_FILES_USER,
    UploadScannedFileGenerator
  );
  yield takeEvery(API_CONSTANTS.UPLOAD_QC_FILES_REJECTED, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.UPDATE_POLYGON_COUNT, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.ADD_AGENCY_USER, addAgencyUser);
  yield takeEvery(
    API_CONSTANTS.UPLOAD_GOV_QC_FILES_USER,
    UploadScannedFileGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_ALL_DOCUMENT_LIST_SUPER_AND_ADMIN,
    GetCommonGenerator
  );

  yield takeEvery(
    API_CONSTANTS.ALL_DOCUMENT_PAGINATION_ACTION_SUPER_ADMIN,
    GetPaginationDetailsGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_DASHBOARD_DETAILS, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_DEPARTMENT_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.USER_PROFILE, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.DIGITIZE_AGENCY_USER_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.SHAPE_AGENCY_USER_LIST, GetCommonGenerator);

  yield takeEvery(API_CONSTANTS.TOPOLOGY_AGENCY_USER_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.QC_AGENCY_USER_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_AGENCY_LISTING, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.USER_WISE_DOCUMENT_COUNT, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.AGENCY_USER_DETAILS_COUNT, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_AGENCY, addAgencyUser);
  yield takeEvery(
    API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_LIST,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_PAGINATION_LIST,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.CREATE_AGENCY_AND_ADMIN, CreateFormsGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_DISTRICT_WISE_DOCUMENT_LIST,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.DOWNLOAD_EXCEL_FILE, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_DISTRICT_FORM, CreateFormsGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_TALUKA_FORM, CreateFormsGenerator);
  yield takeEvery(API_CONSTANTS.GET_DISTRICT_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_TALUKA_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_VILLAGE_FORM, CreateFormsGenerator);
  yield takeEvery(
    API_CONSTANTS.MAP_TYPE_DOCUMET_LIST_COUNT,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.USER_LIST_PAGEINATION,
    GetPaginationDetailsGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_VILLAGE_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_TALUKS_LIST_MAP_TYPE, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_TALUKA_MAP_TYPE_LIST_RECORDS,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_VILLAGE_MAP_TYPE_LIST_RECORDS,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_VILLAGE_WISE_MAP_TYPE_COUNT,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.RE_UPLOAD_SCANNED_FILES, putCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.USER_WISE_DOCUMENT_COUNT_COUNT,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.UPDATE_AGENCY_USER, putCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.USER_DETAILS_DOCUMENT_COUNT_PAGINATION,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.CHANGE_PAGE_SIZE_ACTION, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.AGENCY_WISE_DOCUMENT_COUNT, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.CORRECT_NOT_FOUNT_SCAN_FILE,
    putCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_DEPEARTMENT_LIST, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_FILE_EXCHANGE_USER_LIST,
    GetCommonGenerator
  );

  yield takeEvery(API_CONSTANTS.GET_SELECTED_USER_FILES, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_COMMON_TALUKA_DETAILS, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_COMMON_DISTRICT_DETAILS,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.POST_PRESCAN_DOCUMENT, CreateFormsGenerator);
  yield takeEvery(
    API_CONSTANTS.GET_POST_PRESCAN_DOCUMENT_LIST,
    GetCommonGenerator
  );

  yield takeEvery(
    API_CONSTANTS.DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST,
    GetCommonGenerator
  );

  yield takeEvery(API_CONSTANTS.POST_BELL_EXCEL_FILE, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_MAP_TYPE_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_BARCODE_FROM_IMAGE, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.UPDATE_BARCODE_NUMBER, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_TALUKA_ADMIN, CreateFormsGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_DISTRICT_ADMIN, CreateFormsGenerator);
  yield takeEvery(API_CONSTANTS.CREATE_PRE_DRAFT_REPORT, CreateFormsGenerator);
  yield takeEvery(API_CONSTANTS.PRE_DRAFT_DOCUMENT_LIST, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.PRE_DRAFT_SUB_DOCUMENT_LIST,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.GET_TODAYS_MAP_TYPE_REPORT, GetCommonGenerator);

  yield takeEvery(API_CONSTANTS.GET_PDF_FILES_TO_USER, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_GOV_QC_FILES_TO_USER, GetCommonGenerator);

  yield takeEvery(API_CONSTANTS.USER_PDF_PAGINATION, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.USER_GOV_QC_PAGINATION, GetCommonGenerator);

  yield takeEvery(
    API_CONSTANTS.UPLOAD_QC_FILES_USER_PDF,
    UploadScannedFileGenerator
  );

  yield takeEvery(
    API_CONSTANTS.GET_PRE_SCAN_DOCUMENT_LIST_ROW_SPAN,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GET_PRE_DRAFT_DOCUMENT_LIST_ROW_SPAN,
    GetCommonGenerator
  );

  yield takeEvery(
    API_CONSTANTS.GET_GOVT_QC_FILE_DIST_ADMIN,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.GOVT_QC_PAGINATION_DIST_ADMIN_ACTION,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.ALLOCATE_PDF_FILES_TO_DIST_ADMIN,
    putCommonGenerator
  );

  yield takeEvery(API_CONSTANTS.DISTRICT_USER_LIST, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST, GetCommonGenerator);


  yield takeEvery(
    API_CONSTANTS.UPLOAD_QC_FILES_USER_PDF,
    UploadScannedFileGenerator
  );

  yield takeEvery(API_CONSTANTS.GET_GOV_PDF_FILES_TO_USER, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.USER_GOV_PDF_PAGINATION, GetCommonGenerator);
  yield takeEvery(
    API_CONSTANTS.UPLOAD_GOV_PDF_FILES_USER,
    UploadScannedFileGenerator
  );

  yield takeEvery(
    API_CONSTANTS.GET_AGENCY_ALLOCATED_EXCHANGE_LIST,
    GetCommonGenerator
  );
  yield takeEvery(
    API_CONSTANTS.UPDATE_POLYGON_QC_COUNT_RAW,
    GetCommonGenerator
  );
  yield takeEvery(API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY, GetCommonGenerator);
  yield takeEvery(API_CONSTANTS.GET_FILES_FROM_AGENCY, putCommonGenerator);
  yield takeEvery(API_CONSTANTS.DEACTIVATE_USER, putCommonGenerator);
}
