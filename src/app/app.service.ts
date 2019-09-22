import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './models';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  private username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  getMember(id){
    console.log('Get member:' + id);
    return this.http
      .get(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }
  getUsername(): string{
    return this.username;
  }
  setUsername(name: string): void {
    this.username = name;
  }

  addMember(member) {
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    return this.http
      .post(`${this.api}/members`, JSON.stringify(member), {headers});
  }

  deleteMember(id){
    return this.http
      .delete(`${this.api}/members/${id}`);
  }

  updateMember(member): Observable<any>{
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    return this.http
      .put(`${this.api}/members`, JSON.stringify(member), {headers});
  }

  getTeams() { return this.http
    .get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
