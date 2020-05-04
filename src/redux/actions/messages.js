import C from './constants';

export const addMessage = (message, type) => 
  ({
    type: C.ADD_MESSAGE,
    payload: {message: message, type: type}
  })

export const clearMessage = (index) => 
  ({
    type: C.CLEAR_MESSAGE,
    payload: index
  })
