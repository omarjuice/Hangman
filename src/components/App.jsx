import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createConnection, bootServer, serverError } from '../actions/index';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import JoinPage from './Join/Page';
import GameRoom from './Room/GameRoom';


class App extends Component {

    componentDidMount() {
        this.props.bootServer()
        this.props.createConnection()

    }
    render() {
        return (
            <>
                <Router history={history}>
                    <>
                        <Route path="/Hangman" exact component={JoinPage} />
                        <Route path="/Hangman/:roomname" exact component={GameRoom} />
                    </>
                </Router>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connection: state.connection
    }
}

export default connect(mapStateToProps, { createConnection, bootServer, serverError })(App);
