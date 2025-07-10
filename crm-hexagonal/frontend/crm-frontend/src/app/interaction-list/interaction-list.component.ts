import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Interaction } from '../models/interaction.model';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-interaction-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    LucideAngularModule
  ],
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent implements OnInit {
  interactions: Interaction[] = [];
  pagedInteractions: Interaction[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('customerId') || '';
    this.apiService.getInteractions(customerId).subscribe(interactions => {
      this.interactions = interactions;
      this.totalPages = Math.ceil(this.interactions.length / this.pageSize);
      this.updatePagedInteractions();
    });
  }

  updatePagedInteractions() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedInteractions = this.interactions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedInteractions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedInteractions();
    }
  }
}
