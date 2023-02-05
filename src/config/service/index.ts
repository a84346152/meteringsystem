import axios from "axios";
import { ElMessage } from "element-plus";
const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
//设置拦截器
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
service.interceptors.response.use(
  (response) => {
    const { data, msg, code } = response.data;
    //后端接口没有规范输出时，输出默认值
    if (code === undefined) return response.data;
    if (code == 10000 || code == 1) {
      return data;
    } else {
      ElMessage.error(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        ElMessage.error("请求参数错误，请重新输入");
        break;
      case 403:
        ElMessage.error("您的访问权限已过期，请重新登录");
        break;
      case 404:
        ElMessage.error("未在服务器中找到该方法，请询问服务人员");
        break;
      case 500:
        ElMessage.error("服务端异常");
        break;
      case 502:
        ElMessage.error("响应超时");
        break;
      default:
        ElMessage.error(error.message);
    }
    return Promise.reject(error);
  }
);
export default service;
