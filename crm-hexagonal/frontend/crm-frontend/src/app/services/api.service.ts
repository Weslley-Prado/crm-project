import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Interaction } from '../models/interaction.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  createInteraction(interaction: Interaction): Observable<Interaction> {
    return this.http.post<Interaction>(`${this.apiUrl}/interactions`, interaction);
  }

  getInteractions(customerId: string): Observable<Interaction[]> {
    return this.http.get<Interaction[]>(`${this.apiUrl}/interactions/${customerId}`);
  }
  getAllInteractions(): Observable<Interaction[]> {
    return this.http.get<Interaction[]>(`${this.apiUrl}/interactions`);
  }
  getInteraction(id: string): Observable<Interaction> {
    return this.http.get<Interaction>(`${this.apiUrl}/interactions/id/${id}`);
  }

  updateInteraction(id: string, interaction: Interaction): Observable<Interaction> {
    return this.http.put<Interaction>(`${this.apiUrl}/interactions/${id}`, interaction);
  }

  deleteInteraction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/interactions/${id}`);
  }

  getCustomerById(id: string): Observable<Customer | null> {
  return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`);
}


}
