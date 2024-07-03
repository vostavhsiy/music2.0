import axios from "axios";

const mainAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}`,
  withCredentials: true,
});

export default mainAxios;
