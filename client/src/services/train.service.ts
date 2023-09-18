import { Schedule, ScheduleRequest } from "../types/schedule.types.ts";
import { axiosInstance } from "./api.ts";

const API_URL: string = `v1/trains/`;

class TrainService {
    async create(data: ScheduleRequest): Promise<Schedule> {
        return axiosInstance
            .post(API_URL, {
                ...data
            })
            .then((response: { data: Schedule; }) => {
                return response.data;
            })
    }

    async getAll(): Promise<Schedule[]> {
        return axiosInstance
            .get(API_URL)
            .then((response: { data: Schedule[]; }) => {
                return response.data;
            });
    }

    async deleteById(id: string): Promise<Schedule> {
        return axiosInstance
            .delete(`${API_URL}${id}`)
            .then((response: { data: Schedule }) => {
                return response.data;
            })
    }

    async updateById(id: string, data: ScheduleRequest): Promise<Schedule> {
        return axiosInstance
            .put(`${API_URL}${id}`, {
                ...data
            })
            .then((response: { data: Schedule; }) => {
                return response.data;
            })
    }

    async changeStatus(id: string, status: boolean): Promise<Schedule> {
        return axiosInstance
            .patch(`${API_URL}${id}/status`, {
                isActive: status
            })
            .then((response: { data: Schedule; }) => {
                return response.data;
            })
    }
}

export default new TrainService();