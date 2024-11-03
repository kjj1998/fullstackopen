import { createSlice } from "@reduxjs/toolkit"

const initialState = 'If it hurts, do it more often'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload
      state = notification
      return state
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer