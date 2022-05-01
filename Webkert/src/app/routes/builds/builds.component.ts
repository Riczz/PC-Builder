import {Component, OnInit} from '@angular/core';
import {Build} from '../../shared/model/Build';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit {

  build: Build | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
