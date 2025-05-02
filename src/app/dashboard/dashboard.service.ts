import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://161.132.37.212:82/api/books-year';
  constructor(private http: HttpClient) {}


  getBooksYears(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
