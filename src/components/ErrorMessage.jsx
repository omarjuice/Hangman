import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cancelError } from '../actions';

class ErrorMessage extends Component {
    render() {
        return (

            <article className={this.props.error.exists ? 'message is-danger' : 'message is-invisible'}>
                <div className="message-header">
                    <p>Error!</p>
                    <button onClick={this.props.cancelError} className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                    {this.props.error.message}
                </div>
            </article>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}
export default connect(mapStateToProps, { cancelError })(ErrorMessage);
