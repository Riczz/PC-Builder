import {Component} from '@angular/core';
import {Product} from '../../shared/model/Product';

// export interface Build {
//   componentName: string;
//   _title: string;
//   product: Product;
//   price: number;
// }
//
// let BUILD_DATA: Build[] = [
//   {componentName: 'CPU', _title: 'Asd', product: {hardwareId: 1, rating: 5.0}, price: 0},
// ];

@Component({
  selector: 'app-build-table',
  templateUrl: './build-table.component.html',
  styleUrls: ['./build-table.component.scss']
})
export class BuildTableComponent {
  displayedColumns: string[] = ['componentName', 'title', 'product', 'price', 'remove'];
  // dataSource = BUILD_DATA;

  deleteid(name: string): void {
    // console.log('DELETEID');
    // BUILD_DATA = BUILD_DATA.filter((value) => {
    //   return value.componentName !== name;
    // });
    // this.dataSource = BUILD_DATA;
    // console.log(BUILD_DATA);
  }
}
