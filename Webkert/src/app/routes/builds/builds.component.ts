import {Component, Input, OnInit} from '@angular/core';
import {Build} from '../../shared/model/Build';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {

  build: Build | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  setSelection($event: Build) {
    this.build = $event;
    console.log(this.build);

  }
}
