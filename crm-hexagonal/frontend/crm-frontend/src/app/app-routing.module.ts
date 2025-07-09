import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { InteractionListComponent } from './components/interaction-list/interaction-list.component';
import { InteractionFormComponent } from './components/interaction-form/interaction-form.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'interactions/:customerId', component: InteractionListComponent },
  { path: 'add-interaction/:customerId', component: InteractionFormComponent }
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
