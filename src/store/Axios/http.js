import axios from "axios";

export const http = axios.create({
  baseURL: "http://103.86.182.150:8001/api/",
  // baseURL: "http://filemanagement.metaxpay.in:8001/api/",
  // baseURL: "http://192.168.1.141:8002/api/",
});
