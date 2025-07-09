import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  customer = { name: '', email: '', phone: '' };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.createCustomer(this.customer).subscribe({
      next: () => this.router.navigate(['/customers']),
      error: (error) => console.error('Error creating customer:', error)
    });
  }
}
