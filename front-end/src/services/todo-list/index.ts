import axios, { AxiosInstance } from "axios";

export default class EventService {
  private httpServer: AxiosInstance;

  constructor() {
    this.httpServer = this.setHttpServer();
  }

  private setHttpServer() {
    const axiosCreate = axios.create({
      baseURL: process.env.NEXT_PUBLIC_WOLFFOX_ADMIN_BASE_URL_API,
    });

    return axiosCreate;
  }

  async getAll() {
    const { data } = await this.httpServer.get("/task");

    return data;
  }
}
