import axios from "axios";

const fetcher = axios.create({ baseURL: "http://localhost:4000/task" });

export const getTask = async () => {
  const { data } = await fetcher.get("/");
  return data;
};

export const postTask = async (body: { name: string; deadline: string }) => {
  const { data } = await fetcher.post("/", body);
  return data;
};

export const putTask = async (
  body: { name: string; deadline: string },
  id: number
) => {
  const { data } = await fetcher.put(`/${id}`, body);
  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await fetcher.delete(`/${id}`);
  return data;
};
