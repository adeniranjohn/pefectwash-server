import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  imageurl = '../../assets/bannermed.jpg';
  constructor(private api: ApiService) { }
  theroles = ['Supervisor', 'Administrator'];
  ngOnInit(): void {


  }

  changePassword(value){
  const { phoneNumber, password, confirmPassword } = value;
  if (password === confirmPassword){
      this.api.changePassword(value)
      .subscribe(res => console.log(res));
    }else{
      console.log('Password not compatible');
    }
}

}
