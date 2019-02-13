import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class Page404 extends PureComponent{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.togglePage404();  
    }
    componentWillUnmount(){
        this.props.togglePage404();
    }

    render(){
        return(
            <div className="container text-center pagenotexistcontainer">
                <div className="pagenotexist">
                    Page Does Not Exist!
                    <br/>
                    <Link to={'/'}>
                        GO BACK
                    </Link>
                </div>
            </div>
        )
    } 
}