import defaultState from './defaultState';
import { META_DATA } from '../actions/types';

export default (state = defaultState.meta, action) => {
    switch (action.type) {
        case META_DATA:
            return action.data;
        default:
            return state
    }
}