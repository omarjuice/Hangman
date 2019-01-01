import io from 'socket.io-client';
import {
    CONNECT,
    DISCONNECT,
    NEW_MESSAGE,
    ERROR,
    LOADING,
    CANCEL_LOAD,
    UPDATE_LIST,
    ASK_FOR_DICT,
    NEW_USER,
    META_DATA,
    LETTER_SELECTED,
    NEW_MASTER,
    NEW_WORD,
    WORD_INFO,
    MY_TURN,

} from './types';
import history from '../history';
;
// Types not declared in 'types.js' are dummies for uniformity with redux
const socket = io('http://localhost:3001/')
// const socket = io('https://hangman-oj.herokuapp.com/')

export const bootServer = () => dispatch => {
    dispatch({
        type: LOADING
    })

    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3001/', true);
    // request.open('GET', 'https://hangman-oj.herokuapp.com/', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {

        } else {
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Server error'
                }
            })
            dispatch({
                type: CANCEL_LOAD
            })
        }
    };
    request.onerror = function () {
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message: 'Server error'
            }
        })
        dispatch({
            type: CANCEL_LOAD
        })
    };

    request.send();
}
export const serverError = () => dispatch => {
    dispatch({
        type: ERROR,
        error: {
            exists: true,
            message: 'Server error'
        }
    })
}
export const createConnection = () => dispatch => {
    socket.on('connect', () => {
        dispatch({
            type: CONNECT,
            connected: socket.connected
        })
        dispatch({
            type: CANCEL_LOAD
        })
    })
}
export const createMessage = (text) => (dispatch, getState) => {
    socket.emit('createMessage', {
        from: getState().room.user.name,
        room: getState().room.roomName,
        text
    })
    dispatch({
        type: 'CREATE_MESSAGE'
    })
}
export const newMessageListener = () => dispatch => {
    socket.on('newMessage', (messageList) => {
        dispatch({
            type: NEW_MESSAGE,
            messageList
        })
    })
}
export const initiateJoin = ({ name, room }) => dispatch => {
    socket.emit('join', { name, room }, (err) => {
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message: err.message
            }
        })
        dispatch({
            type: CANCEL_LOAD
        })
    })
    dispatch({
        type: LOADING
    })
}
export const askForDictListener = () => dispatch => {
    socket.on('askForDict', ({ name, room }) => {
        dispatch({
            type: ASK_FOR_DICT,
            room, name, dictionary: 'None'
        })
        dispatch({
            type: CANCEL_LOAD
        })
    })
}
export const submitDict = (dictionary) => (dispatch, getState) => {
    socket.emit('join', {
        name: getState().room.user.name,
        room: getState().room.roomName,
        dictionary
    })
    dispatch({
        type: LOADING
    })
}
export const joinSuccess = () => (dispatch, getState) => {
    socket.on('joinSuccess', ([{ name, room, id, score }, dictionary]) => {

        dispatch({
            type: CANCEL_LOAD
        })
        dispatch({
            type: NEW_USER,
            user: {
                name, id, score
            },
            room,
            dictionary
        })
        history.push(`/Hangman/${room}`)
        socket.emit('createMessage', {
            from: 'Admin',
            text: `Welcome to ${room}, ${name}!`,
            room: getState().room.roomName
        })
        dispatch({
            type: 'CREATE_MESSAGE'
        })
        dispatch({
            type: ERROR,
            error: {
                exists: false,
                message: ''
            }
        })
    })

}
export const updateUserListener = () => dispatch => {
    socket.on('updateUserList', ({ userList }) => {
        dispatch({
            type: UPDATE_LIST,
            payload: userList
        })
    })
}
export const errorListener = () => dispatch => {
    socket.on('errorMessage', (message) => {
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message
            }
        })
        dispatch({
            type: CANCEL_LOAD
        })
    })
}
export const cancelError = () => dispatch => {
    console.log('canceled');
    dispatch({
        type: ERROR,
        error: {
            exists: false,
            message: ''
        }
    })
}

export const disconnectListener = () => dispatch => {
    socket.on('disconnect', () => {
        dispatch({
            type: DISCONNECT
        })
    })
}
export const getUserMetaData = () => dispatch => {
    socket.on('updateMetaData', (data) => {
        dispatch({
            type: META_DATA,
            data
        })
    })
}
export const letterSelected = (letter) => (dispatch, getState) => {

    if (getState().hangman.myTurn) {
        socket.emit('selectingLetter', { letter, room: getState().room.roomName })
        dispatch({
            type: 'SELECTING_LETTER'
        })
    }

}
export const letterListener = () => (dispatch, getState) => {
    socket.on('letterSelected', (game) => {
        dispatch({
            type: LETTER_SELECTED,
            game
        })
        socket.emit('isItMyTurn', getState().room.roomName)
    })
}
export const newMasterListener = () => dispatch => {
    socket.on('newMaster', (game) => {
        dispatch({
            type: NEW_MASTER,
            game
        })
    })
}
export const newWord = ({ word, hint }) => (dispatch, getState) => {
    socket.emit('newWord', { word, hint, room: getState().room.roomName })
    dispatch({
        type: 'WORD_CHOSEN'
    })
    dispatch({
        type: LOADING
    })
}
export const wordSetListener = () => (dispatch, getState) => {
    socket.on('wordSet', (game) => {
        dispatch({
            type: NEW_WORD,
            game
        })
        dispatch({
            type: CANCEL_LOAD
        })
        socket.emit('selectingLetter', { letter: null, room: getState().room.roomName })
    })
}
export const wordInfoListener = () => (dispatch) => {
    socket.on('wordInfo', (info) => {
        dispatch({
            type: CANCEL_LOAD
        })
        dispatch({
            type: WORD_INFO, info
        })
    })
}
export const nextTurnListener = () => (dispatch, getState) => {
    socket.on('nextTurn', (game) => {
        const myName = getState().room.user.name

        if (myName && game.turn.name && game.turn.name === myName) {
            dispatch({
                type: MY_TURN,
                myTurn: true,
                game
            })
        } else {
            dispatch({
                type: MY_TURN,
                myTurn: false,
                game
            })
        }
    })
}
export const skipMe = () => (dispatch, getState) => {
    socket.emit('skipMyTurn', getState().room.roomName)
    dispatch({
        type: 'SKIP'
    })
}
export const skipMaster = () => (dispatch, getState) => {
    socket.emit('skipMaster', getState().room.roomName)
    dispatch({
        type: 'SKIP_MASTER'
    })
}