import axios, { AxiosInstance } from "axios";

const clienteHttp: AxiosInstance = axios.create({
  baseURL: "https://time-task-tracker.glitch.me/"

  // para rodar no localhost comentar a baseURL acima e descomentar a próxima linha
  // baseURL: "http://localhost:3000/"
});

export default clienteHttp;