import { configureStore } from "@reduxjs/toolkit"
import mangaReducer from "../features/Manga/slices/mangaListSlice"
import userReducer from "../features/Authentication/userSlice"
import categoryReducer from "../features/Manga/slices/categorySlice"

const rootReducer = {
  mangaList: mangaReducer,
  userData: userReducer,
  categoryList: categoryReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store