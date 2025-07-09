import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './models/customer.model';
import { Interaction } from './models/interaction.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://backend:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
  }

  getInteractions(customerId: string): Observable<Interaction[]> {
    return this.http.get<Interaction[]>(`${this.apiUrl}/interactions/${customerId}`);
  }

  createInteraction(interaction: Interaction): Observable<Interaction> {
    return this.http.post<Interaction>(`${this.apiUrl}/interactions`, interaction);
  }
}
