import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Interaction } from '../models/interaction.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-interaction-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './interaction-form.component.html',
  styleUrl: './interaction-form.component.css'
})
export class InteractionFormComponent {
  interaction: Interaction = { customerId: '', content: '', timestamp: new Date() };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.interaction.customerId = this.route.snapshot.paramMap.get('customerId') || '';
  }

  onSubmit() {
    this.apiService.createInteraction(this.interaction).subscribe({
      next: () => {
        alert('Interaction created');
        this.interaction.content = '';
      },
      error: () => alert('Error creating interaction')
    });
  }
}
