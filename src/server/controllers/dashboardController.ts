import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { validateForm } from '../models/Form';

export class DashboardController{
    public Form: mongoose.model;
    constructor(){
        this.Form = mongoose.model('Form');
    }
    public async getAllFormsForUser(req: Request, res: Response){

        const forms = await this.Form.find({created_by: req.params.userId});
        res.status(200).send({
            forms,
            success: true
        })
    }
    public async createForm(req: Request, res: Response){
          // check for errors in req.body
          const { error } = validateForm(req.body);
          if(error) res.status(400).send({ msg: 'Bad Request', success: false });
          
        let form = new this.Form(req.body);
        form = await form.save();
        res.status(200).send({
            form,
            success: true
        })
    }
}