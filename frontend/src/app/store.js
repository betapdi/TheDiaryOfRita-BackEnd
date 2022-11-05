import { configureStore } from "@reduxjs/toolkit"
import mangaReducer from "../features/Manga/mangaSlice"

const rootReducer = {
  mangas: mangaReducer,
}

const store = configureStore({
  reducer: rootReducer,
})

export default store