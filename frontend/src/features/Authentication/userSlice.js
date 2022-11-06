import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import jwt_decode from "jwt-decode"

const initialState = {
  authTokens: localStorage.getItem('authTokens'),
  user: (localStorage.getItem('authTokens') ? jwt_decode((JSON.parse(localStorage.getItem('authTokens'))).access) : null)
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData) => {
    const response = await userApi.login(formData)
    return response
  }
);

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
    
  },

  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('authTokens', JSON.stringify(action.payload))
      state.authTokens = action.payload;
      state.user = jwt_decode(action.payload.access)
    }
  }
})

const { reducer, actions } = user
export const { } = actions
export default reducer