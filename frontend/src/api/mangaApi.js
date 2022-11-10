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
    const url = '/mangaApp/categoryList/'
    return axiosClient.get(url)
  },

  addManga: (formData) => {
    const url = '/mangaApp/newManga/'
    return axiosClient.post(url, formData)
  }
}

export default mangaApi;