import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  basePath = 'http://localhost:8080/api';
  constructor( private http: HttpClient ) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  //Api error handling
  handleError(error: HttpErrorResponse): Observable<never>{
    if(error.error instanceof ErrorEvent){
      console.log("An error ocurred: ", error.error.message);
    }else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with requestk plase try again later.');
  }

}
