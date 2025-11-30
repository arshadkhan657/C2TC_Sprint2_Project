import { Component, signal, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
   encapsulation: ViewEncapsulation.None 
})
export class App {
  protected readonly title = signal('customerservice');

  // List of all customers
  customerDetails: any[] = [];

  // Object for register/update
  customerToUpdate = {
    c_id: null as any,
    c_name: '',
    address: ''
  };

  constructor(private customerService: CustomerService) {
    this.getCustomerDetails();
  }

  // Register a new customer
  register(registerForm: NgForm) {
    this.customerService.registerCustomer(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getCustomerDetails();
      },
      (err) => console.error(err)
    );
  }

  // Get all customers
  getCustomerDetails() {
    this.customerService.getCustomers().subscribe(
      (resp: any) => {
        this.customerDetails = resp;
      },
      (err) => console.error(err)
    );
  }

  // Delete a customer
  deleteCustomer(customer: any) {
    this.customerService.deleteCustomer(customer.c_id).subscribe(
      () => this.getCustomerDetails(),
      (err) => console.error(err)
    );
  }

  // Prepare customer for update
  edit(customer: any) {
    this.customerToUpdate = { ...customer };
  }

  // Update customer
  updateCustomer() {
    this.customerService.updateCustomer(this.customerToUpdate).subscribe(
      () => this.getCustomerDetails(),
      (err) => console.error(err)
    );
  }
}
