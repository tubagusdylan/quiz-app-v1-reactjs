import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;

export async function getQuizList(category, total, diff, type) {
  const { data } = await axios.get(`${baseUrl}?amount=${total}&category=${category}&difficulty=${diff}&type=${type}`);
  return data.results;
}
