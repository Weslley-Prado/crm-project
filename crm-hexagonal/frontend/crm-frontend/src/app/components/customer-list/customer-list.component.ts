import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],

})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }
}
