import React, { Component } from 'react';
import { connect } from 'react-redux';
import { skipMe, skipMaster } from '../../actions';
import { hangmanAnimation as animate } from '../../animations';

class Timer extends Component {
    state = {
        time: null,
        timer: null
    }
    componentDidMount() {

        this.setState({
            time: this.props.time,
            timer: this.getTimer()
        }, () => {

        })
        this.blink = animate.blink('.blink')
    }
    getUserScore = () => {
        if (this.props.user) {
            return this.props.user.score
        }
    }
    componentDidUpdate({ user, incorrect }) {
        if (this.state.time && this.state.time < 6) {
            this.blink.play()
        }
        if (user) {
            let scoreIncrease = this.getUserScore() - user.score
            let incorrectIncrease = this.props.incorrect - incorrect
            let scoreVal = scoreIncrease > 0 || incorrectIncrease > 0
            if (scoreVal) {
                this.blink.pause()
                this.setState({
                    time: 60,
                })
            }
        }
    }
    getTimer() {
        return setInterval(() => {
            if (this.state.time === 0) {
                clearInterval(this.state.timer)
                this.setState({
                    timer: null,
                    time: null
                })
                this.setState({
                    timer: this.getTimer(),
                    time: this.props.time
                })
                if (this.props.svg) {
                    return this.props.skipMe()
                }
                if (this.props.masterTimer) {
                    return this.props.skipMaster()
                }
            } else {
                return this.setState({
                    time: this.state.time - 1
                })
            }
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
        this.blink.pause()
    }
    render() {
        let renderedTimer = this.props.svg ?
            <tspan x={this.props.x} y={this.props.y}
                className={this.state.time < 7 ? 'blink' : null}
                style={{ fill: this.state.time < 10 ? 'red' : 'black', fontFamily: '"Play", sans-serif', fontSize: this.props.fontSize }}
                textAnchor={this.props.textAnchor} >{this.state.time}</tspan>
            : <span className={`is-size-3 play ${this.state.time < 7 ? 'blink' : null}`} style={{ color: this.state.time < 10 ? 'red' : 'black' }}>{this.state.time}</span>
        return (
            renderedTimer
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.room.users.filter((user) => user.name === state.room.user.name)[0],
        incorrect: state.hangman.incorrect
    }
}
export default connect(mapStateToProps, { skipMe, skipMaster })(Timer);
