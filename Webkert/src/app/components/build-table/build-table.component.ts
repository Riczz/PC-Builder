import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BuildTableDataSource, BuildTableItem} from './build-table-datasource';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {timeout} from 'rxjs';

@Component({
  selector: 'app-build-table',
  templateUrl: './build-table.component.html',
  styleUrls: ['./build-table.component.css']
})
export class BuildTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BuildTableItem>;

  dataSource: BuildTableDataSource;
  displayedColumns = ['component', 'selection', 'price', 'wattage', 'actions'];

  @Output() routeEvent = new EventEmitter<string>();

  constructor(private dbService: NgxIndexedDBService, private routeFormat: RouteFormatPipe) {
    this.dataSource = new BuildTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.dataSource.connect().subscribe(value => {
      console.log('NEW VALUE');
    });

    this.dbService.getAll<BuildTableItem>('components').subscribe(value => {
      this.dataSource.data.forEach((item, index) => {
        if (item.component === value[0].component) {
          this.dataSource.data[index] = value[0];
        }
      });
      this.refresh();
    });

  }

  refresh(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addComponent(component: string): void {
    this.routeEvent.emit(this.routeFormat.transform(`/products/${component}`));
  }

  removeComponent(component: string): void {

  }
}
