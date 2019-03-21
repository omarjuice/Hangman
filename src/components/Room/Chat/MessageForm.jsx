import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../../../actions';

class MessageForm extends Component {


    onSubmit = ({ text }) => {
        !text || this.props.createMessage(text)
    }
    renderInput = ({ input, id }) => {
        return <input className="input" id={id} type="text" {...input} autoComplete="off" autoFocus={true} />
    }
    render() {
        return (
            <form id="message-form" className="form box has-background-grey" action="" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div id="message-send" className="columns is-mobile is-centered is-gapless">
                    <div className="column is-10">
                        <Field name="text" component={this.renderInput} id="message-input" />
                    </div>
                    <div className="column is-2">
                        <button className="button is-info">Send</button>
                    </div>

                </div>
            </form>

        );
    }
}

const formWrapped = reduxForm({
    form: 'MessageForm'
})(MessageForm)

export default connect(null, { createMessage })(formWrapped);
