import defaultState from './defaultState';
import { NEW_USER, UPDATE_LIST } from '../actions/types';

export default (state = defaultState.room, action) => {
    switch (action.type) {
        case NEW_USER:
            return { ...state, user: action.user, roomName: action.room };
        case UPDATE_LIST:
            return { ...state, users: action.payload };
        default:
            return state
    }
}