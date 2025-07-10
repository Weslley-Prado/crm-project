import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { InteractionListComponent } from './components/interaction-list/interaction-list.component';
import { InteractionFormComponent } from './components/interaction-form/interaction-form.component';
import { AllInteractionsComponent } from './components/all-interactions/all-interactions.component';
import { ClientChatComponent } from './components/chat-client/client-chat.component';
import { ClientAccessComponent } from './components/chat-client/client-access.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'interactions/:customerId', component: InteractionListComponent },
  { path: 'add-interaction/:customerId', component: InteractionFormComponent },
  { path: 'client-access', component: ClientAccessComponent },
  { path: 'client-chat/:id', component: ClientChatComponent },
  { path: 'all-interactions', component: AllInteractionsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routes(routes: any, arg1: { useHash: true; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
