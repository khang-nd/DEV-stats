const axios = require("axios").default;
const API = "https://dev.to/api";

/**
 * @param {string} endPoint
 * @param {import("axios").AxiosRequestConfig} options
 */
function fetch(endPoint, options) {
  return axios(API + endPoint, { ...options });
}

/**
 * @param {string} endPoint
 * @param {import("axios").AxiosRequestConfig} options
 */
function get(endPoint, options) {
  return fetch(endPoint, { method: "GET", ...options });
}

/**
 * @param {Array<import("axios").AxiosPromise>} promises
 */
function all(promises) {
  return axios.all(promises);
}

module.exports = { fetch, get, all };
