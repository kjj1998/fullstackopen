import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification(state) {
      const notification = ''
      state = notification
      return state
    },
    updateNotification(state, action) {
      const notification = action.payload
      state = notification
      return state
    }
  }
})

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch(updateNotification(notification))
    setTimeout(() => {
      dispatch(resetNotification())
    }, duration * 1000)
  }
}

export const { resetNotification, updateNotification } = notificationSlice.actions
export default notificationSlice.reducer