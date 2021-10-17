import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { VehicleResource } from '../models/vehicle-resource';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService {
  basePath = 'http://localhost:8080/api/vehicles';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //Api error handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error ocurred: ', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Something happened with request please try again later.'
    );
  }

  getAllVehicles(): Observable<Vehicle> {
    return this.http
      .get<Vehicle>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  addVehicles(item: any): Observable<VehicleResource> {
    return this.http
      .post<VehicleResource>(`${this.basePath}/create`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteVehicle(id: number): Observable<any>{
    return this.http.delete<Vehicle>(`${this.basePath}/id/${id}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  updateVehicle(id: number, item:any): Observable<Vehicle>{
    return this.http
    .put<Vehicle>(`${this.basePath}/id/${id}`,JSON.stringify(item),this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }
}
