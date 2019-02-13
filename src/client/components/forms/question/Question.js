import React, { PureComponent, Fragment } from 'react';

import { Paragraph } from './Paragraph';
import { Multiple } from './Multiple';

export class Question extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            _id: this.props.question._id,
            title: '',
            isMultiple: this.props.question.isMultiple || false,
            required: this.props.question.required || false,
            choices: this.props.question.choices || []
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

    handleChange(e, _id){
        switch(e.target.id){
            case `question-${_id}-title`:
                return this.setState({
                    title: e.target.value
                });
            case `question-${_id}-select`:
                const isMultiple = e.target.value === 'multiple'? true: false;
                this.setState({isMultiple});
            case `question-${_id}-required`:
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
                        placeholder={this.props.question.title || "Question"}
                        id={`question-${this.props.question._id}-title`} 
                        name={`question-${this.props.question._id}-title`}
                        value={this.state.title} 
                        onChange={(e)=>this.handleChange(e, this.props.question._id)}
                        />
                    <select id={`question-${this.props.question._id}-select`} onChange={(e) => this.handleChange(e, this.props.question._id)}>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </header>
                <main>
                    {isMultiple? 
                       <Multiple sendData={this.getDataFromChild} choices={this.props.question.choices}/>
                    : <Paragraph sendData={this.getDataFromChild}/>
                    }
                </main>
                <footer>
                    <ul>
                        <li><span onClick={() => this.props.remove(this.props.question._id)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></span></li>
                        <li>Required 
                            <span  onClick={(e)=>this.handleChange(e, this.props.question._id)}>
                                {
                                    this.state.required?
                                    <i className="fa fa-toggle-on fa-lg" aria-hidden="true" style={{color: 'green'}} id={`question-${this.props.question._id}-required`}></i>
                                    : <i className="fa fa-toggle-off fa-lg" aria-hidden="true" id={`question-${this.props.question._id}-required`}></i>
                                    
                                }
                             </span>
                        </li>
                    </ul>
                </footer>
            </Fragment>
        )
    }
}