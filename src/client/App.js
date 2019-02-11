import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import { FormAdd } from './components/forms/FormAdd';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { FormView } from './components/forms/FormView';
import { Page404 } from './components/Page404';

class App extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isFormViewActive: false,
            isPage404: false
        }
        this.activeFormView = this.activeFormView.bind(this);
        this.togglePage404 = this.togglePage404.bind(this);
    }
    activeFormView(){
        this.setState({
            isFormViewActive: true
        })
    }
    togglePage404(){
        const { isPage404 } = this.state;
        this.setState({
            isPage404: !isPage404
        })
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
                    render={(props) => <FormView activeFormView={this.activeFormView}/>}
                    />
                    <Route 
                    path="/forms/:formId" 
                    exact 
                    render={(props) => <FormView activeFormView={this.activeFormView}/>}
                    />
                    <Route 
                    path="*"
                    render={(props) => <Page404 togglePage404={this.togglePage404} />} 
                    />
                </Switch>
              </div>
            </BrowserRouter>
        )
    }
}

export default App;