import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoomsMeta extends Component {


    renderRoomList = () => {
        return this.props.meta.map((room) => {
            return (
                <li key={room.name}
                    className="list-item">
                    <p>
                        <em>{room.name}</em>
                        <span className="num">{room.numUsers} {room.numUsers === 1 ? 'user' : 'users'}</span>

                        <span onClick={this.props.onClick(room.name)} className="icon has-text-success"><i className="fas fa-sign-in-alt"></i></span>
                    </p>

                </li >
            )
        })
    }
    render() {
        return (

            <div id="rooms-meta" className="card">
                <header className="card-header">
                    <p className="card-header-title anton">
                        Active Rooms: {this.props.meta.length}
                    </p>

                </header>
                <div className="card-content">

                    <ul className="list has-background-dark">
                        {this.renderRoomList()}
                    </ul>

                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        meta: state.meta
    }
}
export default connect(mapStateToProps, null)(RoomsMeta);
