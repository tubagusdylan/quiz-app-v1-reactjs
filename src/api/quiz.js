import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;

export async function getQuizList() {
  const { data } = await axios.get(`${baseUrl}`);
  return data.results;
}
