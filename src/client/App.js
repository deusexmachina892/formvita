import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import { FormAdd } from './components/forms/FormAdd';
import { Landing } from './components/Landing';

class App extends PureComponent{
    render(){
        return(
            <BrowserRouter>
              <div>
                <Header />
                <FormAdd />
                <Route path="/" exact component={Landing} />
              </div>
            </BrowserRouter>
        )
    }
}

export default App;