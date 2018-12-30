import React, { Component } from 'react';
import { hangmanAnimation as animate } from '../../animations';

class Ellipsis extends Component {
    componentDidMount() {
        animate.ellipsis(document.getElementById('ellipsis').childNodes)
    }
    render() {
        return (
            <svg id="ellipsis" viewBox="0 0 90 65">
                <circle cx="17" cy="55" r="10" fill="hsl(0, 0%, 21%)"></circle>
                <circle cx="45" cy="55" r="10" fill="hsl(0, 0%, 21%)"></circle>
                <circle cx="73" cy="55" r="10" fill="hsl(0, 0%, 21%)"></circle>
            </svg>
        );
    }
}

export default Ellipsis;
