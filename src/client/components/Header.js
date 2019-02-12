import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

class Header extends PureComponent{
    renderContent(){
       return(!isEmpty(this.props.auth.user)? <span>Logged In</span>:
        <a href="/api/v1/auth/google" className="btn btn-google">
            <i className="fa fa-google" aria-hidden="true"></i>
            <span className="text">Login With Google</span>
        </a>)
    }
    render(){
        return(
            <Fragment>
              <nav className="navbar navbar-light bg-light justify-content-between">
              <Link className="nav-brand-color" to={'/'}>FormVite</Link>
                {this.renderContent()}
              </nav>
            </Fragment>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}
export default connect(mapStateToProps)(Header);