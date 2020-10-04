import React from 'react';
import logo from 'images/spade.svg';
import './header.css';

const Header = (props) => {
    return (
        <header className="top">
            <div className="brand">
                <img src={logo} className="logo shadow" alt="Scrum Poker logo" />
                <div className="title">Scrum Poker</div>
            </div>
            {props.children}
        </header>
    )
}

export default Header;