import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CustomService } from '../../service/custom.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../state/appState';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  providers: [CustomService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnChanges {
  @Input() id = '';
  customer: Customer | undefined;
  productString:string="";

  constructor(private customService: CustomService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  ngOnInit() {
    console.log('id in ngOnInit', this.id);
    this.getCustomerById(Number(this.id));
  }

  getCustomerById(id: number) {
    const allData = this.customService.customerData$;
    allData.subscribe((data: Customer[]) => {
      this.customer = data.find((a: { id: number }) => a.id === id);
      if(this.customer)
      this.productString = this.customer.products.join(",");
    });
  }

  updateCustomer() {
    if (this.customer) {
      // this.customer.products = this.customer.products
      this.customer.products = this.productString.split(",").map((product) => product.trim());
      console.log("after changing values",this.customer);
      this.customService.updateCustomer(this.customer);
      this.route.navigate(['/']);
    }
  }
}
