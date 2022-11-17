import axiosClient from "./axiosClient"

const bannerApi = {
  getAllBanners: () => {
    const url = '/mangaApp/bannerList/'
    return axiosClient.get(url)
  },
}

export default bannerApi;