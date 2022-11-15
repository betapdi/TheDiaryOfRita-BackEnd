import { configureStore } from "@reduxjs/toolkit"
import mangaListReducer from "../features/Manga/slices/mangaListSlice"
import userReducer from "../features/Authentication/userSlice"
import categoryReducer from "../features/Manga/slices/categorySlice"
import mangaReducer from "../features/Manga/slices/mangaSlice"

const rootReducer = {
  mangaList: mangaListReducer,
  userData: userReducer,
  categoryList: categoryReducer,
  manga: mangaReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store