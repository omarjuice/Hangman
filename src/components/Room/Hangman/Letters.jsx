import React, { Component } from 'react';
import { connect } from 'react-redux';
import { letterSelected, letterListener } from '../../../actions/index';
import { hangmanAnimation as animate } from '../../../animations';

class Letters extends Component {

    componentDidMount() {
        this.props.letterSelected()
    }

    selectLetter = (letter) => () => {
        if (!this.props.gameOver && this.props.myTurn) {
            animate.shrinkToNothing(`#letter-${letter}`).finished.then(() => this.props.letterSelected(letter))
        }
    }
    renderLetterButtons = () => {
        return this.props.remainingLetters.map((letter) => {
            return (
                <p key={letter} id={`letter-${letter}`} onClick={this.selectLetter(letter)} className={`button play letter ${this.props.myTurn ? 'glow' : null}`}>{letter}</p>
            )
        })
    }
    render() {
        return (
            <div style={{ margin: 0, padding: 0 }}>
                {this.renderLetterButtons()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        remainingLetters: state.hangman.remainingLetters,
        gameOver: state.hangman.gameOver,
        myTurn: state.hangman.myTurn

    }
}

export default connect(mapStateToProps, { letterSelected, letterListener })(Letters);
