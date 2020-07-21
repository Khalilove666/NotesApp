import React, { useContext } from 'react';
import '../../components/firebase.js';
import {AuthContext} from '../../components/Auth.js';
import {NotesProvider} from '../../private/components/NotesContext/NotesContext.js';
import Layout from '../../private/pages/Layout/Layout.js'


export const Dashboard = (props) => {

    const { currentUser } = useContext(AuthContext);
    if(!currentUser) {
		// not logged in
		// alert('Please login first')
		props.history.replace('/login')
		return null
    }
    


    

    return (
            <NotesProvider>
                <Layout history={props.history}/>
            </NotesProvider>
    );
};