import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newWord, wordInfoListener } from '../../../actions'
import Timer from '../../SVG/Timer';
import { hangmanAnimation as animate } from '../../../animations';
import Loader from '../../SVG/Loader';
import ErrorMessage from '../../ErrorMessage';
class GameInit extends Component {
    componentDidMount() {
        animate.changeScreen('.screen')
        this.props.wordInfoListener()
    }
    getHeading = () => {
        if (this.props.word.length > 2) {
            return (
                <>
                    <h1 className="title is-4 has-text-dark">Game Over!</h1>
                    <p className="has-text-dark">The word was {this.props.word}.</p>

                </>
            )
        }
    }

    onSubmit = (formValues) => {
        this.props.newWord(formValues)
    }
    renderInput = ({ input, autoFocus, label, meta }) => {
        const labelClass = meta.touched && meta.error ? 'label has-background-danger' : 'label has-background-dark'
        return (
            <div className="field">
                <label className={labelClass}>{meta.touched && meta.error ? meta.error : label}</label>
                <div className="control">
                    <input className="input is-dark" {...input} type="text" autoFocus={autoFocus} />
                </div>

            </div>
        )
    }
    render() {
        return (
            <>
                <div id="word-form-header" className="column is-one-third">
                    <div className="has-text-centered">
                        {this.getHeading()}
                        <p className="subtitle is-4 has-text-dark">Pick a word, <span className="has-text-primary">{this.props.master.name}</span>.</p>
                        {this.props.Error.exists ? <ErrorMessage /> : this.props.loading ? <Loader scale={.15} /> : <Timer time={60} masterTimer={true} />}
                        <p className="has-text-danger">{this.props.info}</p>
                    </div>
                </div>

                <div id="word-form" className="column is-two-thirds has-text-centered play">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form has-text-centered">
                        <Field name="word" component={this.renderInput} autoFocus={true} label="Choose a word" />
                        {this.props.hasFreeDict ? <Field name="hint" component={this.renderInput} autoFocus={false} label="Give them a hint!" /> : null}

                        <div className="control has-text-centered">
                            <button className="button is-dark is-small"><span className="icon"><i class="fas fa-play-circle"></i></span></button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
const validate = ({ word, hint }) => {

    const errors = {}
    let regex = /[^a-z]/gi
    if (!word) {
        errors.word = 'You must enter a word'
    }
    if (word && word.length < 3) {
        errors.word = 'Must be at least 3 letters'
    }
    if (word && regex.test(word)) {
        errors.word = 'Must only contain letters'
    }
    if (!hint) {
        errors.hint = 'You must enter a hint'
    }
    return errors
}
const GameInitForm = reduxForm({
    form: 'GameInit',
    validate
})(GameInit)
const mapStateToProps = (state) => {
    return {
        word: state.hangman.word.join(''),
        gameOver: state.hangman.gameOver,
        master: state.hangman.master,
        user: state.room.user,
        hasFreeDict: state.room.dictionary === 'Free',
        loading: state.loading,
        Error: state.error,
        info: state.hangman.info
    }
}
export default connect(mapStateToProps, { newWord, wordInfoListener })(GameInitForm);