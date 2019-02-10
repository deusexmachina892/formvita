import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class FormView extends PureComponent{
    constructor(props){
        super(props);
        this.props.activeFormView();
        this.state={
            questions: [
                {
                    title: 'hello'
                },
                {
                    title: 'Hi'
                }
            ]
        }
        this.addQuestion = this.addQuestion.bind(this);
    }
    addQuestion(){
        this.setState({
            questions: [
                ...this.state.questions,
                {
                    title: 'Falana'
                }
            ]
        })
    }
    render(){
        const { questions } = this.state;
        return(
            <Fragment>
                <nav className="form-nav">
                    <Link className="nav-form-color" to={'/'}>Form Title</Link>
                    <button className="btn btn-secondary">SEND</button>
                </nav>
                <section className="jumbotron form-jumbotron" />
                <span className="addquestion" onClick={this.addQuestion}>+</span>
                <section className="form-view-container">
                    <section className="form">
                      <header>
                          Title
                      </header>
                      <article>
                          Description
                      </article>
                      
                    </section>
                    {
                       questions.map(question => {
                           return (
                            <article className="question">
                            Question
                            </article>
                           )
                       })
                    }
                </section>
                
            </Fragment>
        )
    }
}