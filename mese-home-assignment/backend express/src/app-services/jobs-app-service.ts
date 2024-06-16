
import { JsonDB, Config } from 'node-json-db';
import { JobsItem } from "../models/job-model";

var db = new JsonDB(new Config("./src/db.json", true, true, '/', true));
export function generateId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}
export default class JobsAppService {
  date = new Date();
  public getAll = async () => {
    return await db.getData("/jobs/");
  };

  public insertJob = async (job: JobsItem) => {
    job.id =  !job.id ? generateId() : job.id;
    job.created_at = this.date;
    job.submitted_at = this.date;
    job.completed_at = job.state === 'Succeeded' ? this.date : '';
    await db.push("/jobs", [job], false);
    await db.save();
    await db.reload();

  };

  public updateState = async (job: JobsItem) => {
    let result = (await db.getData("/jobs/")).find(j => j.id === job.id);
    result.state = job.state;
    result.updated_at = this.date;
    job.submitted_at = this.date;
    result.completed_at = job.state === 'Succeeded' ? this.date : '';
    console.log(job,result);
    await db.save();
    await db.reload();
    return result;
  };

  public updateJob = async (job: JobsItem) => {
    let result = (await db.getData("/jobs/")).find(j => j.id === job.id); 
    result.job = job.job;
    result.log = job.log;
    result.user = job.user
    result.group = job.group;
    result.state = job.state;
    result.updated_at = this.date;
    result.completed_at = job.state === 'Succeeded' ? this.date : '';

    await db.save();
    await db.reload();
  };
}; 
