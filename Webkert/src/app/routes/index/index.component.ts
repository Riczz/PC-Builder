import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxIndexedDBService, ObjectStoreMeta} from 'ngx-indexed-db';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';

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
    // let idCount = 0;
    // let products: Product<CPU>[] = [
    //   {hardware: {id: idCount++, name: 'Intel Core i5 9400f', price: 53000, wattage: 65, cores: 6, threads: 6, socket: 'LGA 1151', memoryType: 'DDR4', frequency: 2900, architecture: 'Coffee Lake'}, rating: 4.3},
    //   {hardware: {id: idCount++, name: 'Intel Core i5-12600KF 10-Core 2.80GHz', price: 107110, wattage: 125, cores: 10, threads: 16, socket: 'LGA 1700', memoryType: 'DDR4', frequency: 2800, architecture: 'Kaby Lake'}, rating: 4.25},
    //   {hardware: {id: idCount++, name: 'Intel Core i7-10700F 8-Core 2.9GHz', price: 96640, wattage: 65, cores: 8, threads: 16, socket: 'LGA 1200', memoryType: 'DDR4', frequency: 2900, architecture: 'Comet Lake'}, rating: 4.3},
    //   {hardware: {id: idCount++, name: 'AMD Ryzen 5 5600X 6-Core 3.7GHz', price: 91960, wattage: 65, cores: 6, threads: 12, socket: 'AM4', memoryType: 'DDR4', frequency: 3700, architecture: 'Zen 3'}, rating: 4.3},
    //   {hardware: {id: idCount++, name: 'AMD Ryzen 7 5700X 8-Core 3.4 GHz', price: 129900, wattage: 65, cores: 8, threads: 16, socket: 'AM4', memoryType: 'DDR4', frequency: 3200, architecture: 'Zen 3'}, rating: 4.3},
    // ];
    // products.forEach(value => {
    //   this.afs.collection('hardwares').add(value).then(() => console.log(`${value.hardware.name} added.`));
    // });
    //
    // const builds: Build[] = [
    //   {id: 1, name: 'Test build', total_wattage: 10, total_price: 10, products: {cpu: products[0]}}
    // ];
    // builds.forEach(value => {
    //   this.afs.collection('builds').add(value).then(() => console.log(`${value.name} added.`));
    // });

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
