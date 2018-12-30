import React, { Component } from 'react';
import { homepageAnimation as animate } from '../../animations';

class Title extends Component {
    // renderSVG(){
    //     const svgArr = [];
    // }
    componentDidMount() {
        animate.glitch('#title')
    }
    render() {
        let color1 = this.props.colors.primary,
            color2 = this.props.colors.secondary,
            color3 = this.props.colors.tertiary
        return (

            <svg viewBox="0 0 140 35">
                <text id={`${this.props.componentId}-tertiary`}>
                    <tspan x="70" y="35" style={{ fill: color3, fontFamily: '"Anton", sans-serif', fontSize: 35 }} textAnchor="middle" >
                        {this.props.text}
                    </tspan>

                </text>
                <text id={`${this.props.componentId}-secondary`}>
                    <tspan x="70" y="35" style={{ fill: color2, fontFamily: '"Anton", sans-serif', fontSize: 35 }} textAnchor="middle" >
                        {this.props.text}
                    </tspan>

                </text>
                <text id={this.props.componentId}>
                    <tspan x="70" y="35" style={{ fill: color1, fontFamily: '"Anton", sans-serif', fontSize: 35 }} textAnchor="middle" >
                        HANGMAN
                    </tspan>

                </text>

            </svg>

        );
    }
}

export default Title;
