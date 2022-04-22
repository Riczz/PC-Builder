import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BuildTableDataSource, BuildTableItem} from './build-table-datasource';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {AuthService} from '../../shared/services/auth.service';
import * as firebase from 'firebase/compat';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-build-table',
  templateUrl: './build-table.component.html',
  styleUrls: ['./build-table.component.css']
})
export class BuildTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BuildTableItem>;

  dataSource: BuildTableDataSource;
  displayedColumns = ['component', 'selection', 'price', 'wattage', 'actions'];

  @Output() routeEvent = new EventEmitter<string>();
  @Output() snackbarMessage = new EventEmitter<{ msg: string, action?: string }>();
  @Input()  allowDelete = true;
  user?: firebase.default.User | null;

  constructor(
    private dbService: NgxIndexedDBService,
    private routeFormat: RouteFormatPipe,
    private authService: AuthService,
    private afs: AngularFirestore) {
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
    console.log(buildTableItem.component);
    if (this.dataSource.removeComponent(buildTableItem.component)) {
      console.log(buildTableItem.selection as string);
      this.dbService.delete('components', buildTableItem.selection as string).subscribe(value => {
        console.log('ASDASDSADASD');
        console.log(value);
        this.refresh();
      });
    }
  }

  saveBuild(): void {
    if (!this.user) {
      this.snackbarMessage.emit({msg: 'You have to be logged in in order to save this build.', action: 'Dismiss'});
      return;
    }

    if (this.dataSource.data.filter(value => value.selection).length === 0) {
      this.snackbarMessage.emit({msg: 'You must select at least one component for the build.', action: 'Dismiss'});
    }

    this.afs.collection('builds')
    this.routeEvent.emit('/');
  }
}
