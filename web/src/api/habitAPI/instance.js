import axios from "axios";
// creating an axios instance to our habit API baseURL. This instance will be utilized by API requests to the habit API.
export default axios.create({
  baseURL: "http://localhost:5000/",
  method: 'get',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
});
