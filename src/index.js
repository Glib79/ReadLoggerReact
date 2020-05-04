import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import initialData from './config/initialState';
import storeFactory from './redux/store';
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';
import { addMessage } from './redux/actions/messages';
import { logout } from './redux/actions/user';
import App from './components/App';
import translations from './l10n/translations';
import { registerLocale } from  "react-datepicker";
import pl from 'date-fns/locale/pl';
import * as serviceWorker from './serviceWorker';

const initialState = (initialData) => {
  const store =  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {version: 0};

  if (store.version < initialData.version) {
    return initialData;
  }
  
  return store;
};

const saveState = () => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
};

const handleError = error => {
  if (error.error && error.error.response && error.error.response.status === 401) {
    store.dispatch(
      logout()
    );
  } else {
    store.dispatch(
      addMessage(error.message, 'danger')
    );
  }
};

const store = storeFactory(initialState(initialData));
store.subscribe(saveState);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));

window.addEventListener('error', handleError);

registerLocale('pl', pl);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
