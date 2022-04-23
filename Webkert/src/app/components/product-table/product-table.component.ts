import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from '../../shared/model/Product';
import {Hardware} from '../../shared/model/Hardware';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MatTable} from '@angular/material/table';
import {NgxIndexedDBService} from 'ngx-indexed-db';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnChanges {

  @Input() filterType = '';
  @ViewChild(MatTable) table!: MatTable<Product<Hardware>>;

  dataSource: Product<Hardware>[] = [];
  headers: string[] = [];
  headerTitles: string[] = [];
  displayedColumns: string[] = [];

  headerMap: object = {
    name: 'Name',
    sizeFormat: 'Size format',
    architecture: 'Architecture',
    socket: 'Socket type',
    memoryType: 'Memory type',
    kit: 'Memory kit',
    frequency: 'Frequency',
    latency: 'Latency',
    cores: 'No. cores',
    threads: 'No. threads',
    passive: 'Passive',
    memory: 'Memory (GB)',
    maxMemory: 'Maximum memory (GB)',
    capacity: 'Capacity',
    motherboard_size: 'Motherboard size',
    modularity: 'Modularity'
  };

  constructor(
    private afs: AngularFirestore,
    private dbService: NgxIndexedDBService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.afs.collection<Product<Hardware>>('products').valueChanges().subscribe(values => {
      if (values.length === 0) {
        return;
      }

      this.headers = [];
      this.headerTitles = [];
      this.dataSource = values.filter(value => value.type === this.filterType);

      const keys = Object.keys(this.dataSource[0]?.hardware);

      Object.keys(this.headerMap).forEach((value) => {
        if (keys.includes(value)) {
          this.headers.push(value);
          // @ts-ignore
          this.headerTitles.push(this.headerMap[value]);
        }
      });

      this.displayedColumns = [...this.headers];
      this.displayedColumns.push('actions');

      this.table.dataSource = this.dataSource;
      this.table.renderRows();
    });
  }

  addToBuild(product: Product<Hardware>): void {
    this.dbService.add('components', {
      id: product.hardware.name,
      component: product.type,
      selection: product.hardware.name,
      price: product.hardware.price,
      wattage: product.hardware.wattage,
    }).subscribe({error: error => console.error(error)});
  }
}
