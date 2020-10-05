import React from 'react';
import rooms from './rooms.json';
import './roomcontrol.css';

const RoomControl = (props) => {
    console.log("Room control triggered!");

    console.log("Using mock rooms = ", rooms);
    /*
    let url = "http://localhost:8080/room/list";
    console.log("URL = " + url);

    fetch(url, {crossDomain:true})
        .then(response => response.json())
        .then(data => console.log(data));
    */


    function makeOption(opt) {
        return <option key={opt.id}>{opt.name}</option>
    }

    return <select className="roomList">{rooms.map(makeOption)}</select>;
}

export default RoomControl;