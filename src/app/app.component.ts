import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DialogDeleteComponent} from './component/dialog-delete/dialog-delete.component';
import { DialogAddEntityComponent } from './components/dialog-add-entity/dialog-add-entity.component';
import { Vehicle } from './models/vehicle';
import { VehiclesApiService } from './service/vehicles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend-application';
  displayedColumns: string[] = [
    'year',
    'category',
    'type',
    'number',
    'actions',
  ];
  vehicleData: Vehicle;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();

  constructor(
    private vehiclesApi: VehiclesApiService,
    public dialog: MatDialog
  ) {
    this.vehicleData = {} as Vehicle;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllVehicles();
  }
  getAllVehicles(): void {
    this.vehiclesApi.getAllVehicles().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.data = this.dataSource.data.reverse();
    });
  }
  refresh():void{
    this.getAllVehicles();
  }
  deleteVehicle(id: number):void{
    this.vehiclesApi.deleteVehicle(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o: any)=>{
        return o.id !== id? o :false;
      })
    })
    this.refresh();
  }

  openVehicleDialog(): void {
    const dialogRef = this.dialog.open(DialogAddEntityComponent, {
      width: '350px',
      data: {
        status: false,
        year: this.vehicleData.year,
        category: this.vehicleData.category,
        type: this.vehicleData.type,
        number: this.vehicleData.number,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null){
        this.vehicleData.year = result.year;
        this.vehicleData.number = result.number;
        this.vehicleData.type = result.type;
        this.vehicleData.category = result.category;
        console.log(this.vehicleData);
      }
    })
  }
  openDeleteDialog(element: any):void {
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      width: '350px',
      data: {
        year: element.year,
        category: element.category,
        type: element.type,
        number: element.number,
        delete: false,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(`se borrara:${element.id}`)
        this.deleteVehicle(element.id);
      }else{
        console.log("No pasa nada")
      }
    })
  }

}
