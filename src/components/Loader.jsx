import React, { Component } from 'react';
// import { general as animate } from '../animations';

class Loader extends Component {
    componentDidMount() {
        // animate.spin('.fa-spinner')
    }
    render() {
        return (
            <div>

                <span className="icon"><i className="fas fa-spinner fa-pulse fa-3x"></i></span>

            </div>
        );
    }
}

export default Loader;
