import axios from "axios";
// creating an axios instance to our habit API baseURL. This instance will be utilized by API requests to the habit API.
export default axios.create({
  baseURL: "http://localhost:5000/",
  method: 'get',
  headers: {
   
  }
});
