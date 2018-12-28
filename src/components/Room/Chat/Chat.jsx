import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessageListener } from '../../../actions';
import MessageForm from './MessageForm';
import Score from '../Hangman/Score';

class Chat extends Component {


    componentDidMount() {
        this.props.newMessageListener()
    }
    componentDidUpdate() {
        const messages = document.querySelectorAll('.chat-message')

        if (messages.length > 0) {
            const last = messages[messages.length - 1]
            last.scrollIntoView()
        }

    }
    renderMessages() {
        let messagesList = document.querySelector('.messages-container')
        if (messagesList && !messagesList.classList.contains('is-active')) {
            document.querySelector('.fa-comment').classList.add('new')
        }
        return this.props.chat.messages.map(({ from, text, createdAt }, i) => {
            const { name } = this.props.user
            let fromMe = from === name
            let fromLabel = <strong>{fromMe ? 'me' : from}{from === 'Admin' ? <span className="icon"><i className="fas fa-star"></i></span> : ''}</strong>
            let className = fromMe ? 'speech-bubble-right' : 'speech-bubble-left'
            return (<li key={i} className="list-item chat-message">
                <div className={fromMe ? 'message-sender-right' : 'message-sender-left'}>
                    {fromLabel}
                </div>
                <div className={className}>
                    <div className="message-text">
                        <div className="content has-text-light">{text}</div>
                    </div>
                </div>
                <span className={from === name ? 'is-size-7 timestamp-right' : 'is-size-7 timestamp-left'}>{createdAt}</span>

            </li>
            )
        })
    }
    toggleChat = () => {
        let messageListClass = document.querySelector('.messages-container').classList
        let messagesIcon = document.querySelector('.fa-comment').classList
        messageListClass.toggle('is-active');
        messagesIcon.remove('new')

    }
    render() {
        return (
            <div className="column is-9 is-full-mobile chat-container">
                <Score />
                <button onClick={this.props.toggleMenu} className="navbar-burger is-pulled-left has-text-black" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                <p onClick={this.toggleChat} id="chat-button"><span className="icon has-text-dark"><i className="fas fa-comment fa-lg fa-flip-horizontal new"></i></span></p>
                <ul className="messages-container list has-background-dark">
                    {/* <li className="list-item"></li>
                    <li className="list-item"></li>
                    <li className="list-item"></li> */}

                    {this.renderMessages()}
                    {/* <li className="list-item"></li>
                    <li className="list-item"></li> */}
                    <li className="list-item"></li>

                </ul>


                <MessageForm />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.chat,
        user: state.room.user
    }
}

export default connect(mapStateToProps, { newMessageListener })(Chat);
