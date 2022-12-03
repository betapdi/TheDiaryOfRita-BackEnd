import axiosClient from "./axiosClient"
import axiosPrivate from "./axiosPrivate"

const mangaApi = {
  getAll: (params) => {
    const url = '/mangaApp/mangaList/'
    return axiosClient.get(url, { params })
  },

  getMangaData: (id) => {
    const url = `/mangaApp/${id}/`
    return axiosClient.get(url)
  },

  getAllCategories: () => {
    const url = '/mangaApp/categoryList/'
    return axiosClient.get(url)
  },

  getAllFavourites: () => {
    const url = '/mangaApp/favourites/'
    return axiosPrivate.get(url)
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
  },

  addChapter: (data) => {
    const formData = new FormData()
    formData.append('chapterId', data.chapter_id)
    formData.append('chapterData', data.chapter_data)

    const url = `/mangaApp/${data.manga_name}/chapter/upload/`
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },

  addMultipleChapters: (data) => {
    const formData = new FormData()
    formData.append('chapterData', data.chapter_data)

    const url = `/mangaApp/${data.manga_name}/chapter/uploadMulti/`
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }

  //To Do: Check authorization when upload data
}

export default mangaApi;