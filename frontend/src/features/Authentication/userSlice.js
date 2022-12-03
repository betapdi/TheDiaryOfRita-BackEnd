import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import jwt_decode from "jwt-decode"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendEmailVerification,
} from 'firebase/auth'

import { auth } from '../../firebase/firebase-config'
import { async } from '@firebase/util'

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const getData = async () => {
  try {
    const response = await userApi.getUserData();
    return response;
  } catch(error) {
    console.log(error);
  }
}

const initialState = {
  userData: null
};

export const createUser = createAsyncThunk(
  'user/register',
  async (data) => {
    const email = data.email, password = data.password;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user).then(() => {
        alert("Email verification sent! Check your spam mails if you don't find it");
      })

      await auth.signOut();
    } catch(error) {
      alert("[Error] Email was used!");
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (data) => {
    const email = data.email, password = data.password;
    const { user } = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert("[Error] Wrong email or password!");
    })

    if (!user.emailVerified) {
      await auth.signOut();
      alert("[Error] Please verify your email before login!");
    }

    return await getData();
  }
)

export const googleLogin = createAsyncThunk(
  'user/loginGoogle',
  async () => {
    const { user } = await signInWithPopup(auth, googleProvider).catch((error) => {
      alert("[Error] Error when login by google");
    })

    return await getData();
  }
)

export const facebookLogin = createAsyncThunk(
  'user/loginFacebook',
  async () => {
    const { user } = await signInWithPopup(auth, facebookProvider).catch((error) => {
      alert("[Error] Error when login by facebook");
    })

    return await getData();
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async() => {
    await auth.signOut();
    return null;
  }
)

export const getUserData = createAsyncThunk(
  'user/getData',
  async() => {
    return await getData();
  }
)

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
  },

  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
      }
    },

    [googleLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
      }
    },

    [facebookLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
      }
    },

    [logoutUser.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },

    [getUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },
  }
})

const { reducer, actions } = user;
export const { } = actions;
export default reducer;