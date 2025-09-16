import { message } from "antd";
import { API_CONSTANTS } from "../../globals/ApiConstants";
import { Method } from "../Axios/BaseAxios";
import { put, call } from "redux-saga/effects";
import { setUser } from "../../utils/sessionStorage";
import reportWebVitals from "./../../reportWebVitals";

function* failSaga(mes) {
  message.error(mes);
}

function* errorSaga(mes) {
  message.error(mes);
}

function* UserLogin(action) {
  try {
    let result = yield call(Method.postData, action);

    if (result.status === 202) {
      setUser(result.data);
      localStorage.setItem("login", true);
    } else {
      localStorage.setItem("login", false);
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield put({
      type: API_CONSTANTS.USER_LOGIN_FAILED,
    });

    yield call(
      errorSaga,
      error?.response?.data?.message[0] ||
        "The credentials you entered are incorrect."
    );
  }
}

function* UploadScannedFilesGeneratorMain(action) {
  try {
    let result = yield call(Method.postData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
        isFinal: action.isFinal,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield put({
      type: `${action.type}_SUCCESS`,
      status: "ok",
      result: error.response.data,
    });
  }
}

function* UploadScannedFilesGenerator(action) {
  try {
    let result = yield call(Method.postData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      message.success(`${result.data.message}`);

      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield put({
      type: `${action.type}_SUCCESS`,
      status: "ok",
      result: error.response,
    });
    message.success(error.response.data.message);
  }
}

function* UploadScannedFileGenerator(action) {
  try {
    let result = yield call(Method.putDataRectifyAllocate, action);
    console.log(result);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "file uploading failed! please try again!" + error);
  }
}

function* UploadProcessedFilesGenerator(action) {
  try {
    let result = yield call(Method.putData, action);
    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      message.success("Files Uploaded Successfully.");
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "file uploading failed! please try again!" + error);
  }
}

function* AllocateToRectifyGetDetailsGenerator(action) {
  try {
    let result = yield call(Method.getData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "Somethin went wrong!");
  }
}

function* putCommonGenerator(action) {
  try {
    let result = yield call(Method.putData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      // if (action.message) message.success("Successfully updated.");
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "file uploading failed! please try again!" + error);
  }
}

function* putRectifyenerator(action) {
  try {
    let result = yield call(Method.putData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      message.success(action.message);
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "file uploading failed! please try again!" + error);
  }
}

function* GetPaginationDetailsGenerator(action) {
  try {
    let result = yield call(Method.getData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "Something went wrong!");
  }
}

function* GetCommonGenerator(action) {
  try {
    let result = yield call(Method.getData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    if (error.response.data.detail === "Invalid page.") {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: [],
      });
    }
    yield call(errorSaga, "Something went wrong! " + error);
  }
}

function* commonGetGenerator(action) {
  try {
    let result = yield call(Method.getData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield call(errorSaga, "Somethin went wrong!");
  }
}

function* addAgencyUser(action) {
  try {
    let result = yield call(Method.postData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else if (result.status === 208) {
      let keys = Object.keys(result.data);
      message.error(`${result.data[keys[0]]}`);
      yield put({
        type: `${action.type}_SUCCESS`,
        result: false,
        status: false,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {}
}

function* CreateFormsGenerator(action) {
  try {
    let result = yield call(Method.postData, action);
    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else if (result.status === 208) {
      let keys = Object.keys(result.data);
      message.error(`${result.data[keys[0]]}`);
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    let keys = Object.keys(error.response.data);
    message.error(`${error.response.data[keys[0]]}`);
  }
}

function* ReUploadScannedFilesGenerator(action) {
  try {
    let result = yield call(Method.postData, action);

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202
    ) {
      message.success(`${result.data.message}`);
      yield put({
        type: `${action.type}_SUCCESS`,
        status: "ok",
        result: result.data,
      });
    } else {
      yield call(failSaga, "Server Down!");
    }
  } catch (error) {
    yield put({
      type: `${action.type}_SUCCESS`,
      status: "ok",
      result: error.response,
    });
    message.success(error.response.data.message);
  }
}

export {
  UserLogin,
  UploadScannedFilesGenerator,
  AllocateToRectifyGetDetailsGenerator,
  UploadProcessedFilesGenerator,
  GetPaginationDetailsGenerator,
  putCommonGenerator,
  commonGetGenerator,
  putRectifyenerator,
  UploadScannedFileGenerator,
  GetCommonGenerator,
  addAgencyUser,
  CreateFormsGenerator,
  ReUploadScannedFilesGenerator,
  UploadScannedFilesGeneratorMain,
};
