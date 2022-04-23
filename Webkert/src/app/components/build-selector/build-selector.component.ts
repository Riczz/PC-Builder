import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BuildService} from '../../shared/services/build.service';
import {AuthService} from '../../shared/services/auth.service';
import {Build} from '../../shared/model/Build';

@Component({
  selector: 'app-build-selector',
  templateUrl: './build-selector.component.html',
  styleUrls: ['./build-selector.component.css']
})
export class BuildSelectorComponent implements OnInit {

  builds: Build[] = [];

  @Output()
  selected: EventEmitter<Build> = new EventEmitter<Build>();

  constructor(private buildService: BuildService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(user => {
      this.buildService.getBuildsForUser(user?.uid as string).subscribe(collection => this.builds = collection);
    });
  }

  onSelectionChanged(build: Build): void {
    this.selected.emit(build);
  }
}
