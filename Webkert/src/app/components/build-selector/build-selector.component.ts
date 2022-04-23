import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BuildService} from '../../shared/services/build.service';
import {AuthService} from '../../shared/services/auth.service';
import {Build} from '../../shared/model/Build';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-build-selector',
  templateUrl: './build-selector.component.html',
  styleUrls: ['./build-selector.component.css']
})
export class BuildSelectorComponent implements OnInit {

  builds: Build[] = [];
  // selected: Build | null;

  @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private buildService : BuildService,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(user => {
      this.buildService.getBuildsForUser(user?.uid as string).subscribe(collection => this.builds = collection);
    });
  }

  onSelectionChanged(buildList: MatSelectionList): void {
    console.log(buildList.selectedOptions.selected.map(item => item.value) as unknown as Build);
    this.selected.emit(buildList.selectedOptions.selected.map(item => item.value) as unknown as Build);
  }
}
