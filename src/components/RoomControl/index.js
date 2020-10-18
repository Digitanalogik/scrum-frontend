import React from 'react';
import rooms from './rooms.json';
import './roomcontrol.css';

const RoomControl = (props) => {
    let roomList = null;
    if (typeof props.default !== 'undefined') {
        // rooms.unshift(props.default);
        roomList = [{ id: 1, name: props.default, password: null }];
    } else {
        console.log("Using mock rooms = ", rooms);
        roomList = rooms;
    }

    function makeOption(opt) {
        return <option key={opt.id}>{opt.name}</option>
    }

    return <select className="roomList">{roomList.map(makeOption)}</select>;
}

export default RoomControl;