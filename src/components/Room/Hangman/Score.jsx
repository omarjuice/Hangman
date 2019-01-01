import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hangmanAnimation as animate } from '../../../animations';
class Score extends Component {

    state = {
        scoreVal: null,
        timeout: null
    }
    componentDidMount() {
        this.slideInAndFade = animate.slideInAndFade('#score')
    }
    getUserScore = () => {
        if (this.props.user) {
            return this.props.user.score
        }
    }
    componentDidUpdate({ user }) {
        if (user) {
            let scoreIncrease = this.getUserScore() - user.score
            let scoreVal = scoreIncrease > 0 ? `+${scoreIncrease}` : null
            if (scoreVal) {
                this.setState({
                    scoreVal,
                    timeout: setTimeout(() => {
                        this.setState({
                            scoreVal: null,
                            timeout: null
                        })
                    }, 1000)
                }, () => {
                    this.slideInAndFade.restart()
                })
            }
        }


    }
    render() {
        return (
            <p id="score" className="has-text-success bold anton is-size-2">{this.state.scoreVal ? <span>{this.state.scoreVal}</span> : null}</p>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.room.users.filter((user) => user.name === state.room.user.name)[0],
        myTurn: state.hangman.myTurn
    }
}

export default connect(mapStateToProps, null)(Score);
