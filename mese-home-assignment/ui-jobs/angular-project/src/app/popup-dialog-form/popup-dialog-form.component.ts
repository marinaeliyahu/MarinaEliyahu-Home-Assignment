import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { JobsItem } from '../models/job-model';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { StatesEnum } from '../models/job-model';
@Component({
  selector: 'app-popup-dialog-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './popup-dialog-form.component.html',
  styleUrl: './popup-dialog-form.component.css'
})
export class PopupDialogFormComponent {
  controlForm!: FormGroup;

  action: string;
  localData: any;
  isValid: boolean = true;
  enumStatusData: any = StatesEnum;
  hideRequiredControl = new FormControl(false);
  availableStates: string[] = ['Running', 'Succeeded', 'Terminated', 'Failed', 'Pending'];

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  // selected: string;
  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobsItem,
  ) {

    this.localData = { ...data };
    this.action = this.localData.action;
    this.createForm();
    this.cloneDataToFormGroup(this.localData);

    console.log('Dilog', data);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  public cloneDataToFormGroup(data: any) {
    this.controlForm.patchValue(data);
  }
  public cloneFormGroupToData(data: any): any {
    // if (this.controlForm.valid) {
    return Object.assign(data, this.controlForm.value);
    //  }
  }
  createForm() {
    this.controlForm = this._formBuilder.group({
      id: [],
      user: ['', Validators.required],
      job: ['', Validators.required],
      group: ['', Validators.required],
      state: ['', Validators.required],
      log: ['', Validators.required],
      created_at: [''],
      submitted_at: [''],
      updated_at: [''],
      completed_at: [''],
    });
  }
  doAction() {
    if (this.controlForm.valid) {
      this.localData = this.cloneFormGroupToData(this.controlForm.value);
      this.dialogRef.close({ event: this.action, data: this.localData });
    }
    else {
      this.isValid = false;
    }

  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}