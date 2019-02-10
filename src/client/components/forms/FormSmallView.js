import React from 'react';
import './forms.css';

export const FormSmallView = () =>{
    return(
            <div className="form-small">
                <div className="upper-section">Upper Section</div>
                <div className="title-section">
                    <header>Form 1</header>
                    <div className="data">
                        <span><img src={require("../../assets/icons/forms.png")}/>Date</span>
                        <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>  
    )
}