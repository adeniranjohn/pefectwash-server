import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Shop } from '../model/shop.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  @Input() shops: Shop[];
  @Output() theShop: Shop;
  imageurl = '../../assets/bannermed.jpg';
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.getShops();
  }

  selectShop(shop: Shop){
    this.theShop = shop;
    console.log(this.theShop);
    this.router.navigate([`/admin/shops/${this.theShop._id}`]);
  }


  getShops(){
    this.api.getShops()
    .subscribe((res: any) => {
      this.shops = res.shops;
      console.log(this.shops);
    } );
  }
}
