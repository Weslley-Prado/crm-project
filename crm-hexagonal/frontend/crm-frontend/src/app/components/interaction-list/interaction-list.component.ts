import { Component, OnInit } from '@angular/core';
import { Interaction } from '../../models/interaction.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interaction-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent implements OnInit {
  interactions: Interaction[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('customerId') || '';
    this.apiService.getInteractions(customerId).subscribe(interactions => {
      this.interactions = interactions;
    });
  }
}
