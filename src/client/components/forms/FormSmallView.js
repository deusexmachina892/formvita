import React, { PureComponent } from 'react';
import { renderToString } from 'react-dom/server'
import './forms.css';

import FormView from './FormView';

export class FormSmallView extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            htmlFromUrl: ''
        }
    }
    componentDidMount(){
        const { _id } = this.props;
        const url = `/forms/${_id}`;
        fetch(url)
            .then(response => response.text())
            .then(html => {
                this.setState({
                    htmlFromUrl: html
                })
            })

    }
    render(){
        const { _id, title, created_date } = this.props;
        const { htmlFromUrl } = this.state;
        return(
            <div className="form-small">
                <div className="upper-section">
                 <p>Form: {_id}</p>

                </div>
                <div className="title-section">
                    <header>{title}</header>
                    <div className="data">
                        <span><img src={require("../../assets/icons/forms.png")}/>{new Date(created_date).toDateString()}</span>
                        <span><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>  
    )
  }
}