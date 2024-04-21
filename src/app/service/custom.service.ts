    import { HttpClient } from '@angular/common/http';
    import { Injectable, OnInit } from '@angular/core';
    import {
      BehaviorSubject,
      Observable,
      filter,
      find,
      first,
      map,
      of,
      throwError,
    } from 'rxjs';
    import { Customer } from '../state/appState';

    @Injectable({
      providedIn: 'root',
    })
    export class CustomService {
      private apiUrl = 'assets/api.json'; 
      customerDataSubject = new BehaviorSubject<Customer[]>([]);
      customerData$ = this.customerDataSubject.asObservable(); 
      flag = localStorage.getItem("flag");

      constructor(private http: HttpClient) {
        const storedData = localStorage.getItem('customerData');
        if (storedData) {
          const data = JSON.parse(storedData);
          this.customerDataSubject.next(data);
        } else {
          this.fetchCustomers();
        }
      }
      

      fetchCustomers(): void {

          this.http.get<Customer[]>(this.apiUrl).subscribe((data) => {
            this.customerDataSubject.next(data); 
          });
      }

      updateCustomer(updatedCustomer: Customer): void {
        console.log("customer received", updatedCustomer);
        
        const currentData = this.customerDataSubject.getValue(); 
        const index = currentData.findIndex((c) => c.id === updatedCustomer.id); 
        
        console.log('Current data before update:', currentData);
      
        if (index !== -1) {
          currentData[index] = updatedCustomer;
          this.customerDataSubject.next([...currentData]);
          console.log('Current data after update:', currentData); 
          localStorage.setItem('customerData', JSON.stringify(currentData));
        } else {
          console.error('Customer not found:', updatedCustomer.id); 
        }
      }

      deleteCustomer(customerId: number): void {
        const currentData = this.customerDataSubject.getValue();
        const newData = currentData.filter((customer) => customer.id !== customerId); // Remove the customer
        this.customerDataSubject.next(newData); // Update the observable
        localStorage.setItem("customerData", JSON.stringify(newData));
      }
      

    }
