import defaultState from './defaultState';
import { LOADING, CANCEL_LOAD } from '../actions/types';

export default (state = defaultState.loading, action) => {
    switch (action.type) {
        case LOADING:
            return true;
        case CANCEL_LOAD:
            return false;
        default:
            return state
    }
}