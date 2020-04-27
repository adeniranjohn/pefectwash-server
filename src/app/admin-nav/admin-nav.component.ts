import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  isAdmin = false;
  constructor(private auth: AuthenticateService) {

   }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();

  }

}
