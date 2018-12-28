import defaultState from './defaultState';
import { ERROR, } from '../actions/types';

export default (state = defaultState.error, action) => {
    switch (action.type) {
        case ERROR:
            return action.error;
        default:
            return state
    }
}