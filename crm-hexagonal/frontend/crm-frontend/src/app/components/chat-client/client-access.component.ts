import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-access',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 class="text-xl font-bold mb-4">Acesso do Cliente</h2>
      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <label for="accessKey" class="block font-medium">Chave de Acesso</label>
        <input
          id="accessKey"
          [(ngModel)]="accessKey"
          name="accessKey"
          required
          class="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Digite sua chave de acesso"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  `
})
export class ClientAccessComponent {
  accessKey = '';

  constructor(private router: Router) {}

  onSubmit() {
    const trimmedKey = this.accessKey.trim();
    if (!trimmedKey) return;

    // Redireciona direto para o chat do cliente com a chave informada
    this.router.navigate(['/client-chat', trimmedKey]);
  }
}
