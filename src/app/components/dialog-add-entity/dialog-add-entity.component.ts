import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface VehicleDialog {
  status: boolean;
  year: string;
  category: string;
  type: string;
  number: number;
  id: number;
}

@Component({
  selector: 'app-dialog-add-entity',
  templateUrl: './dialog-add-entity.component.html',
  styleUrls: ['./dialog-add-entity.component.css'],
})
export class DialogAddEntityComponent {
  isValidData: boolean;
  errorMessage: string;

  entityFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogAddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleDialog
  ) {
    this.errorMessage = ' ';
    this.isValidData = true;
  }
  errorOfMessage(): void {
    if (this.data.category == undefined) {
      this.errorMessage = 'Complete the category';
    }
    if (this.data.number == undefined) {
      this.errorMessage = 'Complete number';
    }
    if (this.data.type == undefined) {
      this.errorMessage = 'Complete the type';
    }
    if (this.data.year == undefined) {
      this.errorMessage = 'Complete the year';
    }
    if (this.data.category == ' ') {
      this.errorMessage = 'Complete the category';
    }
    if (this.data.category == '') {
      this.errorMessage = 'Complete the category';
    }
    if (this.data.category.length > 70) {
      this.errorMessage = 'Not a valid category';
    }
    if (this.data.number < 0 || this.data.number > 999999999) {
      this.errorMessage = 'Not a valid number';
    }
    if (this.data.type == '') {
      this.errorMessage = 'Complete the type';
    }
    if (this.data.type == ' ') {
      this.errorMessage = 'Complete the type';
    }
    if (this.data.type.length > 70) {
      this.errorMessage = 'Not a valid type';
    }
    if (this.data.year == ' ') {
      this.errorMessage = 'Complete the year';
    }
    if (this.data.year == '') {
      this.errorMessage = 'Complete the year';
    }
    if (this.data.year == null) {
      this.errorMessage = 'Complete the year';
    }
    if (this.data.year.length > 4) {
      this.errorMessage = 'Not a valid year';
    }
    if (this.data.year == '0') {
      this.errorMessage = 'Not a valid year';
    }
  }
  onCreateClick(): void {
    this.data.year = this.data.year.toString();
    if (
      this.data.year == undefined ||
      this.data.category == undefined ||
      this.data.type == undefined ||
      this.data.number == undefined
    ) {
      this.errorOfMessage();
      console.log(this.data);
      this.isValidData = false;
    } else if (
      this.data.year == null ||
      this.data.category == '' ||
      this.data.type == '' ||
      this.data.number == null
    ) {
      this.errorOfMessage();
      console.log(this.data);
      this.isValidData = false;
    } else if (
      this.data.year == null ||
      this.data.category == ' ' ||
      this.data.type == ' ' ||
      this.data.number == null
    ) {
      this.errorOfMessage();
      console.log(this.data);
      this.isValidData = false;
    } else if (
      this.data.year.length > 4 ||
      this.data.category.length > 70 ||
      this.data.type.length > 70 ||
      this.data.number > 999999999
    ) {
      this.errorOfMessage();
      console.log(this.data);
      this.isValidData = false;
    } else {
      console.log("not error data", this.data);
      this.errorMessage = '';
      this.isValidData = true;
      this.dialogRef.close(this.data);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
