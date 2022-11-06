import { configureStore } from "@reduxjs/toolkit"
import mangaReducer from "../features/Manga/mangaSlice"
import userReducer from "../features/Authentication/userSlice"

const rootReducer = {
  mangas: mangaReducer,
  userData: userReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store