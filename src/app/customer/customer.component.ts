import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customer: Customer;
  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {

  }

  click(customer){
    this.router.navigateByUrl(`/admin/customers/${customer._id}`)
  }
  deleteCustomer(){
    this.api.deleteCustomer(this.customer._id)
    .subscribe(response => {
        console.log(response);
    });
  }

  editCustomer(){
    this.router.navigateByUrl(`/admin/customers/${this.customer._id}`);
  }

}
