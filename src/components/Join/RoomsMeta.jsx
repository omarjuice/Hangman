import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoomsMeta extends Component {


    renderRoomList = () => {
        const dictTextColors = {
            Urban: 'warning',
            Oxford: 'info',
            Free: 'light'
        }
        return this.props.meta.map((room) => {
            return (
                <li key={room.name}
                    className="list-item play">
                    <p>
                        <strong className={room.name.length > 10 ? 'is-size-7' : null}>{room.name}</strong>
                        <em className={`has-text-${dictTextColors[room.dictionary]}`}>{room.dictionary}</em>
                        <span className={`num ${room.numUsers > 4 ? 'has-text-danger anton' : 'anton'}`}>{room.numUsers} <span className="icon"><i class="fas fa-users"></i></span></span>
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
