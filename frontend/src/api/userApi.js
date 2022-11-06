import axiosClient from "./axiosClient"

const userApi = {
  login: (data) => {
    const url = '/token/'
    return axiosClient.post(url, data)
  },
}

export default userApi;