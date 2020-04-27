import { Component, OnInit, Input } from '@angular/core';
import {Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Shop } from '../model/shop.model';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.component.html',
  styleUrls: ['./editshop.component.css']
})
export class EditshopComponent implements OnInit {
  @Input() theshop: Shop;
  id;
  totalWash;
  totalWashAmount;
  dailyWashes;
  wash;
  imageurl = '../../assets/bannermed.jpg';
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getTheShop(this.id)
    .subscribe((response: any) => {
      this.theshop = response.shop[0];
      this.totalWash = (response.washes).length;
      this.totalWashAmount = (response.washes).reduce((total, wash) => {
        return total + parseFloat(wash.amountPaid);
      },0);

    });



  }

  back() {
    this.location.back();
  }

  delete(id){
    this.api.deleteShop(id)
    .subscribe(res => res);
    this.router.navigateByUrl('/admin/seeshops');
  }

}
