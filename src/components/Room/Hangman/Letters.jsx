import React, { Component } from 'react';
import { connect } from 'react-redux';
import { letterSelected, letterListener } from '../../../actions/index';

class Letters extends Component {
    componentDidMount() {
        this.props.letterSelected()()
    }
    componentDidUpdate() {
        if (this.props.gameOver) {
            setTimeout(this.props.letterSelected(), 2000)
        }
    }
    renderLetterButtons() {
        return this.props.remainingLetters.map((letter) => {
            return (
                <p key={letter} onClick={this.props.letterSelected(letter)} className="button play letter">{letter}</p>
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
        gameOver: state.hangman.gameOver
    }
}

export default connect(mapStateToProps, { letterSelected, letterListener })(Letters);
