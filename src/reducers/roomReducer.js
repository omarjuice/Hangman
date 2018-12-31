import defaultState from './defaultState';
import { NEW_USER, UPDATE_LIST, ASK_FOR_DICT } from '../actions/types';

export default (state = defaultState.room, action) => {
    switch (action.type) {
        case ASK_FOR_DICT:
            return { ...state, user: { ...state.user, name: action.name }, roomName: action.room, dictionary: action.dictionary }
        case NEW_USER:
            return { ...state, user: action.user, roomName: action.room, dictionary: action.dictionary };
        case UPDATE_LIST:
            return { ...state, users: action.payload };
        default:
            return state
    }
}