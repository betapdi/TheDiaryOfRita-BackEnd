import { configureStore } from "@reduxjs/toolkit"
import mangaReducer from "../features/Manga/mangaSlice"

const rootReducer = {
  mangas: mangaReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store