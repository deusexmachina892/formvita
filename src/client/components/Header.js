import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Header extends PureComponent{
    render(){
        return(
            <Fragment>
              <nav className="navbar navbar-light bg-light justify-content-between">
              <Link className="nav-brand-color" to={'/'}>FormVite</Link>
              <button className="btn btn-google"><i className="fa fa-google" aria-hidden="true"></i><span className="text">Login With Google</span></button>
              </nav>
            </Fragment>
        )
    }
}

export default Header;