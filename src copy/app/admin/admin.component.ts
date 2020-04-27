import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  imageurl = '../../assets/bannermed.jpg';
  constructor(private auth: AuthenticateService) { }

  ngOnInit(): void {
  }
  getAdmin(user){
    this.auth.signin(user);
  }


}
