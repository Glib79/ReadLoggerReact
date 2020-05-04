import axios from 'axios';
import wrapPromise from './wrapPromise';
import { prepareOptions } from '../config/api';

export const fetchData = (url, method='GET', data={}, headers={}) => {
  const options = prepareOptions(url, method, data, headers);
  
  const promise = axios(options)
    .then((res) => res.data);
  
  return wrapPromise(promise);
};