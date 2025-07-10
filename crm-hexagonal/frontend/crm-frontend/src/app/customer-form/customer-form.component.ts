// import { Component } from '@angular/core';
// import { Customer } from '../models/customer.model';
// import { ApiService } from '../api.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';


// @Component({
//   selector: 'app-customer-form',
//   standalone: true,
//   imports: [FormsModule, CommonModule, HttpClientModule],
//   templateUrl: './customer-form.component.html',
//   styleUrls: ['./customer-form.component.css'],
// })
// export class CustomerFormComponent {
//   customer: Customer = { name: '', email: '', phone: '' };

//   constructor(private apiService: ApiService) {}

//   onSubmit() {
//     this.apiService.createCustomer(this.customer).subscribe({
//       next: () => {
//         alert('Customer created');
//         this.customer = { name: '', email: '', phone: '' };
//       },
//       error: () => alert('Error creating customer')
//     });
//   }
// }
import { Component } from '@angular/core';
import { Customer } from '../models/customer.model';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  customer: Customer = { name: '', email: '', phone: '' };
  isLoading = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;

    this.apiService.createCustomer(this.customer).subscribe({
      next: () => {
        this.isLoading = false;
        this.customer = { name: '', email: '', phone: '' };
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this.isLoading = false;
        alert('Erro ao criar cliente');
        console.error(err);
      }
    });
  }
}
