import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getBooksYears(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books-year`);
  }

  getGenderCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/author-gender`);
  }

  getPublishedCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books-published`);
  }
}
