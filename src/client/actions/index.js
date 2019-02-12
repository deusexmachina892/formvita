import axios from 'axios';
import { FETCH_USER, SUBMIT_FORM } from './types';


export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/v1/auth/current_user');
    return dispatch({ type: FETCH_USER, payload: res.data.user})
}

export const submitForm = (formValues) => async dispatch => {
    
}