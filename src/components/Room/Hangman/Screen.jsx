import React, { Component } from 'react';
import { connect } from 'react-redux';
import { letterListener } from '../../../actions';
import Waiting from './Waiting';
import Hangman from './Hangman';
import GameInit from './GameInit';
import { newMasterListener } from '../../../actions/index';


class Screen extends Component {
    componentDidMount() {
        this.props.letterListener()
        this.props.newMasterListener()
    }
    handleScreenClick() {
        document.querySelector('.fa-comment').classList.remove('is-active')
        document.querySelector('.messages-container').classList.remove('is-active')
        document.querySelector('.navbar-burger').classList.remove('is-active')
        document.querySelector('#user-list').classList.remove('is-active')
    }
    renderScreen = () => {
        if (this.props.numUsers < 2) {
            return <Waiting />
        } else if (this.props.isChoosing) {
            if (this.props.master.name === this.props.user.name) {
                return <GameInit />
            }
            return <Waiting />
        }
        return <Hangman />
    }
    render() {
        return (
            <div id="hangman" className="column is-9">
                <div className={`box screen has-background-light`} onClick={this.handleScreenClick}>
                    <div className="columns is-centered has-text-dark has-text-centered">

                        {this.renderScreen()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        numUsers: state.room.users.length,
        isChoosing: state.hangman.isChoosing,
        master: state.hangman.master,
        user: state.room.user,
        gameOver: state.hangman.gameOver,
    }
}

export default connect(mapStateToProps, { letterListener, newMasterListener })(Screen);
