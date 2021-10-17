import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
    'actions',
    'year',
    'category',
    'type',
    'number',
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
    });
  }
  openDialog(): void {
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
}
