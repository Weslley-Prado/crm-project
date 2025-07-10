import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api/customers';

  constructor(private http: HttpClient) {}

  createCustomer(customer: { name: string; email: string; phone: string }): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }
}
