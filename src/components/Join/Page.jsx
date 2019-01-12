import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import JoinForm from './JoinForm';
import { joinSuccess, errorListener, getUserMetaData, askForDictListener } from '../../actions';
import ErrorMessage from '../ErrorMessage';
import RoomsMeta from './RoomsMeta';
import { homepageAnimation as animate } from '../../animations';
import Title from '../SVG/Title';
import DictionaryForm from './DictionaryForm';
import Loader from '../SVG/Loader';

class JoinPage extends Component {
    state = {
        selectedRoom: ''
    }
    componentDidMount() {
        if (this.props.room) {
            return history.push(`/Hangman/${this.props.room}`)
        }
        document.querySelector('title').textContent = 'Join | Hangman'
        document.getElementById('css-load').setAttribute('href', process.env.PUBLIC_URL + "/joinStyle.css")
        this.props.joinSuccess()
        this.props.errorListener()
        this.props.askForDictListener()
        this.props.getUserMetaData()
        animate.noise('.noise')
    }
    onRoomClick(room) {
        return () => {
            this.setState({
                selectedRoom: room
            })
        }

    }

    render() {
        return (
            <div id="join-container" className="columns is-centered">
                <div className="column is-one-third has-text-centered">

                    {/* <h1 id="title" className="title is-1 anton has-text-white glitch" datatext="HANGMAN">HANGM<i className="fas fa-male"></i>N</h1> */}
                    <Title componentId="title" text={`HANGMAN`} colors={{ primary: 'white', secondary: '#3D9100', tertiary: '#C26EFF' }} />
                    <div className={this.props.loading ? '' : 'is-invisible'}> <span className="play">Requesting Server</span><Loader scale={.15} color='white' /> </div>
                    {this.props.error.exists ? <ErrorMessage /> : <RoomsMeta onClick={this.onRoomClick.bind(this)} />}

                    <div className="box noise">
                        <div className="columns is-centered is-mobile">
                            <div className={!this.props.dictionary ? "column is-four-fifths" : "column is-two-thirds"}>
                                {/* <DictionaryForm /> */}
                                {!this.props.dictionary ? <JoinForm initialValues={{ room: this.state.selectedRoom }} /> : <DictionaryForm />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.error,
        loading: state.loading,
        dictionary: state.room.dictionary,
        room: state.room.roomName
    }
}
export default connect(mapStateToProps, { joinSuccess, errorListener, getUserMetaData, askForDictListener })(JoinPage);
