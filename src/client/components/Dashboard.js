import React, {PureComponent } from 'react';

import { FormSmallView } from './forms/FormSmallView';

export class Dashboard extends PureComponent{
    render(){
        return(
            <div className="container">
              <div className="form-container">
                    <FormSmallView />
                    <FormSmallView />
              </div>
            </div>
        )
    }
}
