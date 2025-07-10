import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interaction } from '../models/interaction.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-interaction-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './interaction-edit.component.html',
  styleUrls: ['./interaction-edit.component.css']
})
export class InteractionEditComponent implements OnInit {
  interaction: Interaction = {
    customerId: '', content: '',
    timestamp: new Date()
  };
  customerId: string;
  interactionId: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.customerId = this.route.snapshot.paramMap.get('customerId')!;
    this.interactionId = this.route.snapshot.paramMap.get('interactionId')!;
    this.interaction.customerId = this.customerId;
  }

  ngOnInit(): void {
    this.apiService.getInteraction(this.interactionId).subscribe({
      next: (interaction) => this.interaction = interaction,
      error: (error) => console.error('Error fetching interaction:', error)
    });
  }

  onSubmit(): void {
    this.apiService.updateInteraction(this.interactionId, this.interaction).subscribe({
      next: () => this.router.navigate(['/interactions', this.customerId]),
      error: (error) => console.error('Error updating interaction:', error)
    });
  }
}
