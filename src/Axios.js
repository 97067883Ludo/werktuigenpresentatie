import axios from "axios";

const apiConnection = axios.create({
    baseURL: "http://localhost:5172",
})
export default apiConnection;

