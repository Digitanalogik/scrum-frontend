import React from 'react';
import './card.css';

const Card = (props) => {

    let cardClass = "card-container" + (props.selected ? " selected" : "");
    return (
        <div className={cardClass} onClick={props.click}>
            <div className="card-value">
                {props.value}
            </div>
        </div>
    )
}

export default Card;
