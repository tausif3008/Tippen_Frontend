export const URLS = {
  // BASE_URL: "http://192.168.1.141:8002/api/",
  // BASE_URL_EXCEL: "http://192.168.1.141:8002/",

  // BASE_URL: "http://filemanagement.metaxpay.in:8001/api/",
  // BASE_URL_EXCEL: "http://filemanagement.metaxpay.in:8001",

  // BASE_URL: "http://103.86.182.150:8001/api/",
  // BASE_URL_EXCEL: "http://103.86.182.150:8001",

  BASE_URL: "http://192.168.2.50:8001/api/",
  BASE_URL_EXCEL: "http://192.168.2.50:8001",

  USER_LOGOUT: "version_0/users/logout/",
  USER_LOGIN_URL: "version_0/users/admin-login/",
  USER_PROFILE_URL: "version_0/users/user_profile_details/",
  ADD_USER_URL: "version_0/api/create-subuser/",
  // UPLOAD_SCANNED_FILES_ULR: "version_0/document/scan-upload-bulk/",
   UPLOAD_SCANNED_FILES_ULR: "version_0/document/tippen-scan-upload-bulk/",
  GET_AlLLOCATE_TO_RECTIFY_URL: "version_0/document/scan-document-list/?",
  GET_ALLOCATE_TO_DIGITISE_URL: "version_0/document/rectify-document-list/?",
  GET_ALLOCATE_TO_SHAPE_URL:
    "version_0/document/topology-complete-document-list/?",

  GET_ALLOCATE_TO_SHAPE_FILE_URL:
    "version_0/document/govt-qc-pdf-complete-document-list/?",
  UPLOAD_RECTIFY_FILES_URL: "version_0/document/rectify-bulk/",
  UPLOAD_DIGITIZED_FILES_URL: "version_0/document/digitize-upload-bulk/",
  UPLOAD_SHAPE_FILES_URL: "version_0/document/shape-upload-bulk/",

  UPLOAD_TOPOLOGY_FILES_URL: "version_0/document/topo-dwg-upload-bulk/",
  ASSIGN_RECTIFY_FILES_URL: "version_0/document/scan-assignto-agency-bulk/",
  GET_AGENCIES_LIST_URL: "version_0/document/agency-list/",
  ASSIGN_RECTIFY_FILES_TO_DIGITIZE: "version_0/document/digitize-upload-bulk/",
  AGENCY_WISE_USER_LIST: "version_0/document/agency-wise-user-list/",
  ALLCOATE_SCAN_UPLOAD_FILE_TO_USER:
    "version_0/document/scan-assignto-agencyuser-bulk/",
  UPLOAD_REACTIFY_BULK_USER: "version_0/document/rectify-bulk/",
  ALLOCATE_TO_AGENCY_DIGITIZE:
    "version_0/document/rectify-assignto-agency-bulk/",
  ALLOCATE_TO_AGENCY_TOPOLOGY:
    "version_0/document/topology-assignto-agency-bulk/",
  ALLOCATE_TO_AGENCY_TO_USER:
    "version_0/document/rectify-assignto-agencyuser-bulk/",
  ALLOCATE_TO_SHAPE_AGENCY_TO_USER:
    "version_0/document/shape-assignto-agencyuser-bulk/",
  ALLOCATE_TOPOLOGY_AGENCY_TO_USER:
    "version_0/document/topology-assignto-agencyuser-bulk/",
  ALLOCATE_TO_AGENCY_SHAPE: "version_0/document/shape-assignto-agency-bulk/",
  GET_QC_DETAILS_URL: "version_0/document/digitize-document-list/?",
  GET_PDF_PENDING_URL: "version_0/document/qc-document-list/?",
  GET_GOVT_QC_PENDING_URL: "version_0/document/govt-pending-document-list/?",
  GET_GOVT_PDF_PENDING_URL:
    "version_0/document/govt-pdf-pending-document-list/?",
  ASSIGN_QC_FILES_TO_USER: "version_0/document/digitize-assignto-agency-bulk/",
  ALLOCATE_QC_FILES_ADMIN_TO_USER:
    "version_0/document/digitize-assignto-agencyuser-bulk/",
  ALLOCATE_GOVT_QC_FILES_TO_DIST_ADMIN:
    "version_0/document/govt-qc-assign-districtadmin/",
  UPLOAD_QC_FILES_URL: "version_0/document/qc-upload-bulk/",
  UPLOAD_PDF_FILE_URL: "version_0/document/pdf-upload-bulk/",
  UPLOAD_GOV_QC_FILES_URL: "version_0/document/govt-qc-upload-bulk/",
  UPLOAD_GOV_PDF_FILE_URL: "version_0/document/govt-pdf-upload-bulk/",
  UPDATE_POLYGON_COUNT_URL: "version_0/document/document-update-remark/",
  ADD_AGENCY_USER_URL: "version_0/authentication/register_agency_user/",
  GET_ALL_DOCUMENT_LIST_SUPER_ADMIN: "version_0/document/all-document-list/?",
  GET_DASHBOARD_COUNT_URL: "version_0/dashboard/dashboard-count/",
  CREATE_AGENCY: "version_0/agency/create-agency/",
  GET_DEPARTMENT_LIST_URL: "version_0/agency/department-list/",
  DEPARTMENT_WISE_USER_LIST_URL: "version_0/agency/department-user/",
  GET_DISTRICT_ADMIN_USER_LIST_URL:
    "version_0/document/districtadmin-wise-user-list/",
  GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_URL:
    "version_0/document/govt-qc-pdf-complete-document-list/?",
  AGENCY_LISTING_URL: "version_0/document/agency-list/",
  UPDATED_AGENCY_LITS_URL: "version_0/document/update-agency-list/",
  AGENCY_USERS_LIST_URL: "version_0/document/agency-wise-user-list/?",
  CREATE_AGENCY_URL: "version_0/agency/create-agency/",
  GET_NOT_FOUND_DOCUMENT_LIST_API:
    "version_0/document/notfound-scan-document-list/?",
  CREATE_AGENCY_AND_ADMIN_URL: "version_0/authentication/register/",
  GET_DISTRICT_WISE_DOCUMENT_LIST: "version_0/dashboard/district-wise-count/",
  CREATE_DISTRICT_URL: "version_0/location/create-district/",
  CREATE_VILLAGE_URL: "version_0/location/create-village/",
  GET_DISTRICT_URL: "version_0/location/district-list/",
  CREATE_TALUKA_URL: "version_0/location/create-taluka/",
  GET_TALUKA_LIST_URL: "version_0/location/get-taluka/",
  GET_COMPLETED_FILES_ACCORDING_TO_MAP_TYPE_URL:
    "version_0/dashboard/maptype-wise-count/?",
  GET_VILLAGE_LIST_URL: "version_0/location/get-village/",
  GET_TALUKA_WISE_COMPLETED_FILES: "version_0/dashboard/taluka-wise-count/",
  GET_VILLAGE_WISE_COMPLETED_FILES: "version_0/dashboard/village-wise-count/",
  GET_VILLAGE_WISE_MAP_TYPE_COUNT: "version_0/dashboard/village-wise-maptype/",
  RE_UPLOAD_SCANNED_FILES_ULR: "version_0/document/re-scan-upload-bulk/",
  USER_WISE_DOCUMENT_COUNT_URL: "version_0/dashboard/user-wise-count/?",
  UPDATE_AGENCY_USER_URL: "version_0/authentication/update-user/",
  CHANGE_PAGINATION_SIZE_URL: "version_0/dashboard/user-pagination-update/",
  AGENCY_WISE_DOCUMENT_COUNT_URL: "version_0/dashboard/agency-wise-count/",
  CORRECT_NOT_FOUNT_SCAN_FILE_URL:
    "version_1/document/correct-notfound-scan-file/",
  DOWNLOAD_DIGITISE_DOCUMENT_URL: "version_0/document/digitize-download",
  DOWNLOAD_RECTIFY_DOCUMENT_URL: "version_0/document/qc-user-rectify-download",
  DOWNLOAD_DOCUMENT_SCAN_URL: "version_0/document/scan-download",
  DOWNLOAD_DOCUMENT_RECTIFY_URL: "version_0/document/rectify-download",
  DOWNLOAD_TOPOLOGY_DOCUMENT_RECTIFY_URL:
    "version_0/document/topology_rectify_download_file",
  DOWNLOAD_DOCUMENT_TOPOLOGY_URL:
    "version_0/document/gov-pdf-completed-download",
  DOWNLOAD_DOCUMENT_SHAPE_URL: "version_0/document/toplogy-download",
  DOWNLOAD_QC_DOCUMENT_URL: "version_0/document/qc-download",
  DEPEARTMENT_LIST_URL: "version_0/agency/department-list/",
  USER_FILE_EXCHNAGE_URL: "version_0/document/re-assign-document-list/?",
  GET_AGENCY_WISE_ALLOCATED_LIST_URL:
    "version_0/document/backto-scanupload-document-list/?",
  DOWNLOAD_ZIP_SCAN_URL: "version_0/document/rectify-download/scan/?",
  DOWNLOAD_ZIP_RECTIFY_URL: "version_0/document/rectify-download/rectify/?",
  DOWNLOAD_ZIP_DIGITIZE_URL: "version_0/document/rectify-download/digitize/?",
  DOWNLOAD_ZIP_NOT_FOUND_URL: "version_0/document/rectify-download/not-found/?",
  DOWNLOAD_ZIP_QC_URL: "version_0/document/rectify-download/qc/?",
  DOWNLOAD_ZIP_PDF_URL: "version_0/document/rectify-download/pdf/?",
  DOWNLOAD_ZIP_GOV_QC_DWG_URL: "version_0/document/rectify-download/gov_qc/?",
  DOWNLOAD_ZIP_GOV_QC_PDF_URL: "version_0/document/rectify-download/gov_pdf/?",
  DOWNLOAD_ZIP_TOPOLOGY_URL: "version_0/document/rectify-download/topology/?",
  DOWNLOAD_ZIP_SHAPE_URL: "version_0/document/rectify-download/shape/?",
  POST_PRESCAN_document_URL: "version_0/location/create-prescan-document/",
  PRE_SCAN_DOCUMENT_LIST: "version_0/location/districtwise-prescan/",
  DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST_URL:
    "version_0/location/prescan-list/",
  POST_BEL_EXCEL_FILE: "version_0/document/bel-scan-uploaded/",
  MAP_TYPE_LIST_URL: "version_0/location/maptype-list/",
  CHECK_BARCODE_NUMBER_URL: "version_0/document/document-barcode/",
  UPDATE_BARCODE_NUMBER_URL: "version_0/document/correct-notfound-scan-file/",
  CREATE_TALUKA_ADMIN_URL: "version_0/authentication/register_taluka_admin/",
  CREATE_DISTRICT_ADMIN_URL:
    "version_0/authentication/register_district_admin/",
  CREATE_PRE_DRAFT_REPORT_URL: "version_0/location/create-predraft-report/",
  //127.0.0.1:8000/api/version_0/location/create-predraft-report/
  PRE_DRAFT_DOCUMENT_LIST_URL:
    "version_0/location/districtwise-predraft-report/",
  GET_PRE_DRAFT_DISTRICT_DOCUMENT_LIST:
    "version_0/location/predraft-report-list/",
  GET_TODAYS_MAP_TYPE_REPORT_URL:
    "version_0/dashboard/today-maptype-wise-count/",
  GET_TODAY_PRESCAN_DOCUMENT_LIST_URL:
    "version_0/location/prescan-district-taluka-total-today/",

  GET_TODAY_PREDRAFT_DOCUMENT_LIST_URL:
    "/version_0/location/predraft-district-taluka-total-today/",

  UPDATE_QC_POLYGON_COUNT_URL:
    "/version_0/document/missing-polygon-document-list/?",
  RETRIEVE_FILE_FROM_AGENCY_URL:
    "/version_0/document/backto-scanupload-document-list/?",
  GET_FILE_FROM_AGENCY_URL: "/version_0/document/backto-scan-document/",

  REALLCOATE_SCAN_UPLOAD_FILE_TO_USER:
  "version_0/document/scan-reassignto-agencyuser-bulk/",
  REALLOCATE_TO_AGENCY_TO_USER:
  "version_0/document/rectify-reassignto-agencyuser-bulk/",
  REALLOCATE_QC_FILES_ADMIN_TO_USER:
  "version_0/document/digitize-reassignto-agencyuser-bulk/",
};
