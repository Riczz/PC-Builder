import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BuildTableDataSource, BuildTableItem} from './build-table-datasource';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {timeout} from 'rxjs';
import {ProductType} from '../../shared/model/Product';

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
}
