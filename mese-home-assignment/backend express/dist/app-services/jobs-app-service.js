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
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
var db = new node_json_db_1.JsonDB(new node_json_db_1.Config("./src/db.json", true, true, '/', true));
class JobsAppService {
    constructor() {
        this.date = new Date();
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield db.getData("/jobs/");
        });
        this.insertJob = (job) => __awaiter(this, void 0, void 0, function* () {
            job.created_at = this.date;
            job.submitted_at = this.date;
            if (job.state === 'Succeeded') {
                job.completed_at === this.date;
            }
            yield db.push("/jobs", [job], false);
            yield db.save();
            yield db.reload();
        });
        this.updateState = (job) => __awaiter(this, void 0, void 0, function* () {
            let result = (yield db.getData("/jobs/")).find(j => j.id === job.id);
            result.state = job.state;
            result.updated_at = this.date;
            result.completed_at = job.state === 'Succeeded' ? this.date : '';
            console.log('Docker', job, 'db', result);
            yield db.save();
            yield db.reload();
            console.log('rrrrrrr', result);
            return result;
        });
        this.updateJob = (job) => __awaiter(this, void 0, void 0, function* () {
            let result = (yield db.getData("/jobs/")).find(j => j.id === job.id); // as JobsItem;
            result.job = job.job;
            result.log = job.log;
            result.user = job.user;
            result.group = job.group;
            result.state = job.state;
            result.updated_at = this.date;
            result.completed_at = job.state === 'Succeeded' ? this.date : '';
            yield db.save();
            yield db.reload();
            // let updated = (await db.getData("/jobs/")).find(j => j.id === job.id) as JobsItem;
            // console.log('Docker', result, 'updated', updated);
            // return updated;
        });
    }
}
exports.default = JobsAppService;
;
//# sourceMappingURL=jobs-app-service.js.map