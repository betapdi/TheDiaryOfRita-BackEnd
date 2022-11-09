import { createSlice } from '@reduxjs/toolkit'

const mangaList = createSlice({
  name: 'mangaList',
  initialState: [],
  reducers: {
    addManga: (state, action) => {
      state.push(action.payload)
    }
  }
})

const { reducer, actions } = mangaList
export const { addManga } = actions
export default reducer