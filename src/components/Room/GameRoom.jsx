import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat/Chat';
import UserList from './Chat/UserList';
import history from '../../history';
import Screen from './Hangman/Screen';
import { newMasterListener, wordSetListener } from '../../actions/index';
const toggleMenu = () => {
    document.querySelector('.navbar-burger').classList.toggle('is-active')
    document.querySelector('#user-list').classList.toggle('is-active')
}
class ChatRoom extends Component {
    componentDidMount() {
        document.getElementById('css-load').setAttribute('href', 'chatStyle.css')
        if (!this.props.room) {
            return history.push('/')
        }
        this.props.newMasterListener()
        this.props.wordSetListener()
    }
    render() {
        return (
            <div className="columns is-multiline">
                <Screen />
                {this.props.connection ? '' : 'No Room'}
                <UserList toggleMenu={toggleMenu} />
                <Chat toggleMenu={toggleMenu} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        connection: state.connection,
        room: state.room.roomName
    })
}



export default connect(mapStateToProps, { newMasterListener, wordSetListener })(ChatRoom);
