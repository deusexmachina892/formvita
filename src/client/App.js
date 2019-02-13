import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from './actions';

import Header from './components/Header';
import { FormAdd } from './components/forms/FormAdd';
import { Landing } from './components/Landing';
import Dashboard from './components/Dashboard';
import FormView from './components/forms/FormView';
import { Page404 } from './components/Page404';


class App extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isFormViewActive: false,
            isPage404: false
        }
        this.toggleActiveFormView = this.toggleActiveFormView.bind(this);
        this.togglePage404 = this.togglePage404.bind(this);
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    toggleActiveFormView(){
        const { isFormViewActive } = this.state;
        this.setState({
            isFormViewActive: !isFormViewActive
        })
    }
    togglePage404(){
        const { isPage404 } = this.state;
        this.setState({
            isPage404: !isPage404
        })
    }
    handleUnmount(){
        this.setState()
    }
    render(){
        const { isFormViewActive, isPage404 } = this.state;
        return(
            <BrowserRouter>
              <div>
                  { !isFormViewActive && !isPage404 &&
                    <Fragment>
                        <Header />
                       <FormAdd />
                    </Fragment>
                  }
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route 
                    path="/forms"
                    exact 
                    render={(props) => <FormView toggleActiveFormView={this.toggleActiveFormView} {...props}/>}
                    />
                    <Route 
                    path="/forms/:formId" 
                    exact 
                    render={(props) => <FormView toggleActiveFormView={this.toggleActiveFormView} {...props}/>}
                    />
                    <Route 
                    path="*"
                    render={(props) => <Page404 togglePage404={this.togglePage404} {...props} />} 
                    />
                </Switch>
              </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, { fetchUser })(App);