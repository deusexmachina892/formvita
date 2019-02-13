import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { submitForm, fetchForm } from '../../actions';
import requireAuth from '../../helpers/requireAuth';
import { Question } from './question/Question';

class FormView extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            title: '',
            description: '',
            questionCounter:  0,
            questions: [
                {
                    _id: 0,
                    title: 'Question',
                    isMultiple: false,
                    required: false
                }
            ],
        }
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.getData = this.getData.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }
    componentDidMount(){
        this.props.toggleActiveFormView();
        const { params } = this.props.match;
        if (!isEmpty(params)){
            this.props.fetchForm(params.formId);
        }
    }
    componentWillUnmount(){
        this.props.toggleActiveFormView(); 
    }
    addQuestion(){
        let counter = this.state.questionCounter;
        this.setState({
            questionCounter: ++counter,
            questions: [
                ...this.state.questions,
                {   
                    _id: counter
                }
            ]
        })
    }
    removeQuestion(questionId){
        let counter = this.questionCounter;
        let questions = this.state.questions;
        questions = questions.filter(question => question._id !== questionId) 
        this.setState({
           questions
        })
    }
    getData(question){
        const { _id } = question;
        const { questions } = this.state;
        if (questions[_id]){
            this.setState({
                questions: update(this.state.questions, {
                    [_id]: {
                         $set: question
                         }
                    })
            })
        }
    }
    sendForm(e){
        e.preventDefault();
        const { user } = this.props;
        this.props.submitForm(this.state, user._id);
    }
    render(){
        const { title, description } = this.props.currentform;
        const questions = this.props.currentform.questions || this.state.questions;
        return(
            <Fragment>
                <nav className="form-nav">
                    <Link className="nav-form-color" to={'/'}>{ title || 'Untitled Form'}</Link>
                    <button className="btn btn-secondary" type="submit" form="form" onClick={(e) => this.sendForm(e)}>SEND</button>
                </nav>
                <section className="jumbotron form-jumbotron" />
                <span className="addquestion" onClick={this.addQuestion}>+</span>
                <section className="form-view-container">
                    <form className="form" id="form">
                    <section className="form-header">
                      <header>
                          <input 
                            type="text" 
                            placeholder={ title || "Untitled Form" }
                            name="title" 
                            id="title" 
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                            />
                          <input 
                            type="text" 
                            placeholder={ description || "Form Description"}
                            name="description" 
                            id="description" 
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                            /> 
                      </header>   
                    </section>
                    <section className="questions">
                    {
                       questions.map( question => {
                           return (
                            <article className="question" tabIndex="1" key={question._id}>
                                <Question 
                                    sendData={this.getData} 
                                    question = {question} 
                                    remove={this.removeQuestion}
                                   />
                            </article>
                           )
                       })
                    }
                    </section>
                </form>
            </section>
        </Fragment>
        )
    }
}

function mapStateToProps({ auth: { user }, forms: { currentform }}){
    return { user, currentform }
}

export default connect(mapStateToProps, { submitForm, fetchForm })(requireAuth(FormView));