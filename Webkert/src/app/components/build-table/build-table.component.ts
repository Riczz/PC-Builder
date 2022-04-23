import {AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BuildTableDataSource, BuildTableItem} from './build-table-datasource';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {AuthService} from '../../shared/services/auth.service';
import * as firebase from 'firebase/compat';
import {BuildService} from '../../shared/services/build.service';
import {firstValueFrom} from 'rxjs';
import {Build} from '../../shared/model/Build';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-build-table',
  templateUrl: './build-table.component.html',
  styleUrls: ['./build-table.component.css']
})
export class BuildTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BuildTableItem>;

  buildName = '';
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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.dbService.getAll<BuildTableItem>('components').subscribe(components => {
      for (const component of components) {
        this.dataSource.setComponent(component);
      }
      this.refresh();
    });

  }

  refresh(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addNewComponent(component: string): void {
    this.routeEvent.emit(this.routeFormat.transform(`/products/${component}`));
  }

  removeComponent(buildTableItem: BuildTableItem): void {
    if (this.dataSource.removeComponent(buildTableItem.component)) {
      this.dbService.delete('components', buildTableItem.selection as string).subscribe(value => {
        this.refresh();
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

    this.openDialog().afterClosed().subscribe(async name => {
      if (!name) {
        this.snackbarMessage.emit({msg: 'You must provide a name for your build.', action: 'Dismiss'});
        return;
      }

      this.buildName = name;
      this.loading = true;

      await firstValueFrom(this.dbService.getAll('components')).then(async products => {
        const build: Build = {
          user: this.user?.uid,
          name: this.buildName,
          products: products as BuildTableItem[],
          modify_time: Date.now()
        };
        await this.buildsService.createBuild(build);
      }).finally(() => {
        this.loading = false;
        this.routeEvent.emit('/');
      });
    });
  }

  private openDialog(): MatDialogRef<SaveBuildDialog> {
    return this.saveDialog.open(SaveBuildDialog, {
      width: '250px',
      data: {name: this.buildName},
    });
  }
}

export interface BuildDialogData {
  name: string;
}

@Component({
  selector: 'save-build-dialog',
  templateUrl: 'save-build-dialog.html'
})
export class SaveBuildDialog {
  constructor(
    public dialogRef: MatDialogRef<SaveBuildDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BuildDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
