import React, { Component } from 'react';
import ManSVG from '../../SVG/ManSVG';
import WordBlank from './WordBlank';
import Letters from './Letters';
import { connect } from 'react-redux';
import { nextTurnListener } from '../../../actions';
import Loader from '../../Loader';
import { hangmanAnimation as animate } from '../../../animations';

class Hangman extends Component {
    componentDidMount() {
        this.props.nextTurnListener()
        animate.changeScreen('.screen')
    }
    render() {
        return (
            <>
                <div id="svg-container" className="column is-one-fifth is-full-mobile has-text-centered">
                    <ManSVG />
                </div>
                <div className="column is-half has-text-centered is-two-thirds-tablet is-full-mobile">
                    <WordBlank />
                    {this.props.gameOver ? <Loader /> : <p id="hint" className="subtitle has-text-dark has-text-centered">{this.props.hint}</p>}
                </div>
                <div id="letter-buttons" className="column is-one-quarter is-half-tablet has-text-centered">
                    <Letters />
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        hint: state.hangman.hint,
        gameOver: state.hangman.gameOver
    })
}
export default connect(mapStateToProps, { nextTurnListener })(Hangman);
