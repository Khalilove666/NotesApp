import React from 'react';
import './ModalWindow.scss';
import {Link} from "react-router-dom";

const ModalWindow = (props) => {
    return (
        <div className={'modal-window-background'} onClick={props.closeModal}>
            <div className={'modal-window'}>
                <div className={'header-holder'}>
                    <p className={'header-text'}>Delete this Note?</p>
                </div>
                <div className={'action-button-holder'}>
                    <Link className={'action-link'} to={'/dashboard'}><button onClick={props.delete} className={'action-yes'}>Yes</button></Link>
                    <button onClick={props.closeModal} className={'action-cancel'}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;