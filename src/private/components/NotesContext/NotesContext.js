import React, {createContext, useEffect, useState} from "react";
import firebase from '../../../components/firebase';

export const NotesContext = createContext();

export const NotesProvider = (props) => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        firebase.getAllNotes().then(snapshot => setNotes(snapshot.val()));
    });

    return (
        <NotesContext.Provider value={[notes, setNotes]}>
            {props.children}
        </NotesContext.Provider>
    );
}

