// import { Component, OnInit } from '@angular/core';
// import { Interaction } from '../../models/interaction.model';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { ApiService } from '../../api.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-interaction-list',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterLink],
//   templateUrl: './interaction-list.component.html',
//   styleUrls: ['./interaction-list.component.css']
// })
// export class InteractionListComponent implements OnInit {
//   interactions: Interaction[] = [];

//   constructor(
//     private apiService: ApiService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     const customerId = this.route.snapshot.paramMap.get('customerId') || '';
//     this.apiService.getInteractions(customerId).subscribe(interactions => {
//       this.interactions = interactions;
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Interaction } from '../../models/interaction.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interaction-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.css']
})
export class InteractionListComponent implements OnInit {
  customerId: string;
  interactions: Interaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.customerId = this.route.snapshot.paramMap.get('customerId')!;
  }

  ngOnInit(): void {
    this.loadInteractions();
  }

  loadInteractions(): void {
    this.apiService.getInteractions(this.customerId).subscribe({
      next: (interactions) => this.interactions = interactions,
      error: (error) => console.error('Error fetching interactions:', error)
    });
  }

  deleteInteraction(id: string): void {
    if (confirm('Are you sure you want to delete this interaction?')) {
      this.apiService.deleteInteraction(id).subscribe({
        next: () => this.loadInteractions(),
        error: (error) => console.error('Error deleting interaction:', error)
      });
    }
  }

  editInteraction(id: string): void {
    this.router.navigate(['/edit-interaction', this.customerId, id]);
  }
}
