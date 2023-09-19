import axios from "axios";
// import { useSelector } from "react-redux";
import { store } from "../Redux/store.js";

const BASE_URL = "http://localhost:8000/";
// const token = useSelector((state) => state.user.currentUser.token);
var TOKEN;
// if (store.getState().user.currentUser) {
//   token1 = store.getState().user.currentUser.token;
// } else {
//   token1 = "null";
// }
TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmE2ZGQ1OTc4NzI3NWFlNjQwNGU1YyIsImlzQWRtaW4iOnRydWUsImNyZWF0ZWRfY2xnIjpbIiIsMSwyLDEsMiwzLDQsNSwxLDIsMyw0LDUsMSwyLDNdLCJpYXQiOjE2ODA1OTgwODEsImV4cCI6MTY4MDg1NzI4MX0.N3MGzt_hZd_ZjLQJF8fDZAnYH364QYV017Ut2AiCsPE";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN },
});

console.log(store.getState());
