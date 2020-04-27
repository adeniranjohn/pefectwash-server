import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Customer } from '../model/customer.model';
import { AuthenticateService } from '../authenticate.service';
import { Shop } from '../model/shop.model';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})
export class AdminboardComponent implements OnInit {

  customers: Customer[];
  shop: Shop;

  constructor(private api: ApiService, private auth: AuthenticateService) {
    this.shop = this.auth.getPayLoad();
   }

  ngOnInit(): void {

  }

  signout(){
    this.auth.deleteToken();
  }

}
