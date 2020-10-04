import React, { useState } from 'react';
import Card from '../Card';
import './table.css'

const Table = (props) => {
    const [selected, setSelected] = useState(0);

    console.log("Creating poker table in room", props.room);

    function clickHandler(value) {
        setSelected(value); 
        let url = "http://localhost:8080/" + props.room + "/USERNAME/" + value;
        console.log("URL = " + url);
    }

    const renderCards = () => {
        const cards = [];
        for (let i=1; i<10; i++) {
            cards.push(<Card key={i} value={i} click={() => clickHandler(i)} selected={selected === i} />);
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