import React, { Component } from 'react';
import { connect } from 'react-redux';

class WordBlank extends Component {

    renderText = () => {
        let word = this.props.word
        let increment = (140 / word.length)
        let arr = [];
        let x = 0;
        let y = 30

        for (let i = 0; i < word.length; i++) {
            arr.push(
                <g className="word-blank" key={i}>
                    <text>
                        <tspan x={x + increment / 2} y={y}
                            style={{ fontSize: increment > 25 ? 25 : increment, fontFamily: '"Play", sans-serif' }}
                            fill={this.props.gameOver && this.props.isCorrect ? 'green' : this.props.gameOver && !this.props.isCorrect ? 'red' : 'black'}
                            textAnchor="middle">
                            {this.props.selectedLetters.includes(word[i]) || this.props.gameOver ? word[i] : '?'}
                        </tspan>
                    </text>
                    <line x1={x + increment * .05} y1={y + 2} x2={x + increment * .95} y2={y + 2} stroke="black" strokeWidth="2" />
                </g>
            )
            x += increment
        }
        return arr
    }

    render() {
        return (
            <svg id="word-blanks" width="100%" height="50%" viewBox="0 0 140 35">
                {this.renderText()}
            </svg>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        word: state.hangman.word,
        selectedLetters: state.hangman.selectedLetters,
        isCorrect: state.hangman.isCorrect,
        gameOver: state.hangman.gameOver,
    }
}
export default connect(mapStateToProps, null)(WordBlank);
