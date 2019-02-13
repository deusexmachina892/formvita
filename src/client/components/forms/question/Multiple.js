import React, { PureComponent, Fragment } from 'react';

import update from 'immutability-helper';

export class Multiple  extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            choiceCounter: this.props.choices.length|| 0,
            choices: this.props.choices || [{
                id: 0,
                value: ''
            }]
        }

        this.handleAddChoice = this.handleAddChoice.bind(this);
        this.handleUpdateChoice = this.handleUpdateChoice.bind(this);
        this.handleRemoveChoice = this.handleRemoveChoice.bind(this);
    }
    componentDidMount(){
        this.props.sendData(this.state.choices);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.choices !== this.state.choices){
            this.props.sendData(this.state.choices);
        }
    }
    handleAddChoice(e){
        e.preventDefault();
        let counter = this.state.choiceCounter;
        this.setState({
            choiceCounter: ++counter,
            choices: update(
                this.state.choices,
                {
                    $push:[{
                        id: counter,
                        value: ''
                    }]
                }
            )
        })
       //  this.props.sendData(this.state.choices)
    }
    handleUpdateChoice(e, id){
        e.preventDefault();
        const { choices } = this.state;
        if(choices[id]){
            this.setState({
                choices: update(
                    this.state.choices,
                    {
                        [id]: {
                            $set: {
                                id: id,
                                value: e.target.value
                            }
                        }
                    }
                )
            })
        }
    }
    handleRemoveChoice(choiceId){
        let counter = this.state.choiceCounter;
        let choiceArray = this.state.choices;
        choiceArray = choiceArray.filter(choice => choice.id !== choiceId);
        this.setState({
            choices:[
                ...choiceArray
            ]
        })
    }
    render(){
        const { choices } = this.state;
        return(
            <Fragment>
              {
                  choices.map( ({ id }) => {
                   return ( <div className="multiple" id={id} key={id}>
                        <input type="radio" name={`choice-${id}-radio`} value={`choice-${id}-radio`}/> 
                        <input 
                            type="text" 
                            placeholder={`Option: ${id+1}`} 
                            name={`choice-${id}-option`} 
                            // value={this.state.choices[id].value} 
                            onChange={(e) =>this.handleUpdateChoice(e, id)}
                            />
                        <i className="fa fa-remove" onClick={() => this.handleRemoveChoice(id)}></i><br/>
                    </div>)
                  })
              }
               
               <div className="addoption"><button className="btn btn-link" onClick={(e) => this.handleAddChoice(e)}>Add Option</button></div>
            </Fragment>
        )
    }
}