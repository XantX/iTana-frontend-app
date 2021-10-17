import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from './component/dialog-delete/dialog-delete.component';
import { DialogAddEntityComponent } from './components/dialog-add-entity/dialog-add-entity.component';
import { Vehicle } from './models/vehicle';
import { VehicleResource } from './models/vehicle-resource';
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
  vehicleResourceData: VehicleResource;
  isEditMode: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();

  constructor(
    private vehiclesApi: VehiclesApiService,
    public dialog: MatDialog
  ) {
    this.vehicleData = {} as Vehicle;
    this.vehicleResourceData = {} as VehicleResource;
    this.isEditMode = false;
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

  refresh(): void {
    this.getAllVehicles();
    this.vehicleData = {} as Vehicle;
    this.vehicleResourceData = {} as VehicleResource;
  }

  convertVehicleDataToResource(): void {
    this.vehicleResourceData.year = this.vehicleData.year;
    this.vehicleResourceData.number = this.vehicleData.number;
    this.vehicleResourceData.type = this.vehicleData.type;
    this.vehicleResourceData.category = this.vehicleData.category;
  }
  createVehicle(): void {
    this.vehiclesApi
      .addVehicles(this.vehicleResourceData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.reverse();
        this.dataSource.data.push({...response});
        this.dataSource.data = this.dataSource.data.map((o) => o);
        this.dataSource.data = this.dataSource.data.reverse();
      });
  }
  updateVehicle(): void {
    this.vehiclesApi
      .updateVehicle(this.vehicleData.id, this.vehicleResourceData)
      .subscribe((response: Vehicle) => {
        this.dataSource.data = this.dataSource.data.map((o: any)=>{
          if(o.id === response.id){
            o = response;
          }
          return o;
        });
      });
  }
  deleteVehicle(id: number): void {
    this.vehiclesApi.deleteVehicle(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
  }
  openVehicleDialog(editMode: boolean, element: any = {} as Vehicle): void {
    const dialogRef = this.dialog.open(DialogAddEntityComponent, {
      width: '350px',
      data: {
        status: editMode,
        year: element.year,
        category: element.category,
        type: element.type,
        number: element.number,
        id: element.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.vehicleData.year = result.year;
        this.vehicleData.number = result.number;
        this.vehicleData.type = result.type;
        this.vehicleData.category = result.category;
        this.vehicleData.id = result.id;
        console.log(this.vehicleData);
        this.convertVehicleDataToResource();
        console.log(this.vehicleResourceData);
        if (editMode) {
          this.updateVehicle();
          console.log('Editado');
        } else {
          this.createVehicle();
          console.log('Creado');
        }
      }
    });
  }
  openDeleteDialog(element: any): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      data: {
        year: element.year,
        category: element.category,
        type: element.type,
        number: element.number,
        delete: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`se borrara:${element.id}`);
        this.deleteVehicle(element.id);
      } else {
        console.log('No pasa nada');
      }
    });
  }
}
