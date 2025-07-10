import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Interaction } from '../../models/interaction.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './interaction-form.component.html',
  styleUrls: ['./interaction-form.component.css'],
})
export class InteractionFormComponent {
  interaction: Interaction = {
    customerId: '',
    content: '',
    timestamp: new Date()
  };

  isLoading = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.interaction.customerId = this.route.snapshot.paramMap.get('customerId') || '';
  }

  onSubmit() {
    this.isLoading = true;

    this.apiService.createInteraction(this.interaction).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Interação criada com sucesso!');
        this.interaction.content = '';
      },
      error: () => {
        this.isLoading = false;
        alert('Erro ao criar interação.');
      }
    });
  }
}
