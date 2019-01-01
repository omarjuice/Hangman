import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import XSVG from './XSVG';
import { svgAnimation as animate } from '../../animations';


class ManSVG extends Component {
    constructor(props) {
        super(props);
        this.width = 150;
        this.height = 200;

    }
    componentDidMount() {

        this.rightWave = animate.wave('#right-arm', '#arc-right', 1, true, { easing: 'easeInCubic' });
        this.leftWave = animate.wave('#left-arm', '#arc-left', 1, true, { easing: 'easeInCubic' });
        this.rightWaveReverse = animate.wave('#right-arm', '#arc-right', 1, false, { direction: 'reverse', easing: 'easeOutCubic' });
        this.leftWaveReverse = animate.wave('#left-arm', '#arc-left', 1, false, { direction: 'reverse', easing: 'easeOutCubic' });
        this.leftDoor = animate.wave('#door-left', '#door-arc-left', 1, false, { easing: 'easeInOutBack' })
        this.rightDoor = animate.wave('#door-right', '#door-arc-right', 1, false, { easing: 'easeInOutBack' })
        Promise.all(
            [this.rightWave.finished,
            this.leftWave.finished]
        ).then(() => {
            this.rightWaveReverse.play()
            this.leftWaveReverse.play()

        })
    }
    componentDidUpdate(prevProps) {

        if (this.props.isChoosing && !prevProps.isChoosing) {
            this.leftWave.restart();
            this.rightWave.restart();
        }
        if (this.props.incorrect >= 5 && this.props.gameOver) {
            this.leftWaveReverse.reverse();
            this.rightWaveReverse.reverse();
            this.leftDoor.play()
            this.rightDoor.play()
            animate.fall('#body', '#fall-path', 1000)
        } else if (this.props.incorrect < 5 && this.props.gameOver) {
            this.leftWaveReverse.restart();
            this.rightWaveReverse.restart();
        }

    }
    render() {
        //directions left and right refer to hangman's perspective, not ours
        const { width, height } = this
        return (
            <svg id="hangman-svg" viewBox="0 0 150 200">
                <g id="body">
                    <g id="head">
                        <circle cx="100" cy="35" r="20" stroke="black" strokeWidth="4" fill="white" />
                        <circle cx="93" cy="30.099999999999998" r="1" stroke="black" strokeWidth="4" fill="black" />
                        <circle cx="106.9999995" cy="30.099999999999998" r="1" stroke="black" strokeWidth="4" fill="black" />
                    </g>
                    <line x1="100" y1="55.00000000000001" x2="100" y2="105" stroke="black" strokeWidth="4" />
                    <g id="legs">
                        <line x1="100" y1="105" x2="75" y2="135" stroke="black" strokeWidth="4" />
                        <line x1="100" y1="105" x2="125" y2="135" stroke="black" strokeWidth="4" />
                    </g>
                    <g id="arms">
                        <line x1="100" y1="70" x2="79.99999994999999" y2="105" stroke="black" strokeWidth="4" id="right-arm" />
                        <line x1="100" y1="70" x2="120" y2="105" stroke="black" strokeWidth="4" id="left-arm" />
                    </g>
                </g>
                <g id="hang">
                    <line x1="25" y1="0" x2="100" y2="0" stroke="black" strokeWidth="4" />
                    <line x1="100" y1="0" x2="100" y2="15" stroke="black" strokeWidth="4" />
                    <line x1="25" y1="0" x2="25" y2="150" stroke="black" strokeWidth="4" />
                    <line x1="0" y1="150" x2="70.4" y2="150" stroke="black" strokeWidth="4" />
                    <line id="door-right" x1="70.4" y1="150" x2="87" y2="150" stroke="black" strokeWidth="4" />
                    <line id="door-left" x1="131.8" y1="150" x2="87" y2="150" stroke="black" strokeWidth="4" />
                    <line x1="131.8" y1="150" x2="150" y2="150" stroke="black" strokeWidth="4" />
                </g>
                <g id="incorrect" >
                    <XSVG x="0" y="0" color={this.props.master && this.props.master.name === this.props.user ? 'green' : 'red'} />
                </g>
                <path d="M99.7,0A17612.30316,17612.30316,0,0,1,100.3,198.2" style={{ fill: 'none', stroke: 'black', strokeWidth: '0' }} id="fall-path"></path>
                <path d="M80.2,104.5A40.175389,40.175389,0,0,1,71,41.3" style={{ fill: 'none', stroke: 'black', strokeWidth: '0' }} id="arc-right"></path>
                <path d="M119.5,105.4a40.330966,40.330966,0,0,0,9.800000000000011,-64.4" style={{ fill: 'none', stroke: 'black', strokeWidth: '0' }} id="arc-left"></path>
                <path d="M100.30000000000001,149.7a28.546833473940513,28.546833473940513,0,0,1,-31.10000000000001,31.100000000000023" style={{ fill: 'none', stroke: 'black', strokeWidth: 0 }} id="door-arc-right"></path>
                <path d="M101.20000000000003,150.00000000000003a29.695768,29.695768,0,0,0,30.79999999999997,31.399999999999977" style={{ fill: 'none', stroke: 'black', strokeWidth: 0 }} id="door-arc-left"></path>
                < g>
                    <text>
                        {this.props.myTurn && !this.props.isChoosing && !this.props.gameOver && this.props.master.name ?
                            <Timer x={width * 5 / 12} y={height * 5 / 12} fontSize={height * .2} textAnchor="middle" svg={true} time={10} />
                            : null}
                    </text>
                    <text>
                        {/* <tspan x={width * .5} y={height * .9} style={{ fill: 'black', fontSize: height * .1 }} textAnchor="middle">
                            {this.props.currentTurn && this.props.master.name && !this.props.isChoosing ? this.props.myTurn ? `Your turn, ${this.props.user}!` : `Waiting for ${this.props.currentTurn}...` : null}
                        </tspan> */}
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
        isChoosing: state.hangman.isChoosing,
        myTurn: state.hangman.myTurn,
        gameOver: state.hangman.gameOver,
        skip: state.hangman.skip,
        incorrect: state.hangman.incorrect,
    }
}
export default connect(mapStateToProps)(ManSVG);
