import { Component, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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
  styleUrls: ['./dialog-add-entity.component.css']
})
export class DialogAddEntityComponent {
  ErrorMessage: string;
  ExistError: boolean;

  entityFormControl = new FormControl('',[
    Validators.required
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogAddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleDialog) {
      this.ErrorMessage = " ";
      this.ExistError = false;
    }
    onCreateClick():void{
      this.dialogRef.close(this.data)
    }
    onNoClick(): void{
      this.dialogRef.close();
    }
}
