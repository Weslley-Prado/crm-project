import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Interaction } from '../../models/interaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit {
  customerId = '';
  interactions: Interaction[] = [];
  newMessage = '';
  isLoading = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    this.loadInteractions();
  }

  loadInteractions() {
    this.apiService.getInteractions(this.customerId).subscribe((data) => {
      this.interactions = data.sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.isLoading = true;

    const interaction: Interaction = {
      customerId: this.customerId,
      content: this.newMessage,
      timestamp: new Date(),
      autoResponse: null
    };

    this.apiService.createInteraction(interaction).subscribe({
      next: () => {
        this.newMessage = '';
        this.isLoading = false;
        this.loadInteractions(); // atualiza para ver a resposta
      },
      error: () => {
        alert('Erro ao enviar mensagem');
        this.isLoading = false;
      }
    });
  }
}
