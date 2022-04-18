import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product, ProductType} from "../../shared/model/Product";
import {Hardware} from "../../shared/model/Hardware";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatTable} from "@angular/material/table";
import {BuildTableItem} from "../build-table/build-table-datasource";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnChanges {

  @Input() filterType: string = '';
  @ViewChild(MatTable) table!: MatTable<Product<Hardware>>;

  dataSource: Product<Hardware>[] = [];
  headers: string[] = [];
  headerTitles: string[] = [];

  headerMap: object = {
    name: 'Name',
    cores: 'No. cores',
    threads: 'No. threads',
    frequency: 'Frequency',
    memoryType: 'Memory type',
    socket: 'Socket type'
  };

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('CHANGE');
    this.afs.collection<Product<Hardware>>('products').valueChanges().subscribe(values => {
      if (values.length === 0) {
        return;
      }

      console.log('PRODUCTS');

      console.log(values.filter(value => value.type === this.filterType));
      this.dataSource = values.filter(value => value.type === this.filterType);
      this.headers = [];
      this.headerTitles = [];

      const keys = Object.keys(this.dataSource[0]?.hardware);
      Object.keys(this.headerMap).forEach((value) => {
        if (keys.includes(value)) {
          this.headers.push(value);
          // @ts-ignore
          this.headerTitles.push(this.headerMap[value]);
        }
        console.log(value);
      })

      this.table.dataSource = this.dataSource;

      console.log('DATAS');
      console.log(this.dataSource);
      console.log('HEADERS');
      console.log(this.headers);
      console.log('HEADER TITLES');
      console.log(this.headerTitles);
      console.log(this.table.dataSource)
      this.table.renderRows();
    });
    console.log(changes['filterType'].currentValue);
  }

}
