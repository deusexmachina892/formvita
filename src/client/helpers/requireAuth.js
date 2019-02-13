import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

export default (ChildCommponent) => {
    class ComposedComponent extends PureComponent{  
        componentDidMount(){
            this.shouldRedirect();
        }
        componentDidUpdate(prevProps){
            this.shouldRedirect();
        }
        shouldRedirect(){
            const { auth : { user, loading } } = this.props;
            if(isEmpty(user) && !loading) {
                this.props.history.push('/')
            }
        }
        render(){
            return(
                <ChildCommponent {...this.props} />
            )
        }
    }
 function mapStateToProps({ auth }){
     return { auth };
 }
    return connect(mapStateToProps)(ComposedComponent);
}