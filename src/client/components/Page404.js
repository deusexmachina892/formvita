import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class Page404 extends PureComponent{
    constructor(props){
        super(props);
        this.props.togglePage404();
    }
    render(){
        return(
            <div className="container text-center pagenotexistcontainer">
                <div className="pagenotexist">
                    Page Does Not Exist!
                    <br/>
                    <Link to={'/'} onClick={this.props.togglePage404}>
                        GO BACK
                    </Link>
                </div>
            </div>
        )
    } 
}