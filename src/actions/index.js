import io from 'socket.io-client';
import axios from 'axios';
import {
    CONNECT,
    DISCONNECT,
    NEW_MESSAGE,
    CREATE_MESSAGE,
    ERROR,
    LOADING,
    CANCEL_LOAD,
    UPDATE_LIST,
    NEW_USER,
    META_DATA,
    LETTER_SELECTED,
    NEW_MASTER,
    NEW_WORD,
    MY_TURN,
    NEW_GAME
} from './types';
import history from '../history';
;
// Types not declared in 'types.js' are dummies for uniformity with redux
const socket = io('http://localhost:3001/')

export const bootServer = () => dispatch => {
    dispatch({
        type: LOADING
    })
    return axios.get('http://localhost:3001/')
        .then(() => {

        }).catch(() => {
            dispatch({
                type: CANCEL_LOAD
            })
            dispatch({
                type: ERROR,
                error: {
                    exists: true,
                    message: 'Server error'
                }
            })
        })
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
        type: CREATE_MESSAGE
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
        console.log(err)
        dispatch({
            type: ERROR,
            error: {
                exists: true,
                message: err
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
export const joinSuccess = () => (dispatch, getState) => {
    socket.on('joinSuccess', ({ name, room, id, score }) => {

        dispatch({
            type: CANCEL_LOAD
        })
        dispatch({
            type: NEW_USER,
            user: {
                name, id, score
            },
            room: room
        })
        history.push(`/${room}`)
        socket.emit('createMessage', {
            from: 'Admin',
            text: `Welcome to ${room}, ${name}`,
            room: getState().room.roomName
        })
        dispatch({
            type: CREATE_MESSAGE
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
    return () => {
        if (getState().hangman.myTurn) {
            socket.emit('selectingLetter', { letter, room: getState().room.roomName })
            dispatch({
                type: 'SELECTING_LETTER'
            })
        }
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
        type: 'WORD_CHOSEN',
    })
}
export const wordSetListener = () => (dispatch, getState) => {
    socket.on('wordSet', (game) => {
        dispatch({
            type: NEW_WORD,
            game
        })
        socket.emit('selectingLetter', { letter: null, room: getState().room.roomName })
    })
}
export const nextTurnListener = () => (dispatch, getState) => {
    socket.on('nextTurn', (game) => {
        const myName = getState().room.user.name

        if (myName && game.turn.name === myName) {
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
// export const newGame = () => (dispatch, getState) => {
//     socket.emit('requestNewGame', getState().room.roomName)
//     dispatch({
//         type: 'REQUEST_NEW_GAME'
//     })
// }
export const newGameListener = () => (dispatch, getState) => {
    socket.on('newGame', game => {
        dispatch({
            type: NEW_GAME,
            game
        })
        socket.emit('isItMyTurn', getState().room.roomName)
    })
}