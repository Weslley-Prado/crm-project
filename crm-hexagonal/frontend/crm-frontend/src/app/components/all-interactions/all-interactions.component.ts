import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Interaction } from '../../models/interaction.model';

@Component({
  selector: 'app-all-interactions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-interactions.component.html',
  styleUrls: ['./all-interactions.component.css']
})
export class AllInteractionsComponent implements OnInit {
  interactions: Interaction[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllInteractions().subscribe({
      next: (interactions) => this.interactions = interactions,
      error: (error) => console.error('Error fetching all interactions:', error)
    });
  }
}
