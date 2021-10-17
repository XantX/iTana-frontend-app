import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {VehiclesApiService} from './service/vehicles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend-application';
  displayedColumns: string[] = ['actions','year', 'category', 'type', 'number'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();

  constructor(private vehiclesApi: VehiclesApiService ){
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit():void{
    this.getAllVehicles();
  }
  getAllVehicles(): void{
    this.vehiclesApi.getAllVehicles().subscribe((response: any )=>{
      this.dataSource.data = response;
    })
    
  }
}
