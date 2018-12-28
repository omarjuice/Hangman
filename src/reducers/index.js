import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import connectionReducer from './connectionReducer';
import chatReducer from './chatReducer';
import roomReducer from './roomReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import metaReducer from './metaReducer';
import hangmanReducer from './hangmanReducers';

export default combineReducers({
    connection: connectionReducer,
    chat: chatReducer,
    room: roomReducer,
    error: errorReducer,
    loading: loadingReducer,
    meta: metaReducer,
    form: formReducer.plugin({
        MessageForm: (state, action) => {
            switch (action.type) {
                case '@@redux-form/SET_SUBMIT_SUCCEEDED':
                    return undefined;
                default:
                    return state
            }
        }
    }),
    hangman: hangmanReducer
})
