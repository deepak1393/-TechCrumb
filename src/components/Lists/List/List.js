import React from 'react';

import './List.css';

const list = (props) => {
    const liClassName = props.list.marked ? 'checked' : '';
    return (
        <li className={liClassName} onClick={() => props.markThis(props.list.id)}>
            {props.list.name}
            <span className="close" onClick={(event) => props.deleteThis(props.list.id, event)}>X</span>
        </li>
    );
}

export default list;