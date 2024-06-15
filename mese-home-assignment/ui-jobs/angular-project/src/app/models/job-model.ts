export interface JobsItem {
  id?:  string
  job: string
  user: string
  group: string
  submitted_at?: Date
  updated_at: Date
  completed_at: Date
  created_at: Date;
  state: string;
  log: string;
} 

export enum StatesEnum{
  Running, Pending, Failed, Succeeded, Terminated
}

 