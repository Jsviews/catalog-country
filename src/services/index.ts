import { axiosInstance } from './axios'

export const apiServices = {
  country: {
    query: (requestParam = {}) => axiosInstance.get('/all', { params: requestParam }),
  },
}
