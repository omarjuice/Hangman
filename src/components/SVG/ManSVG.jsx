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
        setTimeout(() => {
            animate.draw('#draw-path path').finished.then(() => {
                try {
                    document.getElementById('body').style.opacity = 1;
                    document.getElementById('hang').style.opacity = 1;
                    document.getElementById('draw-path').style.opacity = 0
                } catch (e) { }
                try {
                    animate.eyeBlink('#head ellipse')
                    let rightWave = animate.wave('#right-arm', '#arc-right', 1, true, { easing: 'easeInCubic' });
                    let leftWave = animate.wave('#left-arm', '#arc-left', 1, true, { easing: 'easeInCubic' });
                    let rightWaveReverse = animate.wave('#right-arm', '#arc-right', 1, false, { direction: 'reverse', easing: 'easeOutCubic' });
                    let leftWaveReverse = animate.wave('#left-arm', '#arc-left', 1, false, { direction: 'reverse', easing: 'easeOutCubic' });

                    Promise.all(
                        [rightWave.finished,
                        leftWave.finished]
                    ).then(() => {
                        rightWaveReverse.play()
                        leftWaveReverse.play()

                    })
                } catch (e) { }


            })
        }, 200)
    }
    componentDidUpdate(prevProps) {

        if (this.props.isChoosing && !prevProps.isChoosing) {
            animate.wave('#right-arm', '#arc-right', 1, true, { easing: 'easeInCubic' });
            animate.wave('#left-arm', '#arc-left', 1, true, { easing: 'easeInCubic' });
        }
        if (this.props.incorrect >= 5 && this.props.gameOver) {
            animate.wave('#door-left', '#door-arc-left', 1, false, { easing: 'easeInOutBack' }).play()
            animate.wave('#door-right', '#door-arc-right', 1, false, { easing: 'easeInOutBack' }).play()
            animate.eyeMovement('#head ellipse')

            animate.fall('#body', '#fall-path', 1500)
        } else if (this.props.incorrect < 5 && this.props.gameOver) {
            animate.wave('#right-arm', '#arc-right', 1, false, { direction: 'reverse', easing: 'easeOutCubic' }).restart();
            animate.wave('#left-arm', '#arc-left', 1, false, { direction: 'reverse', easing: 'easeOutCubic' }).restart();
        }

    }
    componentWillUnmount() {
        document.getElementById('body').style.opacity = 0;
        document.getElementById('hang').style.opacity = 0;
        document.getElementById('draw-path').style.opacity = 1
    }
    render() {
        //directions left and right refer to hangman's perspective, not ours
        const { width, height } = this
        return (
            <svg id="hangman-svg" viewBox="0 0 150 200" >
                <g id="body" style={{ opacity: 0 }}>
                    <g id="head">
                        <circle cx="100" cy="35" r="20" stroke="black" strokeWidth="4" fill="white" />
                        <ellipse cx="93" cy="31" rx="1.5" ry="0" stroke="black" strokeWidth="4" fill="black" />
                        <ellipse cx="106.9999995" cy="31" rx="1.5" ry="0" stroke="black" strokeWidth="4" fill="black" />
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
                <g id="hang" style={{ opacity: 0 }}>
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
                <g id="draw-path">
                    <path d="M-0.000045776367187500054,149.59115115239797a7757.653107,7757.653107,0,0,0,149.2991565454786,0" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e2_circleArc"></path>
                    <path d="M24.88312674821077,149.59115898842077a7960.346621810846,7960.346621810846,0,0,0,0,-149.64965737471442" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e3_circleArc"></path>
                    <path d="M24.532659166536973,0.29196919538015464a8575.208967,8575.208967,0,0,0,75.35053005986788,3.552713678800501e-15" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e4_circleArc"></path>
                    <path d="M99.88318922640485,-0.05849838629364615a8017.099184,8017.099184,0,0,0,0,15.07010601197358" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e5_circleArc"></path>
                    <path d="M99.53272164473107,14.661140044006128a20.200062,20.200062,0,1,0,0.7009351633476371,0" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0, fill: '#ecf0f1 ' }} id="e7_circleArc"></path>
                    <path d="M99.88318922640484,55.31537951816741a1084.937941,1084.937941,0,0,1,2.842170943040401e-14,49.76639659768022" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e8_circleArc"></path>
                    <path d="M100.2336568080787,70.0350179484672a36175.742371,36175.742371,0,0,1,-19.976652155406867,34.696290585706606" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e9_circleArc"></path>
                    <path d="M100.2336568080787,70.7359531118148a1499.0900539256015,1499.0900539256015,0,0,1,19.626184573732985,34.34582300403282" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e10_circleArc"></path>
                    <path d="M99.88318922640485,105.08177611584762a1251.7493332778943,1251.7493332778943,0,0,0,-24.53273071716626,29.439276860599563" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e11_circleArc"></path>
                    <path d="M99.88318922640485,105.43224369752141a411.4713278793467,411.4713278793467,0,0,1,24.883198298840128,29.78974444227336" strokeDasharray="500px" style={{ stroke: 'black', strokeWidth: 4, strokeDashoffset: '600px', opacity: 0 }} id="e13_circleArc"></path>
                </g>
                < g>

                    <text>
                        {this.props.myTurn && !this.props.isChoosing && !this.props.gameOver && this.props.master.name ?
                            <Timer x={width * 5 / 12} y={height * 5 / 12} fontSize={height * .2} textAnchor="middle" svg={true} time={60} />
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
