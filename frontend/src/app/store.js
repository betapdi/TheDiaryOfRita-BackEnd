import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/Authentication/userSlice"
import categoryReducer from "../features/Manga/slices/categorySlice"
import favouriteReducer from "../features/Manga/slices/favouriteSlice"
import mangaListReducer from "../features/Manga/slices/mangaListSlice"
import mangaReducer from "../features/Manga/slices/mangaSlice"
import topMangaReducer from "../features/Manga/slices/topMangaSlice"
import bannerReducer from "../slices/bannerSlice"

const rootReducer = {
  userData: userReducer,
  mangaList: mangaListReducer,
  categoryList: categoryReducer,
  bannerList: bannerReducer,
  manga: mangaReducer,
  favouriteList: favouriteReducer,
  topManga: topMangaReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store