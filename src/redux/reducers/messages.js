import C from '../actions/constants'

const messages = (state=[], action) => {
  switch(action.type) {
    case C.ADD_MESSAGE :
      return [
        ...state,
        action.payload
      ]
    case C.CLEAR_MESSAGE : 
      return state.filter((message, i) => i !== action.payload)
    default: 
      return state
  }
}

export default messages;
