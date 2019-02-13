import { SUBMIT_FORM, FETCH_FORMS, FETCH_FORM } from '../actions/types';

const INITIAL_STATE = {
    allownforms: {},
    currentform: {},
    submitted: {},
    errMessage: '',
    loading: true
}

export default function (state=INITIAL_STATE, action){
    switch(action.type){
        case SUBMIT_FORM:
          return { ...state, submitted: action.payload, loading: false };
        case FETCH_FORMS:
          return { ...state, allownforms: action.payload, loading: false };
        case FETCH_FORM:
          return { ...state, currentform: action.payload, loading: false };
        default:
          return state;
    }
}