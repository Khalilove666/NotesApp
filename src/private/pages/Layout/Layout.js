import React, {useContext} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import {Route} from "react-router-dom";
import {NotesContext} from "../../components/NotesContext/NotesContext";
import Home from "../Home/Home";
import CreateForm from "../CreateForm/CreateForm";
import NoteItemPage from "../NoteItemPage/NoteItemPage";
import logo from "../../notes.png";
import goOut from "../../logout.png";
import './Layout.css';
import firebase from '../../../components/firebase.js';

const Layout = ({history}) => {
    const [notes, setNotes] = useContext(NotesContext);
    const singleNoteItemHandler = ({match}) => {
        const note = Object.values(notes).find(item => item.id == match.params.noteID);
        if (note) {
            return <NoteItemPage self={note}/>
        }

    }

    const { path, url } = useRouteMatch();

    const logOutHandler = async () => {
        await firebase.logout()
        history.push('/')
        console.log("logged out");
        
    };


    return (
        <div>
            <header className={'notes-header'}>
                <Link className={'logo-holder'} to={`${url}`}>
                    <img className={'logo'} src={logo} alt=""/>
                    <h1 className={'logo-text'}>NotesApp</h1>
                </Link>
                <div className={'links-holder'}>
                    <Link className={'actual'}  to={`${url}/actual`}>Actual</Link>
                    <Link className={'archive'} to={`${url}/archive`}>Archive</Link>
                    <div className={'vertical-lines'}></div>
                    <Link className={'create'} to={`${url}/create`}>Create</Link>
                </div>
                <div className={'user-holder'}>
                    <p className={'user-name'}>{firebase.getCurrentUsername()}</p>
                    <button className={'btn-out'} onClick={logOutHandler}>
                        <img className={'logo'} src={goOut} alt=""/>
                    </button>
                </div>
            </header>

            <main>
                <Route exact path={path} render={() => <Home show={'all'}/>}/>
                <Route exact path={`${path}/actual`} render={() => <Home show={'actual'}/>}/>
                <Route exact path={`${path}/archive`}  render={() => <Home show={'archive'}/>}/>
                <Route exact path={`${path}/create`}  component={CreateForm}/>
                <Route path={`${path}/notes/:noteID`} render={singleNoteItemHandler}/>
                <Route path={`${path}/actual/notes/:noteID`} render={singleNoteItemHandler}/>
                <Route path={`${path}/archive/notes/:noteID`} render={singleNoteItemHandler}/>
            </main>
        </div>
    );
};

export default Layout;