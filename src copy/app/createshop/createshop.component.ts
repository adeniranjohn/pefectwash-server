import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createshop',
  templateUrl: './createshop.component.html',
  styleUrls: ['./createshop.component.css']
})
export class CreateshopComponent implements OnInit {
  imageurl = '../../assets/bannermed.jpg';
  constructor(private auth: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
  }

  getNewShop(shop) {
    this.auth.createShop(shop);
  }



}
