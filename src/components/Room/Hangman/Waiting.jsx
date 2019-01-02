import React, { Component } from 'react';
import ManSVG from '../../SVG/ManSVG';
import { connect } from 'react-redux';
import Loader from '../../SVG/Loader';
import { hangmanAnimation as animate } from '../../../animations';


class Waiting extends Component {
    componentDidMount() {
        animate.turnOn('.screen')
        animate.changeScreen('.screen')


    }
    render() {
        let clientWidth = document.querySelector('body').clientWidth
        return (
            <>
                <div className="column is-one-fifth is-full-mobile has-text-centered">
                    <ManSVG />
                </div>
                <div id="waiting-text" className="column is-half">
                    <p className="subtitle is-4 has-text-centered has-text-dark play">{this.props.word.length > 2 ? <span>The word was <strong className="has-text-dark">{this.props.word.join('')}</strong></span> : null}</p>
                    <h1 className="anton title is-3 has-text-centered has-text-dark">
                        Waiting for {this.props.isChoosing && this.props.numUsers > 1 ? <><span className="has-text-primary">{this.props.master.name}</span><span> to choose a word</span></> : `more players`}
                    </h1>
                    <Loader scale={clientWidth > 1300 ? 1 : clientWidth > 1024 ? .75 : clientWidth > 768 ? .5 : .4} />
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

export default connect(mapStateToProps)(Waiting);
