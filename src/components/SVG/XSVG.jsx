import React, { Component } from 'react';
import { connect } from 'react-redux';
import { svgAnimation as animate } from '../../animations';

class XSVG extends Component {


    componentDidUpdate = (prevProps) => {
        if (this.props.incorrect > prevProps.incorrect) {
            [document.querySelector(`#x-left-${this.props.incorrect - 1}`),
            document.querySelector(`#x-right-${this.props.incorrect - 1}`)].forEach((stroke, i) => {
                animate.drawStroke({
                    selector: stroke,
                    x1: stroke.getAttribute('x1'),
                    x2: stroke.getAttribute('x2'),
                    y1: stroke.getAttribute('y1'),
                    y2: stroke.getAttribute('y2'),
                }, i === 1)
            })
        }
    }
    renderXs = () => {
        let color = this.props.color
        return Array(this.props.incorrect).fill('x').map((x, i) => {
            return (
                <g key={`x-${i}`}>
                    <line id={`x-left-${i}`} className="x-stroke-left" x1="5" y1={i * 25 + 10} x2="20" y2={i * 25 + 25} stroke={color} strokeWidth="4"></line>
                    <line id={`x-right-${i}`} className="x-stroke-right" x1="20" y1={i * 25 + 10} x2="5" y2={i * 25 + 25} stroke={color} strokeWidth="4"></line>
                </g>
            )
        })
    }
    render() {
        return (
            <g x={this.props.x} y={this.props.y}>
                {this.renderXs()}
            </g>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        incorrect: state.hangman.incorrect
    }
}

export default connect(mapStateToProps, null)(XSVG);
