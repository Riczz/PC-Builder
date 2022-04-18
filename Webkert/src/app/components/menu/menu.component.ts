import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(value => {
      if (value?.email) {
        this.authService.getUserByEmail(value.email).subscribe(user => {
          this.username = user.docs[0].get('username');
        });
      }
    });
  }

}
