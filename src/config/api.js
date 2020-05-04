import { logout } from '../redux/actions/user';
import { addMessage } from '../redux/actions/messages';

export const prepareOptions = (url, method='GET', data={}, headers={}) => {
  if (headers.token) {
    let token = headers.token;
    delete headers.token;
    
    headers = {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  
  return {
    url: `http://localhost${url}`, 
    method: method,
    headers: {
      ...headers,
      'Content-Type': 'application/json' 
    },
    data: data
  };
};

export const handleErrors = (error) => dispatch => {
  let message;
  
  if (error.response) {
    if (error.response.status === 401) {
        dispatch(
          logout()
        );
    }
        
    message = error.response.data.message || '';
  }
      
  if (!message) {
    message = error.message;
  }
  
  dispatch(
    addMessage(message, 'danger')
  );
};
