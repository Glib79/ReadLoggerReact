import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers/index';

const consoleMessages = store => next => action => {
    let result;
    result = next(action);

    return result;
}

export default (initialState={}) => {
    return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState);
}
