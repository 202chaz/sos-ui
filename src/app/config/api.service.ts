import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  launchNotification(options) {
    return this.http.post(`${this.url}/launch-notifications`, options);
  }

  removeNotification(id) {
    return this.http.delete(`${this.url}/launch-notifications/${id}`);
  }
}
