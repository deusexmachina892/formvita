import axios from 'axios';
import { FETCH_USER, SUBMIT_FORM, FETCH_FORMS, FETCH_FORM } from './types';


export const fetchUser = () => async dispatch => {
    try{
        const res = await axios.get('/api/v1/auth/current_user');
        return dispatch({ type: FETCH_USER, payload: res.data.user})
    } catch (err){
        return dispatch({ type: FETCH_USER, payload: err.response.data.user})
    }
  
}

export const submitForm = (formValues, id) => async dispatch => {
     const res = await axios.post('/api/v1/dashboard/forms', formValues, { headers: { 'Authorization':`user ${id}`}});
     return dispatch({ type: SUBMIT_FORM, payload: res.data.form });
}

export const fetchForms = () => async dispatch => {
    const res = await axios.get('/api/v1/dashboard/forms');
    return dispatch({ type: FETCH_FORMS, payload: res.data.forms });
}

export const fetchForm = (id) => async dispatch => {
    const res = await axios.get(`/api/v1/dashboard/forms/${id}`);
    return dispatch( { type: FETCH_FORM, payload: res.data.form });
}

export const authLogout = () => async dispatch => {
    const res = await axios.get('/api/v1/auth/logout');
    return dispatch({ type: FETCH_USER, payload: res.data.user })
}