import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { InteractionListComponent } from './components/interaction-list/interaction-list.component';
import { InteractionFormComponent } from './components/interaction-form/interaction-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AllInteractionsComponent } from './components/all-interactions/all-interactions.component';
import { InteractionEditComponent } from './interaction-form/interaction-edit.component';
import { ClientChatComponent } from './components/chat-client/client-chat.component';
import { ClientAccessComponent } from './components/chat-client/client-access.component';

export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'interactions/:customerId', component: InteractionListComponent },
  { path: 'add-interaction/:customerId', component: InteractionFormComponent },
  { path: 'edit-interaction/:customerId/:interactionId', component: InteractionEditComponent },
  { path: 'client-access', component: ClientAccessComponent },
  { path: 'client-chat/:id', component: ClientChatComponent },
  { path: 'all-interactions', component: AllInteractionsComponent },
  { path: '**', redirectTo: '/customers' }
];
