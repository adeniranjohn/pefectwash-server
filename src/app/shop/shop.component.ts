import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '../model/shop.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() shop: Shop;
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  shopSales(){

  }

  dailyWash(){

  }
  totalWash(){


  }




}
