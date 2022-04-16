import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
  ) {}

  title = '';

  ngOnInit(): void {
    this.titleService.setTitle('PC Builder');
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          while (route?.firstChild) {
            route = route.firstChild;
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
  }
}
