import axiosPrivate from "./axiosPrivate"

const userApi = {
  getUserData: () => {
    const url = '/auth/userData/'
    return axiosPrivate.get(url)
  },
}

export default userApi;