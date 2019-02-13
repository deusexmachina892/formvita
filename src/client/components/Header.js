import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { authLogout } from '../actions';

class Header extends PureComponent{
    handleLogoutClick(){
        console.log('clicked')
        this.props.authLogout();
    }

    renderContent(){
       return(!isEmpty(this.props.auth.user)? <span>Logged In &nbsp;<button className="btn btn-secondary" onClick={this.handleLogoutClick.bind(this)}>Logout</button></span>:
        <a href="/api/v1/auth/google" className="btn btn-google">
            <i className="fa fa-google" aria-hidden="true"></i>
            <span className="text">Login With Google</span>
        </a>)
    }

    render(){
        const { auth } = this.props;
        console.log()
        return(
            <Fragment>
              <nav className="navbar navbar-light bg-light justify-content-between">
              <Link className="nav-brand-color" to={'/'}>FormVite</Link>
                { auth.loading? 'Loading..' : this.renderContent()}
              </nav>
            </Fragment>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}
export default connect(mapStateToProps, { authLogout })(Header);