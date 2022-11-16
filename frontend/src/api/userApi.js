import axiosPrivate from "./axiosPrivate"

const userApi = {
  login: (data) => {
    const url = '/auth/token/'
    return axiosPrivate.post(url, data)
  },
  
  updateToken: (token) => {
    const url = '/auth/token/refresh/'
    return axiosPrivate.post(url, token)
  },
}

export default userApi;