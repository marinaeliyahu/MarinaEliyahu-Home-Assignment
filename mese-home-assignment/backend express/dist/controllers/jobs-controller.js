"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const express_1 = __importDefault(require("express"));
const jobs_app_service_1 = __importDefault(require("../app-services/jobs-app-service"));
const router = express_1.default.Router();
const jobsService = new jobs_app_service_1.default();
// Get all jobs
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobsService.getAll();
        console.log(jobs);
        res.json(jobs);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
}));
//Create a new job
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jobsService.insertJob(req.body);
        res.status(201).send({ status: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
}));
// // Update a job
router.patch('/updateJob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jobsService.updateJob(req.body);
        // console.log(job);
        // res.json(job);
        res.status(200).send({ status: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
}));
// Update a job
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jobsService.updateJob(req.body);
        // console.log(job);
        // res.json(job);
        res.status(200).send({ status: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Server error: ${err}`);
    }
}));
exports.JobsController = router;
//# sourceMappingURL=jobs-controller.js.map