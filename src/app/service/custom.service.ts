import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../state/appState';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  private apiUrl = 'assets/api.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
