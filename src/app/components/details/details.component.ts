import { Component, Input, OnInit } from '@angular/core';
import { CustomService } from '../../service/custom.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [CustomService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() id = '';

  constructor(private customService: CustomService) {}

  ngOnInit() {
    this.customService.getCustomerById(Number(this.id));
  }
}
