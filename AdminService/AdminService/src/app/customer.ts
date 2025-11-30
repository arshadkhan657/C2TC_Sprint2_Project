import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient); // standalone inject
  private API = 'http://localhost:8080/customerservice';

  // Register a new customer
  registerCustomer(customerData: any): Observable<any> {
    return this.http.post(this.API, customerData);
  }

  // Get all customers
  getCustomers(): Observable<any> {
    return this.http.get(this.API);
  }

  // Delete customer by ID
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.API}/${customerId}`);
  }

  // Update customer
  updateCustomer(customerData: any): Observable<any> {
    // Use c_id since your backend expects it
    return this.http.put(`${this.API}/${customerData.c_id}`, customerData);
  }

  // Get single customer by ID (optional, if needed in future)
  getCustomerById(customerId: number): Observable<any> {
    return this.http.get(`${this.API}/${customerId}`);
  }
}
