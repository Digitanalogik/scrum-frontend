import React from 'react';
import './card.css';

const Card = (props) => {

    let cardClass = "card-container" + (props.selected ? " selected" : "");

    if (typeof props.title === 'undefined') {
        return (
            <div className={cardClass} onClick={props.click}>
                <div className="card-value">
                    {props.value}
                </div>
            </div>
        );    
    } else {
        return (
            <div className={cardClass} onClick={props.click}>
                <div className="card-title">
                    {props.title}
                </div>
                <div className="card-value">
                    {props.value}
                </div>
            </div>
        );    
    }

}

export default Card;
