import { Component, Inject } from '@angular/core';
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
  constructor(
    public dialogRef: MatDialogRef<DialogAddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleDialog) {}
    onNoClick(): void{
      this.dialogRef.close();
    }
}
