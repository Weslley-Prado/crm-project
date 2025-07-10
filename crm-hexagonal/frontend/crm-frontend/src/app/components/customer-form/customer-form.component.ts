import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  customer = { name: '', email: '', phone: '' };
  isLoading = false;
  createdCustomerId: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.apiService.createCustomer(this.customer).subscribe({
      next: (createdCustomer) => {
        this.isLoading = false;
        this.createdCustomerId = createdCustomer.id ?? null;
      },
      error: () => {
        this.isLoading = false;
        alert('Erro ao criar cliente.');
      },
    });
  }

  onCopyAndContinue() {
    if (!this.createdCustomerId) return;

    navigator.clipboard.writeText(this.createdCustomerId).then(
      () => {
        alert('ID copiado para a área de transferência!');
        this.router.navigate(['/client-chat', this.createdCustomerId]);
      },
      () => {
        alert('Falha ao copiar ID. Redirecionando...');
        this.router.navigate(['/client-chat', this.createdCustomerId]);
      }
    );
  }
}
