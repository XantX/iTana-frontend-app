import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  basePath = 'http://localhost:8080/api';

  constructor( private http: HttpClient ) { }
}
