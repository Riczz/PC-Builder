import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BuildTableDataSource, BuildTableItem} from './build-table-datasource';
import {RouteFormatPipe} from '../../../shared/pipes/route-format.pipe';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {AuthService} from '../../../shared/services/auth.service';
import * as firebase from 'firebase/compat';
import {BuildService} from '../../../shared/services/build.service';
import {firstValueFrom, fromEvent, takeUntil} from 'rxjs';
import {Build} from '../../../shared/model/Build';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatRadioButton, MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-build-table',
  templateUrl: './build-table.component.html',
  styleUrls: ['./build-table.component.scss']
})
export class BuildTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BuildTableItem>;

  dataSource: BuildTableDataSource;
  displayedColumns = ['component', 'selection', 'price', 'wattage', 'actions'];

  @Output() routeEvent = new EventEmitter<string>();
  @Output() snackbarMessage = new EventEmitter<{ msg: string, action?: string }>();
  @Input() allowDelete = true;
  user?: firebase.default.User | null;
  loading = false;

  constructor(
    private saveDialog: MatDialog,
    private routeFormat: RouteFormatPipe,
    private authService: AuthService,
    private buildsService: BuildService,
    private dbService: NgxIndexedDBService) {
    this.dataSource = new BuildTableDataSource();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated()
      .subscribe({
        next: user => this.user = user,
        error: error => console.error(error)
      });
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;

    this.dbService.getAll<BuildTableItem>('components').subscribe(components => {
      for (const component of components) {
        this.dataSource.setItem(component);
      }
    });
  }

  addNewComponent(component: string): void {
    this.routeEvent.emit(this.routeFormat.transform(`/products/${component}`));
  }

  removeComponent(buildTableItem: BuildTableItem): void {
    if (this.dataSource.removeItem(buildTableItem.component)) {
      this.dbService.delete('components', buildTableItem.selection as string).subscribe(() => {
        this.table.renderRows();
      });
    }
  }

  saveBuild() {

    if (!this.user) {
      this.snackbarMessage.emit({msg: 'You have to be logged in in order to save this build.', action: 'Dismiss'});
      return;
    }

    if (this.dataSource.data.filter(value => value.selection).length === 0) {
      this.snackbarMessage.emit({msg: 'You must select at least one component for the build.', action: 'Dismiss'});
      return;
    }

    this.openDialog().afterClosed().subscribe(async data => {
      if (!data) {
        return;
      }

      if (!data.overwrite && (!data.name || data.name.trim() === '')) {
        this.snackbarMessage.emit({msg: 'You must provide a name for your build.', action: 'Dismiss'});
        return;
      }

      if (data.overwrite && (!data.overwriteId || !data.name)) {
        this.snackbarMessage.emit({msg: 'You must select a build to overwrite.', action: 'Dismiss'});
        return;
      }

      this.loading = true;

      await firstValueFrom(this.dbService.getAll('components')).then(async products => {
        const build: Build = {
          user: this.user?.uid,
          name: data.name,
          products: products as BuildTableItem[],
          modify_time: Date.now()
        };

        if (data.overwrite && data.overwriteId) {
          build.id = data.overwriteId;
        }

        await this.buildsService.setBuild(build);
      }).finally(() => {
        this.clearTable();
        this.loading = false;
        window.location.reload();
      });
    });
  }

  private openDialog(): MatDialogRef<SaveBuildDialog> {
    return this.saveDialog.open(SaveBuildDialog, {
      width: '400px',
      data: {
        name: '',
        overwrite: false,
        overwriteId: undefined
      },
    });
  }

  async clearTable() {
    this.dbService.clear('components').subscribe(value => {
      this.dataSource.clear();
      this.table.renderRows();
    });
  }
}

export interface SaveBuildDialogData {
  name: string;
  overwrite: boolean | undefined;
  overwriteId: string | undefined;
}

@Component({
  selector: 'save-build-dialog',
  templateUrl: 'save-build-dialog.html',
  styleUrls: ['save-build-dialog.scss']
})
export class SaveBuildDialog implements OnInit {

  builds: Build[] = [];
  selectedBuild: Build | undefined;
  @ViewChild('overwriteButton') overwriteButton: MatRadioButton | undefined;

  constructor(
    private authService: AuthService,
    private buildService: BuildService,
    public dialogRef: MatDialogRef<SaveBuildDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SaveBuildDialogData) {
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(user => {
      this.buildService.getBuildsForUser(user?.uid as string).subscribe(collection => {
        this.builds = collection;
      });
    });
  }

  onSelectionChanged(build: Build) {
    this.selectedBuild = build;
    this.data.overwriteId = build.id;
    this.data.name = build.name;

    this.overwriteButton?._inputElement.nativeElement.click();
    this.changeMethod(true);
  }

  changeMethod(overwrite: boolean): void {
    this.data.overwrite = overwrite ? true : undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
