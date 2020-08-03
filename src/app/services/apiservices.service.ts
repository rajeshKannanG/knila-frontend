import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  url: any;
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(data: {}) {
    this.emitChangeSource.next(data);
  }

  constructor(private http: HttpClient, private router: Router) { }

  apiLogincall(url, params) {
    this.url = environment.apiUrl + url;
    return this.http.post<any>(this.url, params).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }

  rolecall(url, params) {
    this.url = environment.apiUrl + url;
    return this.http.get<any>(this.url, params).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }

  doctorcallList(url, params) {
    this.url = environment.apiUrl + url;
    const token = localStorage.getItem('token')
    //console.log(token, 'locallllllll')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(this.url, params,httpOptions).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }

  locationcallList(url, params) {
    this.url = environment.apiUrl + url;
    const token = localStorage.getItem('token')
    //console.log(token, 'locallllllll')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<any>(this.url, httpOptions).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }

  signUpcall(url, params) {
    this.url = environment.apiUrl + url;
    return this.http.post<any>(this.url, params).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }
  
  apiListcall(url, params) {
    this.url = environment.apiUrl + url;
    const token = localStorage.getItem('token')
    console.log(token, 'locallllllll')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(this.url, params, httpOptions).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }

  appointmentcall(url, params) {
    this.url = environment.apiUrl + url;
    const token = localStorage.getItem('token')
    console.log(token, 'locallllllll')
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post<any>(this.url, params,httpOptions).pipe(map((responses: any) => {
      return responses
    }), catchError((err) => {
      return throwError(err)
      // Do messaging and error handling here
    }));
  }
}
