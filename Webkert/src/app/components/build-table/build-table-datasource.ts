import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {ProductType} from '../../shared/model/Product';

// TODO: Replace this with your own data model type
export interface BuildTableItem {
  component: string;
  selection?: string;
  price?: number;
  wattage?: number;
  modify_time?: Date;
}

// TODO: replace this with real data from your application
const DATA: BuildTableItem[] = [
  {component: 'CPU'},
  {component: 'CPU Cooler'},
  {component: 'Motherboard'},
  {component: 'Memory'},
  {component: 'Video Card'},
  {component: 'Case'},
  {component: 'Power Supply'},
];

const INITIAL_DATA: BuildTableItem[] = [
  {component: 'CPU'},
  {component: 'CPU Cooler'},
  {component: 'Motherboard'},
  {component: 'Memory'},
  {component: 'Video Card'},
  {component: 'Case'},
  {component: 'Power Supply'},
];

const DATA_TYPES: ProductType[] = [
  'cpu', 'cpu-cooler', 'motherboard', 'memory', 'video-card', 'case', 'power-supply'
];

/**
 * Data source for the BuildTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BuildTableDataSource extends DataSource<BuildTableItem> {
  data: BuildTableItem[] = DATA;
  _dataTypes: ProductType[] = DATA_TYPES;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  public setComponent(component: BuildTableItem): void {
    const position = this.getComponentPosition(component.component as ProductType);
    if (position === -1) {
      return;
    }

    this.data[position].selection = component.selection;
    this.data[position].price = component.price;
    this.data[position].wattage = component.wattage;
    this.data[position].modify_time = component.modify_time;
  }

  public removeComponent(component: string): boolean {
    console.log('INITIAL DATA:');
    console.log(INITIAL_DATA);
    let position = -1;
    this.data.forEach((value, index) => {
      if (value.component == component) {
        position = index;
      }
    });
    if (position === -1) {
      return false;
    }
    console.log('POSITION:');
    console.log(position);
    console.log(component);
    console.log(this.data);

    this.data[position] = {...INITIAL_DATA[position]};
    console.log(this.data);

    return true;
  }

  private getComponentPosition(component: ProductType): number {
    if (!DATA_TYPES.includes(component)) {
      return -1;
    }

    return DATA_TYPES.indexOf(component);
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BuildTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BuildTableItem[]): BuildTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BuildTableItem[]): BuildTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
      // case 'selection': return compare(a.selection, b.selection, isAsc);
      // case 'modify_time': return compare(a.modify_time, b.modify_time, isAsc);
      default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
