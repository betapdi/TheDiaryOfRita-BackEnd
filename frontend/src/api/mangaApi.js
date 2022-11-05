import axiosClient from "./axiosClient"

const mangaApi = {
  getAll: (params) => {
    const url = '/mangas/'
    return axiosClient.get(url, { params })
  },

  get: (id) => {
    const url = `manga/${id}/`
    return axiosClient.get(url)
  },
}

export default mangaApi;