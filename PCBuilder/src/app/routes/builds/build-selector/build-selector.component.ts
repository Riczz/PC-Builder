import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Build} from '../../../shared/model/Build';

@Component({
  selector: 'app-build-selector',
  templateUrl: './build-selector.component.html',
  styleUrls: ['./build-selector.component.scss']
})
export class BuildSelectorComponent {

  @Input()
    builds: Build[] = [];

  @Output()
    selected: EventEmitter<Build> = new EventEmitter<Build>();

  onSelectionChanged(build: Build): void {
    this.selected.emit(build);
  }
}
