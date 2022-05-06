import {Component} from '@angular/core';
import {Build} from '../../shared/model/Build';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent {

  build: Build | undefined;

}
