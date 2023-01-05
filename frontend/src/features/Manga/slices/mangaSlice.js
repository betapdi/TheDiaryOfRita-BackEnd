import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mangaApi from '../../../api/mangaApi';

//To Do: Change all createAsyncThunk to try catch function to catch error 

export const getMangaData = createAsyncThunk(
  'manga/getMangaData',
  async (mangaId) => {
    const response = await mangaApi.getMangaData(mangaId);
    return response
  }
)

export const deleteManga = createAsyncThunk(
  'manga/deleteManga',
  async (mangaId) => {
    await mangaApi.deleteManga(mangaId);
    return mangaId;
  }
)

const manga = createSlice({
  name: 'manga',
  initialState: null,
  reducers: {
    
  },

  extraReducers: {
    [getMangaData.fulfilled]: (state, action) => {
      return action.payload
    },

    [deleteManga.fulfilled]: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      state = newState;
    }
  },
})

const { reducer, actions } = manga
export const { } = actions
export default reducer