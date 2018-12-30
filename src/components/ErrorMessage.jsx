import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cancelError } from '../actions';
import { homepageAnimation as animate } from '../animations';

class ErrorMessage extends Component {
    componentDidMount() {
        animate.slideIn('#error-message')
    }
    cancelError = () => {
        animate.slideOut('#error-message')
            .finished.then(() => {
                this.props.cancelError()
            })
    }
    render() {
        return (

            <article id="error-message" className={this.props.error.exists ? 'message is-danger' : 'message is-invisible'}>
                <div className="message-header">
                    <p>Error!</p>
                    <button onClick={this.cancelError} className="delete" aria-label="delete"></button>
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
