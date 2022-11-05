import { createSlice } from '@reduxjs/toolkit'

const manga = createSlice({
  name: 'mangas',
  initialState: [],
  reducers: {
    addManga: (state, action) => {
      state.push(action.payload)
    }
  }
})

const { reducer, actions } = manga
export const { addManga } = actions
export default reducer