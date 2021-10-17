import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {VehiclesApiService} from './service/vehicles-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'frontend-application';
  displayedColumns: string[] = ['actions','year', 'category', 'type', 'number'];
  dataSource = new MatTableDataSource();

  constructor(private vehiclesApi: VehiclesApiService ){
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
