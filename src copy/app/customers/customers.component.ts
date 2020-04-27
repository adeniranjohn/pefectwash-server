import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @Input() customers: Customer[];
  @Output() aCustomer: Customer;
  imageurl = '../../assets/bannermed.jpg';
  constructor(
     private api: ApiService,
     private router: Router,
     private auth: AuthenticateService) {

  }

  ngOnInit(): void {
    console.log(this.auth.isAdmin());
    if(this.auth.isAdmin()){
     this.getCustomers();
    }else{
    this.getShopCustomers();
    }
  }

  customerSelected(customer: Customer){
    this.aCustomer = customer;
    console.log(this.aCustomer);
    this.router.navigate([`/admin/washes/${this.aCustomer._id}`]);
  }


  getShopCustomers(){
    const { phoneNumber } = this.auth.getPayLoad();
    console.log(phoneNumber)
    this.api.getShopCustomers(phoneNumber)
    .subscribe((response: any) => {
      console.log(response);
      this.customers = response.customers;
    });
  }

  getCustomers(): boolean{
    this.api.getCustomers()
    .subscribe((response: any) => {
     // console.log(response.data);
      this.customers = response.data;
    });
    return false;
  }

}
