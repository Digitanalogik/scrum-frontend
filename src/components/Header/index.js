import React from 'react';
import Input from 'components/Input';
import RoomControl from 'components/RoomControl';
import logo from 'images/spade.svg';
import './header.css';

const Header = (props) => {
    return (
        <header className="top">
            <div className="brand">
                <img src={logo} className="logo shadow" alt="Scrum Poker logo" />
                <div className="title">Scrum Poker</div>
            </div>
            <Input id={props.label} value={props.player} change={props.onChangeName} />
            <RoomControl default={props.room} />
        </header>
    )
}

export default Header;