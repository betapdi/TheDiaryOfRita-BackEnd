import axiosClient from "./axiosClient"

const mangaApi = {
  getAll: (params) => {
    const url = '/mangaApp/mangaList/'
    return axiosClient.get(url, { params })
  },

  get: (id) => {
    const url = `/mangaApp/${id}/`
    return axiosClient.get(url)
  },

  getAllCategories: () => {
    const url = '/categoryList/'
    return axiosClient.get(url)
  },
}

export default mangaApi;