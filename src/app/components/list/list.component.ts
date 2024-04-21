import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../service/custom.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Customer } from '../../state/appState';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[CustomService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  customerData$:Observable<Customer[]> | undefined;

  constructor(private customerService:CustomService){
  
  }

  ngOnInit(){
   this.customerData$ = this.customerService.getCustomers();
  }

  deleteCustomer(customer:Customer){

  }

  editCustomer(customer:Customer){

  }
}
