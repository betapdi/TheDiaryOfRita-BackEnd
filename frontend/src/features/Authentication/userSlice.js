import { createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import queryString from 'query-string'

const user = createSlice({
  name: 'user',
  initialState: {tokens: null, user: null},
  reducers: {
    loginUser: async (state, action) => {
      try {
        console.log(queryString.stringify(action.payload))
        const response = await userApi.login(action.payload)
        // const data = await response.json()
        console.log(response)
      } catch (error) {
        console.log("Failed to login: ", error)
      }
    }
  }
})

const { reducer, actions } = user
export const { loginUser } = actions
export default reducer