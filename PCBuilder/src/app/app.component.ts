import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {AuthService} from './shared/services/auth.service';
import * as firebase from 'firebase/compat';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService
  ) {
  }

  title = '';
  user?: firebase.default.User | null;

  ngOnInit(): void {
    this.titleService.setTitle('PC Builder');
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          if (route?.firstChild) {
            route = route.firstChild;
            console.log(route.firstChild);
          }

          if (route.snapshot.data['title']) {
            routeTitle = route?.snapshot.data['title'];
          }

          return routeTitle;
        })
      ).subscribe((title: string) => {
        if (title) {
          this.title = `${title}`;
        }
      });

    this.authService.isAuthenticated()
      .subscribe({
        next: user => {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));

          this.authService.getUserByEmail(user?.email as string).subscribe(collection => {
            this.authService.currentUsername = collection.docs[0].get('username');
          });
        },
        error: () => localStorage.setItem('user', JSON.stringify('null'))
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/').catch(console.error);
  }

  onToggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle().catch(console.error);
  }

  onCloseSidenav(sidenav: MatSidenav): void {
    sidenav.close().catch(console.error);
  }
}
