const reducer = (state='', action) => {
  switch(action.type) {
    case 'CHANGE': {
      state = action.payload.filter
      return state
    }
    default:
      return state
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'CHANGE',
    payload: {
      filter
    }
  }
}

export default reducer