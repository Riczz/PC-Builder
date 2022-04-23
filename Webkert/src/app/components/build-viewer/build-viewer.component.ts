import {Component, Input, OnInit} from '@angular/core';
import {Build} from '../../shared/model/Build';
import {Router} from '@angular/router';

@Component({
  selector: 'app-build-viewer',
  templateUrl: './build-viewer.component.html',
  styleUrls: ['./build-viewer.component.css']
})
export class BuildViewerComponent implements OnInit {

  @Input()
    build: Build | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit() {
  }

  delete() {
    this.router.navigateByUrl('/');
  }
}
