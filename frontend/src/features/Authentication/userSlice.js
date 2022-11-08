import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import jwt_decode from "jwt-decode"

const initialState = {
  authTokens: (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null),
  user: (localStorage.getItem('authTokens') ? jwt_decode((JSON.parse(localStorage.getItem('authTokens'))).access) : null)
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData) => {
    const response = await userApi.login(formData)
    return response
  }
)

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (currentRefreshToken) => {
    const response = await userApi.updateToken(currentRefreshToken)
    return response
  }
)

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem('authTokens')
      state.authTokens = null
      state.user = null
    }
  },

  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('authTokens', JSON.stringify(action.payload))
      state.authTokens = action.payload;
      state.user = jwt_decode(action.payload.access)
    },

    [updateToken.fulfilled]: (state, action) => {
      ((action.payload.status !== 200) && logoutUser())

      console.log('Update Token success')
      localStorage.setItem('authTokens', JSON.stringify(action.payload))
      
      state.authTokens = action.payload;
      state.user = jwt_decode(action.payload.access)
    },
  }
})

const { reducer, actions } = user
export const { logoutUser } = actions
export default reducer