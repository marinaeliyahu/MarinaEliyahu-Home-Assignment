import express, { Request, Response, Router } from 'express';
import JobsAppService from '../app-services/jobs-app-service';

const router: Router = express.Router();
const jobsService = new JobsAppService();

// Get all jobs
router.get('/', async (req: Request, res: Response) => {
    try {
        const jobs = await jobsService.getAll();

        console.log(jobs);
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

//Create a new job
router.put('/', async (req: Request, res: Response) => {
    try {
        await jobsService.insertJob(req.body);

        res.status(201).send({ status: true });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// // Update a job
router.patch('/updateJob', async (req: Request, res: Response) => {
    try {
        await jobsService.updateJob(req.body);
        res.status(201).send({ status: true });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

// Update a job
router.patch('/', async (req: Request, res: Response) => {
    try {
        await jobsService.updateJob(req.body);
        res.status(201).send({ status: true });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
});

export const JobsController: Router = router;
