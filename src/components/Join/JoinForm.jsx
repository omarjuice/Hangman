import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { initiateJoin } from '../../actions';
class JoinForm extends Component {

    renderInput = ({ input, autoFocus, label, meta }) => {
        const inputClass = meta.error && meta.touched ? 'input is-danger' : 'input is-dark'
        const labelClass = meta.error && meta.touched ? 'label has-text-light has-background-danger has-text-centered' : 'label has-text-light has-background-dark has-text-centered'
        return (
            <div className="field">
                <label htmlFor=""
                    className={labelClass}>
                    {meta.touched && meta.error ? meta.error : label}:
                 </label>
                <div className="control">

                    <input className={inputClass} type="text" {...input} autoFocus={autoFocus} autoComplete="off" />
                </div>
            </div>
        )
    }
    onSubmit = ({ name, room }) => {
        room = room.toUpperCase()
        this.props.initiateJoin({ name, room })
    }
    render() {
        return (
            <form id="join-form" onSubmit={this.props.handleSubmit(this.onSubmit)} className="form has-text-centered play">
                <div className="field">
                    <div className="control">
                        <Field name="name" component={this.renderInput} autoFocus={true} label="Enter a username" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <Field name="room" component={this.renderInput} autoFocus={false} label="Enter a room" />
                    </div>
                </div>
                <div className="control has-text-centered">
                    <button className="button is-dark is-large"><span className="icon"><i className="fas fa-dungeon fa-2x"></i></span></button>
                </div>
            </form>
        );
    }
}

const validate = ({ name, room }) => {
    const regex = /\W+/g
    const errors = {}
    if (!name || name.length < 1) {
        errors.name = "Name Required"
    }
    if (name && regex.test(name)) {
        errors.name = "Invalid Name"
    }
    if (name && name.length > 15) {
        errors.name = "Name too Long"
    }
    if (name && name.toLowerCase() === 'admin') {
        errors.name = "You cannot have that name"
    }
    if (!room) {
        errors.room = "Room Required"
    }
    if (room && regex.test(room)) {
        errors.room = "Invalid room name"
    }
    if (room && room.length > 15) {
        errors.room = "Room name too long"
    }

    return errors
}


const formWrapped = reduxForm({
    form: "JoinForm",
    validate,
    enableReinitialize: true
})(JoinForm);

export default connect(null, { initiateJoin })(formWrapped)
