export default {
    connected: false,
    chat: {
        messages: []
    },
    room: {
        roomName: '',
        user: {},
        users: []
    },
    error: {
        exists: false,
        message: ''
    },
    loading: false,
    meta: [],
    hangman: {
        master: {},
        isChoosing: false,
        word: [],
        hint: '',
        myTurn: false,
        remainingLetters: [],
        selectedLetters: [],
        numGames: 0,
        turn: {
            name: ''
        },
        isCorrect: false,
        incorrect: 0,
        gameOver: false
    }
}