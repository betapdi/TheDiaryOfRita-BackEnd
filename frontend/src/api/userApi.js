import axiosPrivate from "./axiosPrivate"

const userApi = {
  login: (data) => {
    const url = '/token/'
    return axiosPrivate.post(url, data)
  },
  
  updateToken: (token) => {
    const url = '/token/refresh/'
    return axiosPrivate.post(url, token)
  },
}

export default userApi;