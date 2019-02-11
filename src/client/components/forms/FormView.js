import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';

import { Question } from './question/Question';

export class FormView extends PureComponent{
    constructor(props){
        super(props);
        this.props.activeFormView();
        this.state={
            title: '',
            description: '',
            questionCounter: 0,
            questions: [
                {
                    id: 0,
                    title: 'Question',
                    isMultiple: false,
                    required: false
                }
            ],
        }
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.getData = this.getData.bind(this);
    }
    addQuestion(){
        let counter = this.state.questionCounter;
        this.setState({
            questionCounter: ++counter,
            questions: [
                ...this.state.questions,
                {   
                    id: counter
                }
            ]
        })
    }
    removeQuestion(questionId){
        let counter = this.questionCounter;
        let questions = this.state.questions;
        questions = questions.filter(question => question.id !== questionId) 
        this.setState({
           questions
        })
    }
    getData(question){
        const { id } = question;
        const { questions } = this.state;
        if (questions[id]){
            this.setState({
                questions: update(this.state.questions, {
                    [id]: {
                         $set: question
                         }
                    })
            })
        }
    }
    sendForm(e){
        e.preventDefault();
        console.log(this.state)
    }
    render(){
        const { questions } = this.state;
        return(
            <Fragment>
                <nav className="form-nav">
                    <Link className="nav-form-color" to={'/'}>Form Title</Link>
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
                            placeholder="Untitled Form" 
                            name="title" 
                            id="title" 
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                            />
                          <input 
                            type="text" 
                            placeholder="Form Description" 
                            name="description" 
                            id="description" 
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                            /> 
                      </header>   
                    </section>
                    <section className="questions">
                    {
                       questions.map( ({ id }) => {
                           return (
                            <article className="question" tabIndex="1" key={id}>
                                <Question 
                                    sendData={this.getData} 
                                    id={id} 
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