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
    }
    componentDidUpdate() {
        if (this.state.time && this.state.time < 6) {
            animate.blink('.blink')
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
    render() {
        let renderedTimer = this.props.svg ?
            <tspan x={this.props.x} y={this.props.y}
                className="blink"
                style={{ fill: this.state.time < 10 ? 'red' : 'black', fontFamily: '"Play", sans-serif', fontSize: this.props.fontSize }}
                textAnchor={this.props.textAnchor} >{this.state.time}</tspan>
            : <span className={`is-size-3 play blink`} style={{ color: this.state.time < 10 ? 'red' : 'black' }}>{this.state.time}</span>
        return (
            renderedTimer
        );
    }
}

export default connect(null, { skipMe, skipMaster })(Timer);
