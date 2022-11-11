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

  addManga: (data) => {
    const formData = new FormData()
    formData.append('mangaName', data.mangaName)
    formData.append('description', data.description)
    data.categories.map(category => (
      formData.append('categories', category)
    ))
    formData.append('cover_image', data.cover_image)

    const url = '/mangaApp/newManga/'
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }
}

export default mangaApi;