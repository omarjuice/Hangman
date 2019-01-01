import defaultState from './defaultState';
import { LETTER_SELECTED, NEW_MASTER, NEW_WORD, MY_TURN, WORD_INFO } from '../actions/types';
export default (state = defaultState.hangman, action) => {
    switch (action.type) {
        case NEW_MASTER:
            return {
                ...state,
                ...action.game
            };
        case NEW_WORD:
            return {
                ...state,
                ...action.game, info: false
            }
        case WORD_INFO:
            return {
                ...state,
                info: action.info
            }
        case MY_TURN:
            return {
                ...state,
                myTurn: action.myTurn,
                ...action.game
            }
        case LETTER_SELECTED:
            return {
                ...state,
                ...action.game
            };
        default:
            return state
    }
}
