import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';
import { DashboardController } from '../controllers/dashboardController';
import { requireAdmin } from '../middlewares/requireAdmin';
import { requireLogin } from '../middlewares/requireLogin';
import { validateForm } from '../models/Form';

const User: mongoose.model = mongoose.model('User');
const Form: mongoose.model = mongoose.model('Form');

export class DashboardRoutes{
    public router: Router;
    public dashboardController: DashboardController;

    constructor(){
        this.router = Router();
        this.routes();
    }
    public routes(): void{
      this.router.route('/:userId/forms')
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
            const { error } = validateForm(req.body);
            if(error) return res.status(400).send({ error: error.message, success: false});

            const { title, description, questions, assigned_to } = req.body;
            let form = new Form({
                title,
                description,
                question: [...questions],
                assigned_to: [...assigned_to]
            });

            form = await form.save();
            return res.status(200).send({
                form,
                success: true
            })
        });

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