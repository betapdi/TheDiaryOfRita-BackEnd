import { createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import jwt_decode from "jwt-decode"

const user = createSlice({
  name: 'user',
  initialState: {
    authTokens: localStorage.getItem('authTokens'),
    user: (localStorage.getItem('authTokens') ? jwt_decode((JSON.parse(localStorage.getItem('authTokens'))).access) : null)
  },

  reducers: {
    loginUser: async (state, action) => {
      try {
        const response = await userApi.login(action.payload)
        state = {
          authTokens: response,
          user: jwt_decode(response.access)
        }
        localStorage.setItem('authTokens', JSON.stringify(response))
      } catch (error) {
        console.log("Failed to login: ", error)
      }
    }
  }
})

const { reducer, actions } = user
export const { loginUser } = actions
export default reducer