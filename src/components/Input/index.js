import React from 'react';
import './input.css';

const Input = (props) => {
    return (
        <div className="inputbox">
            <label htmlFor={props.id}>
                {props.id}:
                <input type="text"
                    className="display"
                    id={props.id}
                    value={props.value}
                    onChange={props.change}
                />
            </label>
        </div>
    );   
}

export default Input;