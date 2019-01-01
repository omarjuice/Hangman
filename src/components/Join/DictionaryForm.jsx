import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { submitDict } from '../../actions';
import { homepageAnimation as animate } from '../../animations';


class DictionaryForm extends Component {
    componentDidMount() {
        document.getElementById('dict-form').scrollIntoView()
        this.pop = {
            oxford: animate.pop('#oxford-label'),
            urban: animate.pop('#urban-label'),
            free: animate.pop('#free-label'),
        }
        this.ids = ['oxford', 'urban', 'free']
    }
    renderInput = ({ input, label, meta, value }) => {
        const labelClass = 'radio-label has-background-dark label'
        return (
            <>
                <label className={labelClass} >
                    {label ? <figure className="image is-3by1">
                        <img id={`${label}-logo`} src={`./images/${label}logo.png`} alt={`${label} Dictionary`} />
                    </figure> : <div className="anton is-size-1">Free For All</div>}

                </label>

                <div className="control">
                    <input className={input} type="radio" {...input} value={value} />
                </div>
            </>
        )
    }
    onSubmit = ({ dictionary }) => {
        this.props.submitDict(dictionary)
    }
    onClick = (id) => {

        return () => {
            this.ids.forEach((ID) => {
                if (ID === id) {
                    this.pop[ID].reversed = false
                    this.pop[ID].play()
                    document.getElementById(`${ID}-label`).classList.add('selected')
                } else {
                    this.pop[ID].reversed = true
                    if (this.pop[ID].completed) {
                        this.pop[ID].play()
                    }
                    document.getElementById(`${ID}-label`).classList.remove('selected')
                }

            })
            document.getElementById(id).setAttribute('checked', true)
        }

    }
    render() {
        return (
            <form id="dict-form" onSubmit={this.props.handleSubmit(this.onSubmit)} className="form has-text-centered play">
                <div className="field">
                    <label id="oxford-label" className="label dict-label has-background-dark">
                        <Field id="oxford" onClick={this.onClick('oxford')} name="dictionary" component="input" type="radio" value="Oxford" />
                        {' '}
                        <figure className="image is-3by1">
                            <img id="Oxford-logo" src="./images/Oxfordlogo.png" alt="Oxford Dictionary" />
                        </figure>
                    </label >
                    <label id="urban-label" className="label dict-label has-background-dark">
                        <Field id="urban" onClick={this.onClick('urban')} name="dictionary" component="input" type="radio" value="Urban" />
                        {' '}
                        <figure className="image is-3by1">
                            <img id="Urban-logo" src="./images/Urbanlogo.png" alt="Urban Dictionary" />
                        </figure>
                    </label>
                    <label id="free-label" className="label dict-label has-background-dark is-size-1 is-size-2-tablet is-size-3-mobile anton">
                        <Field id="free" onClick={this.onClick('free')} name="dictionary" component="input" type="radio" value="Free" />
                        {' '}
                        <span>Free For All</span>
                    </label>
                </div>
                <div className="control has-text-centered">
                    <button className="button is-dark is-large"><span className="icon"><i className="fas fa-dungeon fa-2x"></i></span></button>
                </div>
            </form>
        );
    }
}
const validate = ({ dictionary }) => {
    const errors = {}
    if (!dictionary) {
        errors.dictionary = 'You must choose one'
    }
    return errors
}
const formWrapped = reduxForm({
    form: 'ChooseDict',
    validate
})(DictionaryForm);

export default connect(null, { submitDict })(formWrapped)
