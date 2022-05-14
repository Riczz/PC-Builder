import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {ProductType} from '../../../shared/model/Product';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {environment} from '../../../../environments/environment';

export interface BuildTableItem {
  component: string;
  selection?: string;
  price?: number;
  wattage?: number;
}

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

export class BuildTableDataSource extends DataSource<BuildTableItem> {

  public set data(value: BuildTableItem[]) {
    this._data.next(value);
  }

  public get data(): BuildTableItem[] {
    return this._data.value;
  }

  _data: BehaviorSubject<BuildTableItem[]> = new BehaviorSubject<BuildTableItem[]>(DATA);
  _dataTypes: ProductType[] = DATA_TYPES;

  constructor() {
    super();
  }

  public setItem(item: BuildTableItem): void {
    const position = DATA_TYPES.indexOf(item.component as ProductType);
    if (position === -1) {
      return;
    }

    this.data[position].selection = item.selection;
    this.data[position].price = item.price;
    this.data[position].wattage = item.wattage;
  }

  public removeItem(item: string): boolean {
    let position = -1;
    this.data.forEach((value, index) => {
      if (value.component == item) {
        position = index;
      }
    });
    if (position === -1) {
      return false;
    }

    this.data[position] = {...INITIAL_DATA[position]};
    return true;
  }

  public clear(): void {
    this.data = [...INITIAL_DATA];
  }

  connect(): Observable<BuildTableItem[]> {
    return this._data;
  }

  disconnect(): void {
  }

}
