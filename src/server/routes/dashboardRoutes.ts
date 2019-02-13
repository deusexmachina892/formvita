import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';
import isEqual from 'lodash.isequal';
import * as async from 'async';
import { requireAdmin } from '../middlewares/requireAdmin';
import { requireLogin } from '../middlewares/requireLogin';
import { validateForm } from '../models/Form';

const User: mongoose.model = mongoose.model('User');
const Form: mongoose.model = mongoose.model('Form');

export class DashboardRoutes{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    public routes(): void{
      this.router.route('/forms')
      // GET /forms 
        .get(requireLogin, async (req: Request, res: Response) => {
            let forms;
            if(req.user.isAdmin){
                forms = await Form.find({ created_by: req.user._id});
            } else {
                forms = await User.find({}).populate('assigned_forms');
            }
            return res.status(200).send({
                forms,
                success: true
            })
        })
      // POST /forms
        .post(requireLogin, requireAdmin, async (req: Request, res: Response) => {
            const userIdRegex = /^(user )/;
            const authorization = req.headers.authorization;
            const userId = mongoose.Types.ObjectId(authorization.replace(userIdRegex, ''));

            // if(isEqual(req.user._id, userId)) res.status(403).send({ error: 'You don\'t have access', success: false});
            const { error } = validateForm(req.body);
            if(error) return res.status(400).send({ error: error.message, success: false});

            const { title, description, questions } = req.body;
            let q = questions.map(question => {
                delete(question._id);
                return question;
            })
            let form = new Form({
                title,
                description,
                questions: [...q],
                created_by: req.user._id
            });

            form = await form.save();
            return res.status(200).send({
                form,
                success: true
            })
        });
      this.router.route('/forms/:id')
        .get(requireLogin, async (req: Request, res: Response) => {
            let form = await Form.findById(req.params.id);
            if(!form) return res.status(500).send({error: 'Form not found', success: false});
            return res.status(200).send({ form, success: true });
        })
      this.router.route('/forms/edit/:id')
      // GET a particular form
        .patch(requireLogin, requireAdmin, async (req: Request, res: Response) => {
            if(!req.body) return res.status(400).send({ error: 'Please send items to update', success: false});
            let form = await Form.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            res.status(200).send({
                form,
                success: true
            })
        })
        .get(requireLogin, (req: Request, res: Response) => {
            
        })
      // Edit a particular form
    }
}