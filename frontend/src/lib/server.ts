import axios from "axios";
import { ClientForm, SignInForm, UserForm } from "./utils";

export const baseURL = "http://localhost:4500/api";
// export const baseURL = "/api";

export const unProtectedRequest = axios.create({ baseURL });
export const protectedRequest = () => {
  const headers = { Authorization: `Bearer ${localStorage?.getItem("token")}` };
  return axios.create({
    baseURL,
    headers,
  });
};

export const fetcher = async (path: string) => {
  const { data } = await protectedRequest().get(path);
  return data.data;
};

export const loginAccount = async (payload: SignInForm) => {
  const { data } = await unProtectedRequest.post("/login", payload);
  return data;
};

export const getMyData = async () => {
  const { data } = await protectedRequest().get("/me");
  return data;
};

export const getReportData = async (type: string) => {
  const { data } = await protectedRequest().get("/report", {
    params: { type },
  });
  return data;
};

export const createClient = async (payload: ClientForm) => {
  const { data } = await protectedRequest().post("/client", payload);
  return data;
};

export const getClientDetail = async (id: string) => {
  const { data } = await protectedRequest().get("/client/" + id);
  return data;
};

export const updateClient = async (id: string, payload: ClientForm) => {
  const { data } = await protectedRequest().put("/client/" + id, payload);
  return data;
};

export const deleteClient = async (id: string) => {
  const { data } = await protectedRequest().delete("/client/" + id);
  return data;
};

export const createUser = async (payload: UserForm) => {
  const { data } = await protectedRequest().post("/user", payload);
  return data;
};

export const getUserDetail = async (id: string) => {
  const { data } = await protectedRequest().get("/user/" + id);
  return data;
};

export const updateUser = async (id: string, payload: UserForm) => {
  const { data } = await protectedRequest().put("/user/" + id, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await protectedRequest().delete("/user/" + id);
  return data;
};
