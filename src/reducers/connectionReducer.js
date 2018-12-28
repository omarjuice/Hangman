import { CONNECT, DISCONNECT } from '../actions/types';
import defaultState from './defaultState';

export default (state = defaultState.connected, action) => {
    switch (action.type) {
        case CONNECT:
            return action.connected;
        case DISCONNECT:
            return false;
        default:
            return state
    }
}