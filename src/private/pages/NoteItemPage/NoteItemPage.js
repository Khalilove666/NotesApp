import React, {useState, useContext} from 'react';
import firebase from '../../../components/firebase.js';
import {NotesContext} from "../../components/NotesContext/NotesContext";
import './NotePageItem.scss';
import ModalWindow from "../../components/ModalWindow/ModalWindow";


const NoteItemPage = (props) => {
    const [notes, setNotes] = useContext(NotesContext);
    const {noteTitle,noteDescription,color,id,status} =props.self;
    const styles = {backgroundColor: color};

    const [editButton, setEditButton] = useState(true),
        [modal, setModal] = useState(false);


    const singleTitle = React.createRef(),
            singleText = React.createRef();
    
    

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }


    const editNoteHandler = () => {

        if (editButton === false){
            firebase.updatePost(singleTitle.current.value, getKeyByValue(notes, props.self), "noteTitle");
            firebase.updatePost(singleText.current.value, getKeyByValue(notes, props.self), "noteDescription");
        }

        setEditButton(!editButton);

    };

    const archiveNoteHandler = () => {
        firebase.updatePost(!status, getKeyByValue(notes, props.self), "status");
    };

    const deleteNoteHandler = async () => {
        try {
            await firebase.deleteNote(getKeyByValue(notes, props.self));
        } catch (error) {
            console.log(error);
        }
        
        console.log(getKeyByValue(notes, props.self));
    };

    const closeModal = (e) => {

        if (e.target == e.currentTarget) {
            setModal(!modal);
        }
    };


        return (
        <div className={"single-container"}>
            <div style={styles} className={"single-item"}>
                <input ref={singleTitle} disabled={editButton} className="single-title" value={editButton ? noteTitle: null} style={styles}/>
                <textarea ref={singleText} disabled={editButton} className="single-text" cols="20" rows="30" style={styles} value={editButton ?noteDescription : null}></textarea>
            </div>
            <div className="single-buttons">
                <button  className="single-btn" onClick={editNoteHandler}>{editButton ? "EDIT" : "SAVE"}</button>
                <button onClick={archiveNoteHandler} className="single-btn">{status ? "ARCHIVE" : "ACTUALISE"}</button>
                <button onClick={closeModal} className="single-btn">DELETE</button>
            </div>
            {modal ? <ModalWindow closeModal={closeModal} delete={deleteNoteHandler}/> : null}
        </div>
    );
};

export default NoteItemPage;