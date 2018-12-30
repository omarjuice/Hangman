import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hangmanAnimation as animate } from '../../../animations';
class Score extends Component {

    state = {
        scorePlus: null,
        timeout: null
    }
    getUserScore = () => {
        if (this.props.user) {
            return this.props.user.score
        }
    }
    componentDidUpdate({ user }) {
        if (user) {
            let scoreIncrease = this.getUserScore() - user.score
            let scorePlus = scoreIncrease > 0 ? `+${scoreIncrease}` : null

            return this.state.scorePlus !== scorePlus && !this.state.timeout ? this.setState({
                scorePlus,
                timeout: setTimeout(() => {
                    this.setState({
                        timeout: null
                    })
                }, 1000)
            }, () => {
                animate.slideInAndFade('#score')
            }) : null
        }
    }
    render() {
        return (
            <p id="score" className="has-text-success bold anton is-size-4">{this.state.scorePlus ? <span>{this.state.scorePlus}</span> : null}</p>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.room.users.filter((user) => user.name === state.room.user.name)[0]
    }
}

export default connect(mapStateToProps, null)(Score);
