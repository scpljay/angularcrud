import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Avenger } from "./../avenger";
@Injectable({
  providedIn: 'root'
})
export class AvengerService {
  baseUrl = 'http://localhost/api/avenger_api';
  avengers: Avenger[];
  private avenger: any ;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  // Save avenger in db
  store(avenger: Avenger): Observable<Avenger[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: avenger })
      .pipe(map((res) => {
        console.log(res['data']);
        this.avengers.push(res['data']);
        return this.avengers;
      }),
      catchError(this.handleError));
  }

  // Save avenger in db
  update(avenger: Avenger): Observable<Avenger[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: avenger })
      .pipe(map((res) => {
        const theAvenger = this.avengers.find((item) => {
          return +item['id'] === +avenger['id'];
        });

        if(theAvenger){
          theAvenger['price'] = +avenger['price'];
          theAvenger['model'] = avenger['model'];
        }       
        return this.avengers;
      }),
      catchError(this.handleError));
  }

  
  // Save avenger in db
  delete(id: number): Observable<Avenger[]> {
    const params = new HttpParams().set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map((res) => {
        const filteredAvengers = this.avengers.filter((avenger) => {
          return +avenger['id'] !== +id;
        }); 
        console.table(filteredAvengers);
        return this.avengers = filteredAvengers;
      }),
      catchError(this.handleError));
  }
  
  // Get All avenger list 
  getAll(): Observable<Avenger[]>{
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.avengers = res['data'];
        return this.avengers;
    }), catchError(this.handleError));
  }
}
