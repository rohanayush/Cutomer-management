import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Customer } from '../state/appState';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  private apiUrl = 'assets/api.json'; // Path to your JSON file
  private customerDataSubject = new BehaviorSubject<Customer[]>([]); // Holds latest data
  customerData$ = this.customerDataSubject.asObservable(); // Observable for components to subscribe to

  constructor(private http: HttpClient) {
    this.fetchCustomers(); // Fetch initial data
  }

  fetchCustomers(): void {
    this.http.get<Customer[]>(this.apiUrl).subscribe(data => {
      this.customerDataSubject.next(data); // Update with new data
    });
  }
  updateCustomer(updatedCustomer: Customer): void {
    const currentData = this.customerDataSubject.getValue();
    const index = currentData.findIndex((c) => c.id === updatedCustomer.id);

    if (index !== -1) {
      currentData[index] = updatedCustomer; // Update customer in the array
      this.customerDataSubject.next([...currentData]); // Emit the updated array
    }
  }

  getCustomerById(id: number): Observable<Customer> {
    const customer = this.customerDataSubject.getValue().find((c) => c.id === id);

    if (customer) {
      return of(customer); // Return the found customer
    } else {
      // Return an error or navigate to an error page
      return of(("Customer with ID  not found") as unknown) as Observable<Customer>;
    }
  }
}
