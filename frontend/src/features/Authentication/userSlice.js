import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import jwt_decode from "jwt-decode"

const initialState = {
  authTokens: (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null),
  user: (localStorage.getItem('authTokens') ? jwt_decode((JSON.parse(localStorage.getItem('authTokens'))).access) : null)
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData) => {
    try {
      const response = await userApi.login(formData)
      return response
    } catch (error) {
      return error      
    }
  }
)

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (currentRefreshToken) => {
    try {
      const response = await userApi.updateToken(currentRefreshToken)
      return response
    } catch (error) {
      return error      
    }
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
      if (action.payload.access == null) {
        console.log('Wrong username or password')
      }

      else {
        localStorage.setItem('authTokens', JSON.stringify(action.payload))
        state.authTokens = action.payload;
        state.user = jwt_decode(action.payload.access)
      }
    },

    [updateToken.fulfilled]: (state, action) => {
      if (action.payload.access == null) {
        console.log('You are not logged in')
        console.log(action.payload)

        localStorage.removeItem('authTokens')
        state.authTokens = null
        state.user = null
      }
      
      else {
        console.log('Update Token success')
        console.log(action.payload)
        localStorage.setItem('authTokens', JSON.stringify(action.payload))
        
        state.authTokens = action.payload;
        state.user = jwt_decode(action.payload.access)
      }
    },
  }
})

const { reducer, actions } = user
export const { logoutUser } = actions
export default reducer