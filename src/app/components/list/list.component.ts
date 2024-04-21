import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomService } from '../../service/custom.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Customer } from '../../state/appState';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[CustomService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {

  customerData$:Observable<Customer[]> | undefined;

  constructor(private customerService:CustomService,private router: Router ){
   
  }

  ngOnInit(){
    this.customerData$ = this.customerService.customerData$;
   if(this.customerData$){
    this.customerData$.subscribe(
      (data:Customer[])=>{
        console.log("Data if changed", data)
      }
     )
   }
   
  }

  deleteCustomer(id:number){
      this.customerService.deleteCustomer(id);
  }

  editCustomer(customer:Customer){
    this.router.navigate(['/details', customer.id]);
  }

  ngOnDestroy(): void {
      
  }
  

}
