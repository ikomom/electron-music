import axios from "axios"
import store from '@/store'
import { Notification } from 'element-ui';

const baseURL = process.env.BASIC_URL || 'http://127.0.0.1:3000'

const request = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 30 * 1000 // 请求超时时间
})

request.interceptors.request.use(
  (config) => {
    // todo 待添加
    // if (!store.state.App.isOnline) {
    //   return Promise.reject(new Error("offline!"));
    // }
    return config;
  },
  (error) => {
    Notification.error(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    if (response.status && response.status === 200) {
      return response.data;
    }
    Notification.warning(response.statusText || "Response error");
    return Promise.reject(response);
  },
  (error) => {
    // todo
    if (error.response) {
      let res = error.response;
      switch (res.status) {
        case 301:
          store.commit("User/SET_SHOW_LOGIN", true);
          store.commit("User/SET_USER_INFO", {});
          store.commit("App/SET_REDIRECT", "/home");
          localStorage.removeItem("userId");
          Notification.warning(res.msg || "请先登录");
          break;
        case 400:
          Notification.warning(
            res.message || res.msg || "资源不在收藏列表中"
          );
          break;
        case 401:
          store.commit("User/SET_SHOW_LOGIN", true);
          store.commit("User/SET_USER_INFO", {});
          store.commit("App/SET_REDIRECT", "/home");
          localStorage.removeItem("userId");
          Notification.warning(res.msg || "请先登录");
          break;
        case 403:
          Notification.error(res.msg || "权限不足");
          break;
        case 404:
          Notification.error(res.msg || "请求资源不存在");
          break;
        case 408:
          Notification.error(res.message || "已经收藏过该视频");
          break;
        case 500:
          Notification.error(res.msg || "服务器开小差啦");
          break;
        case 504:
          Notification.error(res.msg || "网络请求失败");
          break;
        default:
          Notification.error(res.msg || res.statusText);
      }
    } else {
      // Toast({
      //   icon: "close",
      //   content: "请检查网络连接状态!",
      // });
    }
    return Promise.reject(error.response);
  }
);

export default request
