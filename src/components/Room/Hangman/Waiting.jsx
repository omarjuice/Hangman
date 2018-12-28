import React, { Component } from 'react';
import ManSVG from './ManSVG';
import { connect } from 'react-redux';

class Waiting extends Component {

    render() {
        return (
            <>
                <div className="column is-one-fifth is-full-mobile has-text-centered">
                    <ManSVG />
                </div>
                <div id="waiting-text" className="column is-half">
                    <p className="subtitle is-4 has-text-centered has-text-dark">{this.props.word.length > 2 ? `The word was ${this.props.word.join('')}` : null}</p>
                    <h1 className="anton title is-3 has-text-centered has-text-dark">
                        Waiting for {this.props.isChoosing && this.props.numUsers > 1 ? `${this.props.master.name} to choose a word...` : `more players...`}
                    </h1>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isChoosing: state.hangman.isChoosing,
        master: state.hangman.master,
        word: state.hangman.word,
        numUsers: state.room.users.length
    }
}

export default connect(mapStateToProps, null)(Waiting);
