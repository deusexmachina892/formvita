import React, { PureComponent, Fragment } from 'react';

import { Paragraph } from './Paragraph';
import { Multiple } from './Multiple';

export class Question extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            title: '',
            isMultiple: false,
            required: false,
            choices: []
        }

        this.getDataFromChild = this.getDataFromChild.bind(this);
    }

    componentDidMount(){
        this.props.sendData(this.state);
    }

    componentDidUpdate(prevProps, prevState){
       if(prevState !== this.state){
           this.props.sendData(this.state);
       }
    }

    handleChange(e, id){
        switch(e.target.id){
            case `question-${id}-title`:
                return this.setState({
                    title: e.target.value
                });
            case `question-${id}-select`:
                const isMultiple = e.target.value === 'multiple'? true: false;
                this.setState({isMultiple});
            case `question-${id}-required`:
                return this.setState({
                    required: !this.state.required
                })
            default:
                return;
        }
    }
    getDataFromChild(choices){
        this.setState({
            choices
        })
    }
    render(){
        const { isMultiple } = this.state; 
        return(
            <Fragment>
                <header>
                    <input 
                        type="text" 
                        className="question-title" 
                        placeholder="Question" 
                        id={`question-${this.props.id}-title`} 
                        name={`question-${this.props.id}-title`}
                        value={this.state.title} 
                        onChange={(e)=>this.handleChange(e, this.props.id)}
                        />
                    <select id={`question-${this.props.id}-select`} onChange={(e) => this.handleChange(e, this.props.id)}>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </header>
                <main>
                    {isMultiple? 
                       <Multiple sendData={this.getDataFromChild}/>
                    : <Paragraph sendData={this.getDataFromChild}/>
                    }
                </main>
                <footer>
                    <ul>
                        <li><i className="fa fa-trash fa-lg" aria-hidden="true"></i></li>
                        <li>Required 
                            <span  onClick={(e)=>this.handleChange(e, this.props.id)}>
                                {
                                    this.state.required?
                                    <i className="fa fa-toggle-on fa-lg" aria-hidden="true" style={{color: 'green'}} id={`question-${this.props.id}-required`}></i>
                                    : <i className="fa fa-toggle-off fa-lg" aria-hidden="true" id={`question-${this.props.id}-required`}></i>
                                    
                                }
                             </span>
                        </li>
                    </ul>
                </footer>
            </Fragment>
        )
    }
}