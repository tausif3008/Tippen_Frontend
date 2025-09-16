import { API_CONSTANTS } from "../../globals/ApiConstants";
import { getUser } from "../../utils/sessionStorage";
import { http } from "./http";

function checkLogin(type) {
  let checkLogin = getUser();
  if (type === API_CONSTANTS.USER_LOGIN) {
    return true;
  }

  if (!checkLogin) {
    window.location.href = "/";
    return false;
  }

  return true;
}

export const Method = {
  async getData(action) {
    if (checkLogin()) {
      try {
        const loginToken = getUser();
        const response = http.get(action.URL, {
          headers: {
            "Content-Type": action.contentType,
            Authorization: getUser() ? `token ${loginToken.Token}` : "",
          },
        });
        response
          .then((res) => {
            return res;
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              localStorage.clear();
            }
          });

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  },

  async postData(action) {
    if (checkLogin(action.type) || action.type === "USER_LOGIN") {
      try {
        const loginToken = getUser();
        const response = http.post(action.URL, action.payload, {
          headers: {
            "Content-Type": action.contentType,
            Authorization: getUser() ? `token ${loginToken.Token}` : "",
            "Guest-Token":
              "de0b558929ed7d3a10abb53305d28b16089a1cd84120ad4902452e5fbbac6b74",
          },
        });
        response
          .then((res) => {
            return res;
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              localStorage.clear();
            }
          });
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  },

  async putData(action) {
    if (checkLogin()) {
      try {
        const loginToken = getUser();
        const response = http.put(action.URL, action.payload, {
          headers: {
            "Content-Type": action.contentType,
            Authorization: getUser() ? `token ${loginToken.Token}` : "",
          },
        });
        response
          .then((res) => {
            return res;
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              localStorage.clear();
            }
          });

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  },

  async putDataRectifyAllocate(action) {
    if (checkLogin()) {
      try {
        const loginToken = getUser();
        const response = http.put(action.URL, action.payload.formData, {
          headers: {
            "Content-Type": action.contentType,
            Authorization: getUser() ? `token ${loginToken.Token}` : "",
          },
        });

        response
          .then((res) => {
            return res;
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              localStorage.clear();
            }
          });
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  },
};
