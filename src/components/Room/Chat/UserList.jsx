import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserListener } from '../../../actions';

class UserList extends Component {
    componentDidMount() {
        this.props.updateUserListener()
        console.log(this.props.dictionary)
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
    renderHeader() {
        return (
            <div className="header">
                <div className="columns is-mobile">
                    <div className="column is-one-third">
                        <a href="https://omarjuice.github.io/" rel="noopener noreferrer" target="_blank" >
                            <figure className="image is-4by3">
                                <img id={`OJ-logo`} src={`/images/OJICONtrue.png`} alt={`OJ`} />
                            </figure>
                        </a>
                    </div>
                    {this.props.dictionary === 'Free' ? null :
                        <div className="column is-two-thirds">
                            <a target="_blank"
                                rel="noopener noreferrer"
                                href={this.props.dictionary === 'Oxford' ? 'https://developer.oxforddictionaries.com/' : 'https://www.urbandictionary.com/'}>
                                <figure className="image is-3by1">
                                    <img id={`${this.props.dictionary}-logo`} src={`${process.env.PUBLIC_URL}/images/${this.props.dictionary}logo.png`} alt={`${this.props.dictionary} Dictionary`} />
                                </figure>
                            </a>
                        </div>
                    }

                </div>
            </div>
        )
    }
    render() {
        return (
            <div id="user-list" onClick={this.props.toggleMenu} className="column is-3 is-9-mobile">
                {this.renderHeader()}
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
        master: state.hangman.master,
        dictionary: state.room.dictionary
    }
}

export default connect(mapStateToProps, { updateUserListener })(UserList);
