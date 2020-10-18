import React, { useState } from 'react';
import Card from '../Card';
import './table.css'

const Table = (props) => {
    const [selected, setSelected] = useState(0);
    // console.log("Creating poker table in room", props.room);

    const renderCards = () => {
        const cards = [];
        for (let i=1; i<10; i++) {
            cards.push(<Card key={i} value={i} selected={selected === i} click={() => {
                setSelected(i); 
                props.onVote(i);
            }} />);
        }
        return cards;
    }

    return (
        <div className="poker-table">
            {renderCards()}
        </div>
    );
}

export default Table; 