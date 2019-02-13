import React, {PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash.isempty';

import { fetchForms } from '../actions';
import requireAuth from '../helpers/requireAuth';

import { FormSmallView } from './forms/FormSmallView';

class Dashboard extends PureComponent{
    constructor(props){
        super(props);
        this.renderForms = this.renderForms.bind(this);
    }
    componentDidMount(){
        this.props.fetchForms();
    }   
    renderForms(){
        const { allownforms } = this.props;
        return !isEmpty(allownforms) && allownforms.map(form => {
            return(
                <Link to={`/forms/${form._id}`} key={form._id}><FormSmallView {...form}/> </Link>
            )
        })
    }
    render(){
        const { loading } = this.props;
        return(
            <div className="container">
              <div className="form-container">
                {loading?'Loading': this.renderForms()}
              </div>
            </div>
        )
    }
}

function mapStateToProps({ forms: { allownforms, loading } }){
    return { allownforms, loading }
}
export default connect(mapStateToProps, { fetchForms })(requireAuth(Dashboard));