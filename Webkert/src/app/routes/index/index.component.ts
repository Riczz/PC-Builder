import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxIndexedDBService, ObjectStoreMeta} from 'ngx-indexed-db';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {Product} from "../../shared/model/Product";
import {CPU} from "../../shared/model/CPU";
import {Build} from "../../shared/model/Build";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ RouteFormatPipe ]
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private dbService: NgxIndexedDBService) {
  }

  ngOnInit(): void {
  }

  route(path: string): void {
    this.router.navigateByUrl(path).catch(console.error);
  }

  initializeData(): void {
    let idCount = 0;
    let products: Product<CPU>[] = [
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i5 9400f', price: 53000, wattage: 65, cores: 6, threads: 6, socket: 'LGA 1151', memoryType: 'DDR4', frequency: 2900, architecture: 'Coffee Lake'}, rating: 4.3, image: new URL('https://p1.akcdn.net/full/551861820.intel-core-i5-9400f-6-core-2-90ghz-lga1151-box-en.jpg')},
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i5-12600KF 10-Core 2.80GHz', price: 107110, wattage: 125, cores: 10, threads: 16, socket: 'LGA 1700', memoryType: 'DDR4', frequency: 2800, architecture: 'Kaby Lake'}, rating: 4.25, image: new URL('https://p1.akcdn.net/full/884605122.intel-core-i5-12600kf-10-core-2-80ghz-lga1700-box.jpg')},
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i7-10700F 8-Core 2.9GHz', price: 96640, wattage: 65, cores: 8, threads: 16, socket: 'LGA 1200', memoryType: 'DDR4', frequency: 2900, architecture: 'Comet Lake'}, rating: 4.3, image: new URL('https://p1.akcdn.net/thumb/698155350.intel-core-i7-10700f-8-core-2-9ghz-lga1200-box-en.jpg')},
      {type: 'cpu', hardware: {id: idCount++, name: 'AMD Ryzen 5 5600X 6-Core 3.7GHz', price: 91960, wattage: 65, cores: 6, threads: 12, socket: 'AM4', memoryType: 'DDR4', frequency: 3700, architecture: 'Zen 3'}, rating: 4.3, image: new URL('https://p1.akcdn.net/full/744222552.amd-ryzen-5-5600x-6-core-3-7ghz-am4-box-with-fan-and-heatsink.jpg')},
      {type: 'cpu', hardware: {id: idCount++, name: 'AMD Ryzen 7 5700X 8-Core 3.4 GHz', price: 129900, wattage: 65, cores: 8, threads: 16, socket: 'AM4', memoryType: 'DDR4', frequency: 3200, architecture: 'Zen 3'}, rating: 4.3, image: new URL('https://p1.akcdn.net/gallery/602155692/full/1010706.amd-ryzen-7-5800x-8-core-3-8ghz-am4-box-without-fan-and-heatsink.jpg')},
    ];
    products.forEach(value => {
      this.afs.collection('products').add(value).then(() => console.log(`${value.hardware.name} added.`));
    });

    const builds: Build[] = [
      {id: 1, name: 'Test build', total_wattage: 10, total_price: 10, products: {cpu: products[0]}}
    ];
    builds.forEach(value => {
      this.afs.collection('builds').add(value).then(() => console.log(`${value.name} added.`));
    });

    this.dbService.deleteObjectStore('build');
    this.dbService.deleteObjectStore('builds');
    this.dbService.deleteObjectStore('components');

    const storeSchema: ObjectStoreMeta = {
      store: 'components',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'component', keypath: 'component', options: { unique: false } },
        { name: 'selection', keypath: 'selection', options: { unique: false } },
        { name: 'price', keypath: 'price', options: { unique: false } },
        { name: 'wattage', keypath: 'wattage', options: { unique: false } },
        { name: 'modify_time', keypath: 'modify_time', options: { unique: false } },
      ],
    };
    this.dbService.createObjectStore(storeSchema);

    this.dbService.add('components', {
      component: 'CPU',
      selection: 'Asdasdasd',
      price: 1210,
      wattage: 12313,
      modify_time: Date.now()
    }).subscribe(value => {
      console.log('ASDASDSA');
      console.log(value);
    }, error => console.error(error));
  }
}
