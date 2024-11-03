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
    voteNotification(state, action) {
      const anecdote = action.payload
      const notification = `you voted '${anecdote}'`
      state = notification
      return state
    },
    createNotifcation(state, action) {
      const anecdote = action.payload
      const notification = `you created '${anecdote}'`
      state = notification
      return state
    }
  }
})

export const { resetNotification, createNotifcation, voteNotification } = notificationSlice.actions
export default notificationSlice.reducer