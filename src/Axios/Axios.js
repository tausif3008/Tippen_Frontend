import axios from "axios";
import { URLS } from "../globals/urls";
import { message } from "antd";

const baseurl = URLS.BASE_URL;
const token = JSON.parse(localStorage.getItem("user"))?.Token;

const postHTTP = async (url, details = {}) => {
  const wholseUrl = baseurl + url;

  const data = axios
    .post(
      wholseUrl,
      { ...details },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + token,
        },
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
};

const putHTTP = async (url, details = {}, isMessage = false) => {
  const wholseUrl = baseurl + url;

  const data = axios
    .put(
      wholseUrl,
      { ...details },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + token,
        },
      }
    )
    .then((response) => {
      if (isMessage) message.success(isMessage);
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
};

export { postHTTP, putHTTP };
