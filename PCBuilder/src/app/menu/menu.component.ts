import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() user?: firebase.default.User | null;
  username = '';

  @Output()
    menuSelect = new EventEmitter<void>();

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

  onSelect() {
    this.menuSelect.emit();
  }
}
