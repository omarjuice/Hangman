import defaultState from './defaultState';
import { NEW_MESSAGE } from '../actions/types';

export default (state = defaultState.chat, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            return { ...state, messages: action.messageList };
        default:
            return state
    }
}