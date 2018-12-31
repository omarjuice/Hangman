import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hangmanAnimation as animate } from '../../../animations';
class Score extends Component {

    state = {
        scoreVal: null,
    }
    componentDidMount() {
        this.slideInAndFade = animate.slideInAndFade('#score')
    }
    getUserScore = () => {
        if (this.props.user) {
            return this.props.user.score
        }
    }
    componentDidUpdate({ user, incorrect }) {
        if (user) {
            let scoreIncrease = this.getUserScore() - user.score
            let scoreVal = scoreIncrease > 0 ? `+${scoreIncrease}` : null
            if (scoreVal) {
                this.setState({
                    scoreVal,
                }, () => {
                    this.slideInAndFade.restart()
                })
            }
        }
        if (typeof incorrect === 'number' && typeof this.props.incorrect === 'number' && incorrect !== 5) {
            let scoreVal = this.props.incorrect - incorrect > 0
            if (scoreVal) {
                this.setState({
                    scoreVal: 'X',
                }, () => {
                    this.slideInAndFade.restart()
                })
            }

        }

    }
    render() {
        return (
            <p id="score" className={`has-text-${this.state.scoreVal === 'X' ? 'danger' : 'success'} bold anton is-size-2`}>{this.state.scoreVal ? <span>{this.state.scoreVal}</span> : null}</p>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.room.users.filter((user) => user.name === state.room.user.name)[0],
        incorrect: state.hangman.incorrect
    }
}

export default connect(mapStateToProps, null)(Score);
