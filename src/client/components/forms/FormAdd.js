import React from 'react';
import { Link } from 'react-router-dom';

export const FormAdd = () => {
    return(
        <div className="jumbotron bg-dark add-form">
            <div className="container">
                <div>Start a new form</div>
                <div className="add-containers">
                    <Link to={'/forms'}>
                        <div className="add-container-elements" />
                    </Link>
                    <div>Blank</div>
                </div>
            </div>
        </div>
    )
}