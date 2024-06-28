import axios from "axios";

const mainAxios = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_API_URL || "localhost:5001"}`,
  withCredentials: true,
});

export default mainAxios;
