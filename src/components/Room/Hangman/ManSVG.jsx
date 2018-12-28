import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManSVG extends Component {
    render() {
        let width = 150;
        let height = 200;
        //DO NOT CHANGE BELOW
        let viewBox = `0 0 ${width} ${height}`
        //DO NOT CHANGE SVG PARAMS
        return (
            <svg id="hangman-svg" viewBox={viewBox}>
                <g id="body">
                    <g id="head">
                        <circle cx={width * 2 / 3} cy={height * .175} r={height / 10} stroke="black" strokeWidth="4" fill="white" />
                        <circle cx={width * .62} cy={height * .1505} r={height / 200} stroke="black" strokeWidth="4" fill="black" />
                        <circle cx={width * .71333333} cy={height * .1505} r={height / 200} stroke="black" strokeWidth="4" fill="black" />
                    </g>
                    <line x1={width * 2 / 3} y1={height * .275} x2={width * 2 / 3} y2={height * .525} stroke="black" strokeWidth="4" />
                    <g id="legs">
                        <line x1={width * 2 / 3} y1={height * .525} x2={width / 2} y2={height * .675} stroke="black" strokeWidth="4" />
                        <line x1={width * 2 / 3} y1={height * .525} x2={width * 5 / 6} y2={height * .675} stroke="black" strokeWidth="4" />
                    </g>
                    <g id="arms">
                        <line x1={width * 2 / 3} y1={height * .35} x2={width * .533333333} y2={height * .525} stroke="black" strokeWidth="4" />
                        <line x1={width * 2 / 3} y1={height * .35} x2={width * .8} y2={height * .525} stroke="black" strokeWidth="4" />
                    </g>
                </g>
                <g id="hang">
                    <line x1={width / 6} y1={height * 0} x2={width * 2 / 3} y2={height * 0} stroke="black" strokeWidth="4" />
                    <line x1={width * 2 / 3} y1={height * 0} x2={width * 2 / 3} y2={height * .075} stroke="black" strokeWidth="4" />
                    <line x1={width / 6} y1={height * 0} x2={width / 6} y2={height * .75} stroke="black" strokeWidth="4" />
                    <line x1={width * 0} y1={height * .75} x2={width} y2={height * .75} stroke="black" strokeWidth="4" />
                </g>
                < g>
                    <text>
                        <tspan x={width * .5} y={height * .9} style={{ fill: 'black', fontSize: height * .1 }} textAnchor="middle">
                            {this.props.currentTurn && this.props.master.name && !this.props.isChoosing ? this.props.currentTurn === this.props.user ? `Your turn, ${this.props.user}!` : `Waiting for ${this.props.currentTurn}...` : null}
                        </tspan>
                    </text>
                </g>

            </svg>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentTurn: state.hangman.turn.name,
        user: state.room.user.name,
        master: state.hangman.master,
        isChoosing: state.hangman.isChoosing
    }
}
export default connect(mapStateToProps)(ManSVG);
