import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserListener } from '../../../actions';

class UserList extends Component {
    componentDidMount() {
        this.props.updateUserListener()
    }
    renderUsers = () => {
        let highestScore = this.props.users.reduce((a, b) => b.score > a.score ? b : b.score === a.score ? { name: '', score: b.score } : a, { name: '', score: -1 }).name
        return this.props.users.sort((a, b) => b.score - a.score).map(({ name, id, score }) => {
            return (
                <li key={id}
                    className="list-item user-list-item has-text-light bold is-size-5 play">
                    {name}
                    <span className="is-pulled-right">
                        {name === highestScore ? <span className="icon"><i className="fas fa-crown"></i></span> : null}
                        {name === this.props.master.name ? <span className="icon"><i className="fas fa-brain"></i></span> : null} {score} {score === 1 ? 'point' : 'points'}</span>
                </li>
            )
        })
    }
    render() {
        return (
            <div id="user-list" onClick={this.props.toggleMenu} className="column is-3 is-9-mobile">
                <aside className="menu">
                    <p className="menu-label has-text-light has-text-centered title is-3 anton">
                        <strong>{this.props.room}</strong>

                    </p>

                    <ul className="menu-list">
                        {this.renderUsers()}
                    </ul>
                </aside>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.room.users,
        room: state.room.roomName,
        master: state.hangman.master
    }
}

export default connect(mapStateToProps, { updateUserListener })(UserList);
