import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      const filter = action.payload
      state = filter
      return state
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer