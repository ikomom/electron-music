export const ACHEME = "app";
export const LOAD_URL = `${ACHEME}://./index.html`;
/**
 * 拼接url
 * @param hash
 * @returns {string}
 * @constructor
 */
export const JOIN_URL = function(hash = '') {
  return process.env.NODE_ENV === "development" ? process.env.WEBPACK_DEV_SERVER_URL + '/' + hash : LOAD_URL
}
