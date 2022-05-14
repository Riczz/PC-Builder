import {Component, OnInit} from '@angular/core';
import {Build} from '../../shared/model/Build';
import {AuthService} from '../../shared/services/auth.service';
import {BuildService} from '../../shared/services/build.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit {

  selectedBuild: Build | undefined;
  builds: Build[] = [];

  constructor(private authService: AuthService,
    private buildService: BuildService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(user => {
      this.buildService.getBuildsForUser(user?.uid as string).subscribe(collection => this.builds = collection);
    });
  }

}
