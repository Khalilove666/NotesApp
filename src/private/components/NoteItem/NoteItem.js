import React from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import './NoteItem.css'


const NoteItem = (props) => {
    
    const {path, url} = useRouteMatch();
        const noteItemStyle = {
            "backgroundColor": `${props.ob.color}`
        };

        const truncateText = (text, maxLength) => {
            let truncated = text;
            if (truncated.length > maxLength) {
                truncated = truncated.substr(0, maxLength) + ' ...';
            }
            return truncated;
        }
        return (

            <Link className={'note-item'} to={`${url}/notes/${props.ob.id}`}>
                <div className={'note-title-holder'} style={noteItemStyle}>
                    <h2 className={'note-title'}>{truncateText(props.ob.noteTitle, 30)}</h2>
                </div>
                <div className={'note-body-holder'} style={noteItemStyle}>
                    <p className={'note-body'}>{truncateText(props.ob.noteDescription, 640)}</p>
                </div>
            </Link>

        );

};


export default NoteItem;