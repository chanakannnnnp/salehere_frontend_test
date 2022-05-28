import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'counter',
  initialState: {
    isLogged: false,
    userData: null
  },
  reducers: {
    joinchatroom: (state, action) => {
      state.isLogged = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.isLogged = false
      state.userData = null
    },
    updateuser: (state, action) => {
      state.userData = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { joinchatroom, logout, updateuser } = UserReducer.actions

export default UserReducer.reducer
