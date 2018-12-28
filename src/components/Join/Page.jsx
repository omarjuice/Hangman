import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinForm from './JoinForm';
import Loader from '../Loader';
import { joinSuccess, errorListener, getUserMetaData } from '../../actions/index';
import ErrorMessage from '../ErrorMessage';
import RoomsMeta from './RoomsMeta';

class JoinPage extends Component {
    state = {
        selectedRoom: ''
    }
    onRoomClick(room) {

        return () => {
            this.setState({
                selectedRoom: room
            }, () => {
                console.log(this.state);
            })
        }

    }
    componentDidMount() {
        document.getElementById('css-load').setAttribute('href', "joinStyle.css")
        this.props.joinSuccess()
        this.props.errorListener()
        this.props.getUserMetaData()
    }
    render() {
        return (
            <div id="join-container" className="columns is-centered">
                <div className="column is-one-third has-text-centered">

                    <h1 id="title" className="title is-1 anton has-text-white glitch" datatext="HANGMAN">HANGM<i className="fas fa-male"></i>N</h1>
                    {this.props.loading ? <Loader /> : ''}
                    {this.props.error.exists ? <ErrorMessage /> : <RoomsMeta onClick={this.onRoomClick.bind(this)} />}

                    <div className="box">
                        <div className="columns is-centered">
                            <div className="column is-four-fifths">
                                <JoinForm initialValues={{ room: this.state.selectedRoom }} />
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
        loading: state.loading
    }
}
export default connect(mapStateToProps, { joinSuccess, errorListener, getUserMetaData })(JoinPage);
