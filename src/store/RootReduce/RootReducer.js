import { API_CONSTANTS } from "../../globals/ApiConstants";

const initialState = {
  loading: false,
  status: "",
  loginData: "",
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_CONSTANTS.USER_LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
      };
    }

    case API_CONSTANTS.USER_LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case API_CONSTANTS.USER_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        userProfileDetails: action.result,
      };
    }

    case API_CONSTANTS.CREATE_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_SCANNED_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_SCANNED_FILES_SUCCESS: {
      return {
        ...state,
        uploading: "completed",
        scanUpload: action.result,
        isFinal: action.isFinal,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.UPLOAD_RECTIFY_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_RECTIFY_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        rectifyFileUplaod: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.UPLOAD_RECTIFY_FILES_REJECTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_RECTIFY_FILES_REJECTED_SUCCESS: {
      return {
        ...state,
        loading: false,
        rectifyFileUplaod: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_QC_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_QC_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_QC_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_QC_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        result: action.result,
        uploading: "completed",
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY_SUCCESS: {
      return {
        ...state,
        loading: false,
        rectifyFiles: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_DIGITIZE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_DIGITIZE_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeFiles: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_SHAPE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_SHAPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeFiles: action.result,
      };
    }

    case API_CONSTANTS.SUBMIT_TO_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SUBMIT_TO_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeMessage: action.result,
      };
    }

    case API_CONSTANTS.SHAPE_SUBMIT_TO_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SHAPE_SUBMIT_TO_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeMessage: action.result,
      };
    }

    case API_CONSTANTS.TOPOLOGY_SUBMIT_TO_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.TOPOLOGY_SUBMIT_TO_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyMessage: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyRectify: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.AGENCY_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        rectifyAgencyUsers: action.result,
      };
    }

    case API_CONSTANTS.DIGITIZE_AGENCY_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DIGITIZE_AGENCY_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeAgencyUsersList: action.result,
      };
    }

    case API_CONSTANTS.SHAPE_AGENCY_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SHAPE_AGENCY_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeAgencyUsersList: action.result,
      };
    }

    case API_CONSTANTS.TOPOLOGY_AGENCY_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.TOPOLOGY_AGENCY_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAgencyUsersList: action.result,
      };
    }

    case API_CONSTANTS.QC_AGENCY_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.QC_AGENCY_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcAgencyUsersList: action.result,
      };
    }

    case API_CONSTANTS.DISTRICT_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DISTRICT_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        districtAdminUsersList: action.result,
      };
    }

    case API_CONSTANTS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_GOVT_QC_PDF_COMPLETE_DOC_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAdminUsersList: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY_PUT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_RECTIFY_PUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        rectifyResponse: action.result,
      };
    }

    case API_CONSTANTS.GET_PAGINATION_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_PAGINATION_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyRectify: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_LISTING: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DIGITIZE_PAGINATION_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DIGITIZE_PAGINATION_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeFiles: action.result,
      };
    }

    case API_CONSTANTS.GET_SHAPE_PAGINATION_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_SHAPE_PAGINATION_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeFiles: action.result,
      };
    }

    case API_CONSTANTS.GET_GOV_QC_PDF_DOC_LIST_PAGINATION_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_GOV_QC_PDF_DOC_LIST_PAGINATION_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAdminUsersList: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_LISTING_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyList: action.result.data,
      };
    }

    case API_CONSTANTS.ALL_USERS_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALL_USERS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        userList: action.result,
      };
    }

    case API_CONSTANTS.GET_USER_RECTIFY_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_USER_RECTIFY_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        userList: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        userAllocation: action.result,
      };
    }

    case API_CONSTANTS.SET_USER_ALLOCATION_FEILD_FALSE: {
      return {
        ...state,
        loading: false,
        userAllocation: false,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_DIGITIZE_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_DIGITIZE_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeAgencyList: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_SHAPE_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_SHAPE_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeAgencyList: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_TOPOLOGY_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TO_TOPOLOGY_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAgencyList: action.result,
      };
    }

    case API_CONSTANTS.DIGITIZE_AGENCY_PAGINATION_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DIGITIZE_AGENCY_PAGINATION_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeAgencyList: action.result,
      };
    }

    case API_CONSTANTS.SHAPE_AGENCY_PAGINATION_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SHAPE_AGENCY_PAGINATION_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeAgencyList: action.result,
      };
    }

    case API_CONSTANTS.TOPOLOGY_AGENCY_PAGINATION_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.TOPOLOGY_AGENCY_PAGINATION_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAgencyList: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_DIGITIZE_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_DIGITIZE_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeAgencToUserMessage: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_SHAPE_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_SHAPE_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
         shapeAgencToUserMessage: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_TOPOLOGY_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_TOPOLOGY_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyAgencToUserMessage: action.result,
      };
    }

    case API_CONSTANTS.DIGITIZATION_PROCESS_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DIGITIZATION_PROCESS_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizationUserFiles: action.result,
      };
    }

    case API_CONSTANTS.SHAPE_PROCESS_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SHAPE_PROCESS_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeUserFiles: action.result,
      };
    }

    case API_CONSTANTS.TOPOLOGY_PROCESS_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.TOPOLOGY_PROCESS_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyUserFiles: action.result,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_DIGITIZE_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_DIGITIZE_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizationUserFiles: action.result,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_SHAPE_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_SHAPE_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeUserFiles: action.result,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_TOPOLOGY_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_PAGINATION_TOPOLOGY_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyUserFiles: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeFileUpoadResult: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeFileUpoadResult: action.result,
      };
    }

    case API_CONSTANTS.SET_UPLOAD_DIGITIZED_FILES_BY_USER_FALSE: {
      return {
        ...state,
        loading: false,
        digitizeFileUpoadResult: false,
      };
    }

    case API_CONSTANTS.SET_UPLOAD_SHAPE_FILES_BY_USER_FALSE: {
      return {
        ...state,
        loading: false,
        shapeFileUpoadResult: false,
      };
    }


    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyFileUpoadResult: action.result,
      };
    }


    case API_CONSTANTS.SET_UPLOAD_TOPOLOGY_FILES_BY_USER_FALSE: {
      return {
        ...state,
        loading: false,
        topologyFileUpoadResult: false,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER_REJECTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_DIGITIZED_FILES_BY_USER_REJECTED_SUCCESS: {
      return {
        ...state,
        loading: false,
        digitizeFileUpoadResult: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER_REJECTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_SHAPE_FILES_BY_USER_REJECTED_SUCCESS: {
      return {
        ...state,
        loading: false,
        shapeFileUpoadResult: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER_REJECTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_TOPOLOGY_FILES_BY_USER_REJECTED_SUCCESS: {
      return {
        ...state,
        loading: false,
        topologyFileUpoadResult: action.result,
      };
    }

    case API_CONSTANTS.GET_QC_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_QC_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcDetailsSuperAdmin: action.result,
      };
    }

    case API_CONSTANTS.QC_DETAILS_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.QC_DETAILS_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcDetailsSuperAdmin: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_QC_FILES_TO_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_QC_FILES_TO_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcfilesToAgencyMessage: action.result,
      };
    }

    case API_CONSTANTS.GET_QC_FILE_AGENCY_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_QC_FILE_AGENCY_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFilesAgencyAdmin: action.result,
      };
    }

    case API_CONSTANTS.QC_AGENCY_PAGINATION_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.QC_AGENCY_PAGINATION_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFilesAgencyAdmin: action.result,
      };
    }

    case API_CONSTANTS.GET_GOVT_QC_FILE_DIST_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_GOVT_QC_FILE_DIST_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        govtQCFilesDistAdmin: action.result,
      };
    }

    case API_CONSTANTS.GOVT_QC_PAGINATION_DIST_ADMIN_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GOVT_QC_PAGINATION_DIST_ADMIN_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        govtQCFilesDistAdmin: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_PDF_FILES_TO_DIST_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_PDF_FILES_TO_DIST_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        allocatePdfFilesDistAdminMessage: action.result,
      };
    }

    case API_CONSTANTS.ALLOCATE_DIGITIZED_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALLOCATE_DIGITIZED_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFilesAgencyAdminMessage: action.result,
      };
    }

    case API_CONSTANTS.GET_QC_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_QC_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFilesUser: action.result,
      };
    }

    case API_CONSTANTS.QC_POLYGON_COUNT_UPDATE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.QC_POLYGON_COUNT_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        updatePolygonCountResult: action.result,
      };
    }

    case API_CONSTANTS.USER_QC_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_QC_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFilesUser: action.result,
      };
    }

    case API_CONSTANTS.GET_PDF_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_PDF_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        pdfFilesUser: action.result,
      };
    }

    case API_CONSTANTS.USER_PDF_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_PDF_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        pdfFilesUser: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_QC_FILES_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_QC_FILES_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFileUploadSuccess: action.result,
        uploading: "completed",
        dwgUploadingCompleted: false,
      };
    }
    case API_CONSTANTS.UPLOAD_QC_FILES_USER_PDF: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_QC_FILES_USER_PDF_SUCCESS: {
      return {
        ...state,
        loading: false,
        qcFileUploadSuccessPDF: action.result,
      };
    }

    case API_CONSTANTS.GET_GOV_QC_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_GOV_QC_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        govQCFilesUserMessage: action.result,
      };
    }

    case API_CONSTANTS.USER_GOV_QC_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_GOV_QC_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        govQCFilesUserMessage: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_QC_FILES_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_QC_FILES_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        govQCFileUploadSuccess: action.result,
        uploading: "completed",
        dwgUploadingCompleted: false,
      };
    }

    case API_CONSTANTS.SET_QC_FILE_UPLOAD_FALSE: {
      return {
        ...state,
        qcFileUploadSuccess: false,
      };
    }

    case API_CONSTANTS.SET_PDF_FILE_UPLOADED_FALSE: {
      return {
        ...state,
        pdfUploadingCompleted: false,
      };
    }
    case API_CONSTANTS.SET_GOV_QC_FILE_UPLOADED_FALSE: {
      return {
        ...state,
        govQCFileUploadSuccess: false,
      };
    }

    case API_CONSTANTS.GET_GOV_PDF_FILES_TO_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_GOV_PDF_FILES_TO_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        govPDFFilesUser: action.result,
      };
    }

    case API_CONSTANTS.USER_GOV_PDF_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_GOV_PDF_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        govPDFFilesUser: action.result,
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_PDF_FILES_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPLOAD_GOV_PDF_FILES_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        govPDFFileUploadSuccess: action.result,
      };
    }

    case API_CONSTANTS.SET_GOV_PDF_FILE_UPLOADED_FALSE: {
      return {
        ...state,
        govPDFUploadingCompleted: true,
      };
    }

    case API_CONSTANTS.UPDATE_POLYGON_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SET_UPDATE_POLYGON_COUNT_FALSE: {
      return {
        ...state,
        polygonCountMessage: false,
      };
    }

    case API_CONSTANTS.UPDATE_POLYGON_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        polygonCountMessage: action.result,
      };
    }

    case API_CONSTANTS.ADD_AGENCY_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ADD_AGENCY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        addAgencyUserResponse: action.result,
      };
    }

    case API_CONSTANTS.GET_ALL_DOCUMENT_LIST_SUPER_AND_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_ALL_DOCUMENT_LIST_SUPER_AND_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        allDocumentListSuperAdmin: action.result,
      };
    }

    case API_CONSTANTS.ALL_DOCUMENT_PAGINATION_ACTION_SUPER_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.ALL_DOCUMENT_PAGINATION_ACTION_SUPER_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        allDocumentListSuperAdmin: action.result,
      };
    }

    case API_CONSTANTS.GET_DASHBOARD_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DASHBOARD_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        dashboardDetails: action.result,
      };
    }

    case API_CONSTANTS.GET_DEPARTMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DEPARTMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        allDepartmentList: action.result,
      };
    }

    case API_CONSTANTS.SET_UPLOADING_FALSE: {
      return {
        ...state,
        uploading: false,
        loading: false,
      };
    }

    case API_CONSTANTS.GET_AGENCY_LISTING: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_AGENCY_LISTING_SUCCESS: {
      return {
        ...state,
        loading: false,
        allAgencyListFormSuperUser: action.result,
      };
    }

    case API_CONSTANTS.USER_WISE_DOCUMENT_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_WISE_DOCUMENT_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyUserDocumentCountList: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_USER_DETAILS_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.AGENCY_USER_DETAILS_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyUserDocumentCompletionDetails: action.result,
      };
    }

    case API_CONSTANTS.CREATE_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        createAgencyResult: action.result,
      };
    }

    case API_CONSTANTS.SET_AGENCY_CREATION_FORM_SUBMISSION_RESULT: {
      return {
        ...state,
        createAgencyResult: false,
      };
    }

    case API_CONSTANTS.SET_USER_CREATION_FORM_SUBMISSION_RESULT: {
      return {
        ...state,
        addAgencyUserResponse: false,
      };
    }

    case API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        notFoundDocumentList: action.result,
      };
    }

    case API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_PAGINATION_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_NOT_FOUND_DOCUMENTS_PAGINATION_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        notFoundDocumentList: action.result,
      };
    }

    case API_CONSTANTS.CREATE_AGENCY_AND_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_AGENCY_AND_ADMIN_SUCCESS: {
      return {
        ...state,
        createAgencyAndAdminResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_AGENCY_AND_ADMIN_FALSE: {
      return {
        ...state,
        createAgencyAndAdminResult: false,
      };
    }

    case API_CONSTANTS.GET_DISTRICT_WISE_DOCUMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DISTRICT_WISE_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        districtWiseDocumentList: action.result,
      };
    }

    case API_CONSTANTS.DOWNLOAD_EXCEL_FILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DOWNLOAD_EXCEL_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        downloadFilePath: action.result,
      };
    }

    case API_CONSTANTS.SET_DOWNLOAD_EXCEL_FILE_FALSE: {
      return {
        ...state,
        downloadFilePath: false,
      };
    }

    case API_CONSTANTS.CREATE_DISTRICT_FORM: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_DISTRICT_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        createDistrctResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_CREATE_DISTRICT_FALSE: {
      return {
        ...state,
        loading: false,
        createDistrctResult: false,
      };
    }

    case API_CONSTANTS.CREATE_VILLAGE_FORM: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_VILLAGE_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        createVillageResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_VILLAGE_FALSE: {
      return {
        ...state,
        loading: false,
        createVillageResult: false,
      };
    }

    case API_CONSTANTS.CREATE_TALUKA_FORM: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_TALUKA_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        createTalukaResult: action.result,
      };
    }

    case API_CONSTANTS.GET_DISTRICT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DISTRICT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        districtListResult: action.result,
      };
    }

    case API_CONSTANTS.SET_TALUKA_RESULT_FALSE: {
      return {
        ...state,
        createTalukaResult: false,
      };
    }

    case API_CONSTANTS.GET_TALUKA_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_TALUKA_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        talukaListResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_TALUKS_FALSE: {
      return {
        ...state,
        talukaListResult: false,
      };
    }

    case API_CONSTANTS.SET_VILLAGE_LIST_FALSE: {
      return {
        ...state,
        createVillageResult: false,
      };
    }

    case API_CONSTANTS.SET_LOADING_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.SET_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }

    case API_CONSTANTS.MAP_TYPE_DOCUMET_LIST_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.MAP_TYPE_DOCUMET_LIST_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        mapTypeReports: action.result,
      };
    }

    case API_CONSTANTS.USER_LIST_PAGEINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_LIST_PAGEINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyUserDocumentCountList: action.result,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        villageListMapType: action.result,
      };
    }

    case API_CONSTANTS.SET_VILLAGE_LIST_MAP_FLASSE: {
      return {
        ...state,
        villageListMapType: false,
      };
    }

    case API_CONSTANTS.GET_TALUKS_LIST_MAP_TYPE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_TALUKS_LIST_MAP_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        talukaListMapTypeList: action.result,
      };
    }

    case API_CONSTANTS.SET_TALUKA_LIST_MAP_TYPE_FALSE: {
      return {
        ...state,
        talukaListMapTypeList: [],
      };
    }

    case API_CONSTANTS.GET_TALUKA_MAP_TYPE_LIST_RECORDS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_TALUKA_MAP_TYPE_LIST_RECORDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        talukaWiseReports: action.result,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_MAP_TYPE_LIST_RECORDS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_MAP_TYPE_LIST_RECORDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        villageWiseRecords: action.result,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_WISE_MAP_TYPE_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_VILLAGE_WISE_MAP_TYPE_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        villageWiseMapTypeCount: action.result,
      };
    }

    case API_CONSTANTS.RE_UPLOAD_SCANNED_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.RE_UPLOAD_SCANNED_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        uploading: "completed",
        reScanUpload: action.result,
      };
    }

    case API_CONSTANTS.USER_WISE_DOCUMENT_COUNT_COUNT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_WISE_DOCUMENT_COUNT_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        userWiseDocumentCountResult: action.result,
      };
    }

    case API_CONSTANTS.UPDATE_AGENCY_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case API_CONSTANTS.UPDATE_AGENCY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        addAgencyUserResponse: action.result,
      };
    }

    case API_CONSTANTS.USER_DETAILS_DOCUMENT_COUNT_PAGINATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.USER_DETAILS_DOCUMENT_COUNT_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        userWiseDocumentCountResult: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_WISE_DOCUMENT_COUNT: {
      return {
        ...state,
        loading: true,
        agencyWiseDocumentCount: action.result,
      };
    }

    case API_CONSTANTS.AGENCY_WISE_DOCUMENT_COUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        agencyWiseDocumentCount: action.result,
      };
    }

    case API_CONSTANTS.CORRECT_NOT_FOUNT_SCAN_FILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CORRECT_NOT_FOUNT_SCAN_FILE_SUCCESS: {
      return {
        ...state,
        loading: true,
        correctNotFoundResult: action.result,
      };
    }

    case API_CONSTANTS.GET_DEPEARTMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_DEPEARTMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        departmentList: action.result,
      };
    }

    case API_CONSTANTS.GET_FILE_EXCHANGE_USER_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_FILE_EXCHANGE_USER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        fileExchangeUserList: action.result,
      };
    }

    case API_CONSTANTS.SET_USER_LIST_EMPTY: {
      return {
        ...state,
        loading: false,
        fileExchangeUserList: [],
      };
    }

    case API_CONSTANTS.GET_SELECTED_USER_FILES: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_SELECTED_USER_FILES_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedUserFilesResult: action.result,
      };
    }

    case API_CONSTANTS.GET_AGENCY_ALLOCATED_EXCHANGE_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_COMMON_TALUKA_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_COMMON_TALUKA_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        commonTaluksResultSuccess: action.result,
      };
    }

    case API_CONSTANTS.GET_COMMON_DISTRICT_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_COMMON_DISTRICT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        commonDistrictResultSuccess: action.result,
      };
    }

    case API_CONSTANTS.POST_PRESCAN_DOCUMENT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.POST_PRESCAN_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        postPrescanDetailsResult: action.result,
      };
    }

    case API_CONSTANTS.SET_POST_PRESCAN_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        postPrescanDetailsResult: false,
      };
    }

    case API_CONSTANTS.GET_POST_PRESCAN_DOCUMENT_LIST: {
      return {
        ...state,
        loading: false,
      };
    }

    case API_CONSTANTS.GET_POST_PRESCAN_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        preScanDocumentListResult: action.result,
      };
    }

    case API_CONSTANTS.DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DIST_TALUKSWISE_PRESCANNING_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        distTalukaPreScanDocumentListResult: action.result,
      };
    }

    case API_CONSTANTS.POST_BELL_EXCEL_FILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.POST_BELL_EXCEL_FILE_SUCCESS: {
      return {
        ...state,
        belFileUploadSection: action.result,
        loading: false,
      };
    }

    case API_CONSTANTS.POST_BELL_EXCEL_FILE_FALSE: {
      return {
        ...state,
        belFileUploadSection: false,
        loading: false,
      };
    }

    case API_CONSTANTS.GET_MAP_TYPE_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_MAP_TYPE_LIST_SUCCESS: {
      return {
        ...state,
        mapTypeListResult: action.result,
        loading: false,
      };
    }

    case API_CONSTANTS.GET_BARCODE_FROM_IMAGE: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_BARCODE_FROM_IMAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        barcodeImageResult: action.result,
      };
    }

    case API_CONSTANTS.UPDATE_BARCODE_NUMBER: {
      return {
        ...state,
        loading: false,
        barcodeImageResult: action.result,
      };
    }

    case API_CONSTANTS.UPDATE_BARCODE_NUMBER_SUCCESS: {
      return {
        ...state,
        loading: false,
        updateResultOfImageBarcodeNumber: action.result,
      };
    }

    case API_CONSTANTS.SET_BARCODE_UPDATE_RESULT_FALSE: {
      return {
        ...state,
        updateResultOfImageBarcodeNumber: false,
      };
    }

    case API_CONSTANTS.CREATE_TALUKA_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_TALUKA_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        createTalukaAdminResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_TALUKA_ADMIN_RESULT_FALSE: {
      return {
        ...state,
        createTalukaAdminResult: false,
      };
    }

    case API_CONSTANTS.CREATE_DISTRICT_ADMIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_DISTRICT_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        createDistrictAdminResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_DISTRICT_ADMIN_FALSE: {
      return {
        ...state,
        createDistrictAdminResult: false,
      };
    }

    case API_CONSTANTS.CREATE_PRE_DRAFT_REPORT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CREATE_PRE_DRAFT_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        createPreDraftReportResult: action.result,
      };
    }

    case API_CONSTANTS.SET_CREATE_PRE_DRAFT_REPORT_FALSE: {
      return {
        ...state,
        loading: true,
        createPreDraftReportResult: false,
      };
    }

    case API_CONSTANTS.PRE_DRAFT_DOCUMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.PRE_DRAFT_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        preDraftDistrictDocumentListResult: action.result,
      };
    }

    case API_CONSTANTS.PRE_DRAFT_SUB_DOCUMENT_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.PRE_DRAFT_SUB_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        preDraftDocumentListResult: action.result,
      };
    }

    case API_CONSTANTS.CHANGE_PAGE_SIZE_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.CHANGE_PAGE_SIZE_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        changePaginationActionResult: action.result,
      };
    }

    case API_CONSTANTS.SET_PAGINATION_COUNT_CHANGE_FALSE: {
      return {
        ...state,
        loading: false,
        changePaginationActionResult: false,
      };
    }

    case API_CONSTANTS.GET_TODAYS_MAP_TYPE_REPORT: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_TODAYS_MAP_TYPE_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        todaysMapTypeReportList: action.result,
      };
    }

    case API_CONSTANTS.GET_PRE_SCAN_DOCUMENT_LIST_ROW_SPAN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_PRE_SCAN_DOCUMENT_LIST_ROW_SPAN_SUCCESS: {
      return {
        ...state,
        todaysPreScanDocumentList: action.result,
      };
    }

    case API_CONSTANTS.GET_PRE_DRAFT_DOCUMENT_LIST_ROW_SPAN: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_PRE_DRAFT_DOCUMENT_LIST_ROW_SPAN_SUCCESS: {
      return {
        ...state,
        todaysPreDraftDocumentList: action.result,
      };
    }

    case API_CONSTANTS.UPDATE_POLYGON_QC_COUNT_RAW: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.UPDATE_POLYGON_QC_COUNT_RAW_SUCCESS: {
      return {
        ...state,
        updatePolygonCountResult: action.result,
        loading: false,
      };
    }

    case API_CONSTANTS.SET_ALLOCATE_TO_AGENCIES_RESULT_FALSE: {
      return {
        ...state,
        rectifyFileUplaod: false,
      };
    }

    case API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        retrieveFileResult: action.result,
      };
    }

    case API_CONSTANTS.RETRIEVE_FILE_FROM_AGENCY_FALSE: {
      return {
        ...state,
        retrieveFileResult: false,
      };
    }

    case API_CONSTANTS.GET_FILES_FROM_AGENCY: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.GET_FILES_FROM_AGENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        getFileFromAgencyResult: action.result,
      };
    }

    case API_CONSTANTS.SET_GET_FILE_FROM_AGENCY_FALSE: {
      return {
        ...state,
        loading: true,
        getFileFromAgencyResult: false,
      };
    }

    case API_CONSTANTS.DEACTIVATE_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case API_CONSTANTS.DEACTIVATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default RootReducer;
