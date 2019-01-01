import React, { Component } from 'react';
import ManSVG from '../../SVG/ManSVG';
import WordBlank from './WordBlank';
import Letters from './Letters';
import { connect } from 'react-redux';
import { nextTurnListener } from '../../../actions';
import { hangmanAnimation as animate } from '../../../animations';
import Loader from '../../SVG/Loader';

class Hangman extends Component {
    componentDidMount() {
        this.props.nextTurnListener()
        animate.changeScreen('.screen')
        if (document.getElementById('hint')) {
            console.log(this.props.hint.length)
        }
    }
    render() {
        return (
            <>
                <div id="svg-container" className="column is-one-fifth is-full-mobile has-text-centered">
                    <ManSVG />
                </div>
                <div className="column is-half has-text-centered is-two-thirds-tablet is-full-mobile">
                    <WordBlank />
                    {this.props.gameOver ? <Loader scale={.25} /> : <p id="hint" className="subtitle has-text-dark has-text-centered">{this.props.hint}</p>}
                    {this.props.hint && !this.props.gameOver && this.props.hint.length > 90 ? <span className="icon"><i class="fas fa-sort-down"></i></span> : null}
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