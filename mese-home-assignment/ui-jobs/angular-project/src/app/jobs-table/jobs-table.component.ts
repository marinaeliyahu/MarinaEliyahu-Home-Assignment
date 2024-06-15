
import { MatIconModule } from '@angular/material/icon';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogFormComponent } from '../popup-dialog-form/popup-dialog-form.component';
import { JobsItem } from '../models/job-model';
import { HttpGeneralService } from '../services/http-general.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.css',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

  imports: [NgIf,
    NgFor, MatProgressSpinnerModule, MatSortModule, DatePipe, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatIconModule],
})
export class JobsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable, { static: false }) table!: MatTable<JobsItem>;
  displayedColumns: string[] = ['job', 'state', 'group', 'user', 'update']; // 'log', , 'created_at'
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: JobsItem[] | null;
  dataSource: MatTableDataSource<JobsItem>;
  dataDatabase!: Observable<JobsItem[]> | null;
  data: JobsItem[] = [];
  href = 'http://localhost:3000/jobs/';
  date = new Date();
  formattedDate = this.date.toLocaleString();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  order: SortDirection = "asc";//"" | "asc" | "desc";
  page: number = 1;
  //paginator: MatPaginator | undefined;

  sortedData: JobsItem[] | undefined;
  constructor(private service: HttpGeneralService, public dialog: MatDialog) {
    const jobs = this.getJobsList();
    this.dataSource = new MatTableDataSource(jobs);
  }

  getJobsList() {
    // const jobs = this.service.GetData<JobsItem[]>(this.href).subscribe(data => {

    // })
    let tableData: JobsItem[] = [];
    this.service.GetData<JobsItem[]>(this.href).subscribe(data => {
      this.data = data;
      this.sortedData = this.data.slice();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.resultsLength = data.length;
      this.isLoadingResults = false;
      this.dataSource.paginator = this.paginator;
      tableData = data;
    });
    return tableData;
  }

  ngAfterViewInit() {

    this.getJobsList();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    console.log('OnInit');
  }
  ngOnChanges() {
    console.log('OnOnChanges');
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    console.log(obj.action);
    const dialogRef = this.dialog.open(PopupDialogFormComponent, {
      width: '350px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Close', result);
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      }
    });
  }

  // private getPagedData(data: JobsItem[]): JobsItem[] {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     return data.splice(startIndex, this.paginator.pageSize);
  //   } else {
  //     return data;
  //   }
  // }

  addRowData(row: JobsItem) {
     
    row.id = generateId();
    row.updated_at === this.date;
    row.created_at === this.date;
    row.submitted_at = this.date;
    this.data.push(row);
    console.log(row);

    this.service.PutData(this.href, row).subscribe((p) => {
      this.table.renderRows();
      this.getJobsList();
    });

  }

  updateRowData(row: JobsItem) {
    this.data = this.data.filter((value, key) => {
      if (value.id === row.id) {
        value.state = row.state;
        if (row.state === "Succeeded")
          row.completed_at === this.date;
        row.updated_at === this.date;
      }
      // row.updated_at = Date.now().YYYY-MM-DDTHH:mm:ss.sssZ;
    });
    console.log(row);
    this.service.PutchData(this.href, row).subscribe((result: any) => {
      this.table.renderRows();
      this.getJobsList();
    });
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'job':
          return compare(a.job, b.job, isAsc);
        case 'user':
          return compare(a.user, b.user, isAsc);
        case 'created':
          return compareDate(a.created_at, b.created_at, isAsc);
        case 'group':
          return compare(a.group, b.group, isAsc);
        case 'log':
          return compare(a.log, b.log, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
export interface JobsApi {
  items: JobsItem[];
  total_count: number;
}
export function generateId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

