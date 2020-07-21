import React, {useState} from 'react';
import {CirclePicker} from 'react-color';
import { uuid } from 'uuidv4';
import firebase from '../../../components/firebase.js';

import './CreateForm.scss'

const CreateForm = (props) => {

    const colors = ['yellowgreen', "yellow", 'pink', 'aqua', 'violet']
    let [state, setState] = useState({
        bgColor: colors[Math.floor(Math.random() *4) + 1],
        inputs: {
            text: '',
            title: ''
        },
        isSubmittable: false
    });

    const handleChangeComplete = (color, event) => {
        setState(
            {
                ...state,
                bgColor: color.hex
            })
    };

    const handleChangeNote = (e) => {
        const {name, value} = e.target;

        const newInputs = {
            ...state.inputs,
            [name]: value
        }

        setState(
            {
                ...state,
                inputs: {...newInputs},
                isSubmittable: Object.keys(newInputs).every(elem => newInputs[elem].length > 0)
            })
        console.log(state);
    }

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const {title, text} = state.inputs,
            {bgColor} = state;

        const data = {
            id: uuid(),
            noteTitle: title,
            noteDescription: text,
            color: bgColor,
            status: true
        };
        try {
            await firebase.addPost(data);
            props.history.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmitNote}
              onChange={handleChangeNote}
              className={"form-container"}
        >
            <h1>Fill Data</h1>
            <input className={"form-title-input"}
                   type="text"
                   name={"title"}
                   placeholder={"Title"}
            />
            <textarea className={"form-textarea"}
                      placeholder={"Note text "}
                      name="text" id=""
                      cols="30"
                      rows="10"
            ></textarea>
            <div className="form-note-color">
                <p>Color</p>
                <div className="form-color-palette">
                    <CirclePicker
                        onChangeComplete={handleChangeComplete}
                        width={"210px"}
                        colors={colors}
                    />
                </div>
            </div>
            <button disabled={!state.isSubmittable} className="form-create-button">CREATE</button>
        </form>
    );
};


export default CreateForm;