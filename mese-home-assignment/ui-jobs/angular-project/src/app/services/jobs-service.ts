import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs'; 
import { HttpGeneralService} from '../services/http-general.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobsItem } from '../models/job-model';
 

@Injectable({
  providedIn: 'root'
})

export class ReadingJobsService {
  public resultTable:JobsItem[] = [];
  private restURL = 'http://localhost:3000/jobs/';  

  constructor( private http: HttpClient, private service: HttpGeneralService ) {

  }

  getJobsData(): any {
    this.service.GetData(this.restURL).subscribe((result: any) => {
      console.log('SSSSSSSSSSSSSSSSSSSSSSS',result)
     
     this.resultTable = result.data as JobsItem[];
  
   
     return this.resultTable;
    });
  }
  
} 
