import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {RouteFormatPipe} from '../../shared/pipes/route-format.pipe';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private dbService: NgxIndexedDBService,
    private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  openSnackbar(message: string, action?: string): void {
    this.snackbar.open(message, action, {verticalPosition: 'bottom', duration: 5000});
  }

  route(path: string): void {
    this.router.navigateByUrl(path).catch(console.error);
  }

  initializeData(): void {
    let idCount = 0;
    const products = [
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i5 9400f', price: 53000, wattage: 65, cores: 6, threads: 6, socket: 'LGA 1151', memoryType: 'DDR4', frequency: 2900, architecture: 'Coffee Lake'}, rating: 4.3, image: 'https://p1.akcdn.net/full/551861820.intel-core-i5-9400f-6-core-2-90ghz-lga1151-box-en.jpg'},
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i5-12600KF 10-Core 2.80GHz', price: 107110, wattage: 125, cores: 10, threads: 16, socket: 'LGA 1700', memoryType: 'DDR4', frequency: 2800, architecture: 'Kaby Lake'}, rating: 4.25, image: 'https://p1.akcdn.net/full/884605122.intel-core-i5-12600kf-10-core-2-80ghz-lga1700-box.jpg'},
      {type: 'cpu', hardware: {id: idCount++, name: 'Intel Core i7-10700F 8-Core 2.9GHz', price: 96640, wattage: 65, cores: 8, threads: 16, socket: 'LGA 1200', memoryType: 'DDR4', frequency: 2900, architecture: 'Comet Lake'}, rating: 4.3, image: 'https://p1.akcdn.net/thumb/698155350.intel-core-i7-10700f-8-core-2-9ghz-lga1200-box-en.jpg'},
      {type: 'cpu', hardware: {id: idCount++, name: 'AMD Ryzen 5 5600X 6-Core 3.7GHz', price: 91960, wattage: 65, cores: 6, threads: 12, socket: 'AM4', memoryType: 'DDR4', frequency: 3700, architecture: 'Zen 3'}, rating: 4.3, image: 'https://p1.akcdn.net/full/744222552.amd-ryzen-5-5600x-6-core-3-7ghz-am4-box-with-fan-and-heatsink.jpg'},
      {type: 'cpu', hardware: {id: idCount++, name: 'AMD Ryzen 7 5700X 8-Core 3.4 GHz', price: 129900, wattage: 65, cores: 8, threads: 16, socket: 'AM4', memoryType: 'DDR4', frequency: 3200, architecture: 'Zen 3'}, rating: 4.3, image: 'https://p1.akcdn.net/gallery/602155692/full/1010706.amd-ryzen-7-5800x-8-core-3-8ghz-am4-box-without-fan-and-heatsink.jpg'},
      {type: 'cpu-cooler', hardware: {id: idCount++, name: 'be quiet! Dark Rock 4 (BK021)', price: 25040, wattage: 0, passive: false}, rating: 4.3, image: 'https://p1.akcdn.net/full/493171733.be-quiet-dark-rock-4-bk021.jpg'},
      {type: 'cpu-cooler', hardware: {id: idCount++, name: 'be quiet! DARK ROCK PRO 4 (BK022)', price: 32330, wattage: 0, passive: false}, rating: 4.3, image: 'https://p1.akcdn.net/full/493171767.be-quiet-dark-rock-pro-4-bk022.jpg'},
      {type: 'cpu-cooler', hardware: {id: idCount++, name: 'Noctua Chromax NH-D15 (FAN-NH-D15-CH)', price: 48290, wattage: 0, passive: false}, rating: 4.3, image: 'https://p1.akcdn.net/full/677448309.noctua-chromax-nh-d15-fan-nh-d15-ch.jpg'},
      {type: 'cpu-cooler', hardware: {id: idCount++, name: 'Noctua Noctua NH-U12S (FAN-NH-U12S-CH)', price: 30790, wattage: 0, passive: false}, rating: 4.3, image: 'https://p1.akcdn.net/full/699245559.noctua-noctua-nh-u12s-fan-nh-u12s-ch.jpg'},
      {type: 'cpu-cooler', hardware: {id: idCount++, name: 'be quiet! Pure Rock 2 (BK007)', price: 16280, wattage: 0, passive: false}, rating: 4.3, image: 'https://p1.akcdn.net/full/681492996.be-quiet-pure-rock-2-bk007.jpg'},
      {type: 'video-card', hardware: {id: idCount++, name: 'ASUS GeForce GTX 1660 SUPER 6GB GDDR6', price: 148599, wattage: 120, memory: 6, frequency: '1830 Mhz'}, rating: 4.3, image: 'https://p1.akcdn.net/full/624448707.asus-geforce-gtx-1660-super-oc-6gb-ddr6-dual-gtx1660s-o6g-evo.jpg'},
      {type: 'video-card', hardware: {id: idCount++, name: 'SAPPHIRE Radeon NITRO+ RX 6700 XT 12GB GDDR6', price: 312160, wattage: 260, memory: 6, frequency: '2622 Mhz'}, rating: 4.3, image: 'https://p1.akcdn.net/full/792200769.sapphire-radeon-nitro-rx-6700-xt-12gb-gddr6-11306-02-20g.jpg'},
      {type: 'video-card', hardware: {id: idCount++, name: 'ASUS GeForce RTX 3060 12GB GDDR6', price: 299990, wattage: 170, memory: 12, frequency: '1320 Mhz'}, rating: 4.3, image: 'https://p1.akcdn.net/mid/829085862.asus-geforce-rtx-3060-12gb-gddr6-v2-oc-lhr-tuf-rtx3060-o12g-v2-gaming.jpg'},
      {type: 'video-card', hardware: {id: idCount++, name: 'SAPPHIRE Radeon RX 6500 XT 4GB GDDR6', price: 97815, wattage: 130, memory: 4, frequency: '2825 Mhz'}, rating: 4.3, image: 'https://p1.akcdn.net/full/921386382.sapphire-radeon-rx-6500-xt-4gb-gddr6-11314-01-20g.jpg'},
      {type: 'video-card', hardware: {id: idCount++, name: 'ASUS Radeon RX 6600 XT 8GB OC GDDR6 128bit', price: 210000, wattage: 160, memory: 8, frequency: '2607 Mhz'}, rating: 4.3, image: 'https://p1.akcdn.net/full/848652525.asus-radeon-rx-6600-xt-8gb-oc-gddr6-128bit-dual-rx6600xt-o8g.jpg'},
      {type: 'memory', hardware: {id: idCount++, name: 'Corsair VENGEANCE 8GB DDR3 1600MHz', price: 15070, wattage: 0, capacity: 8, frequency: '1600 Mhz', memoryType: 'DDR3', latency: 'CL10', kit: 'Single channel'}, rating: 4.3, image: 'https://p1.akcdn.net/full/97522688.corsair-vengeance-8gb-ddr3-1600mhz-cmz8gx3m1a1600c10.jpg'},
      {type: 'memory', hardware: {id: idCount++, name: 'Crucial Ballistix 32GB (2x8GB) DDR4 3200MHz', price: 62870, wattage: 0, capacity: 32, frequency: '3200 Mhz', memoryType: 'DDR4', latency: 'CL14', kit: 'Dual channel'}, rating: 4.3, image: 'https://p1.akcdn.net/full/656813100.crucial-ballistix-32gb-2x16gb-ddr4-3200mhz-bl2k16g32c16u4b-r-w.jpg'},
      {type: 'memory', hardware: {id: idCount++, name: 'Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz', price: 32000, wattage: 0, capacity: 16, frequency: '3200 Mhz', memoryType: 'DDR4', latency: 'CL16', kit: 'Dual channel'}, rating: 4.3, image: 'https://p1.akcdn.net/full/837367293.kingston-fury-beast-16gb-2x8gb-ddr4-3200mhz-kf432c16bbk2-16.jpg'},
      {type: 'memory', hardware: {id: idCount++, name: 'Crucial Ballistix 16GB (2x8GB) DDR4 3200MHz', price: 25890, wattage: 0, capacity: 16, frequency: '3200 Mhz', memoryType: 'DDR4', latency: 'CL14', kit: 'Dual channel'}, rating: 4.3, image: 'https://p1.akcdn.net/full/656813100.crucial-ballistix-32gb-2x16gb-ddr4-3200mhz-bl2k16g32c16u4b-r-w.jpg'},
      {type: 'memory', hardware: {id: idCount++, name: 'G.SKILL Aegis 16GB (2x8GB) DDR4 3200MHz', price: 28990,wattage: 0, capacity: 16, frequency: '3200 Mhz', memoryType: 'DDR4', latency: 'CL16', kit: 'Dual channel'}, rating: 4.3, image: 'https://p1.akcdn.net/full/619347670.g-skill-aegis-16gb-2x8gb-ddr4-3200mhz-f4-3200c16d-16gis.jpg'},
      {type: 'motherboard', hardware: {id: idCount++, name: 'MSI MAG B460 TOMAHAWK', price: 44900,wattage: 0, maxMemory: 128, sizeFormat: 'ATX', memoryType: 'DDR4', socket: 'LGA 1200'}, rating: 4.3, image: 'https://p1.akcdn.net/mid/699236370.msi-mag-b460-tomahawk.jpg'},
      {type: 'motherboard', hardware: {id: idCount++, name: 'ASUS ROG STRIX B550-F GAMING', price: 6990,wattage: 0, maxMemory: 128, sizeFormat: 'ATX', memoryType: 'DDR4', socket: 'LGA 1200'}, rating: 4.3, image: 'https://p1.akcdn.net/full/698708712.asus-rog-strix-b550-f-gaming.jpg'},
      {type: 'motherboard', hardware: {id: idCount++, name: 'ASUS ROG STRIX B550-F GAMING WIFI II', price: 71690, wattage: 0, maxMemory: 128, sizeFormat: 'ATX', memoryType: 'DDR4', socket: 'AM4'}, rating: 4.3, image: 'https://p1.akcdn.net/full/899598951.asus-rog-strix-b550-f-gaming-wifi-ii.jpg'},
      {type: 'motherboard', hardware: {id: idCount++, name: 'ASUS TUF GAMING B560M-PLUS', price: 47163, wattage: 0, maxMemory: 128, sizeFormat: 'Micro-ATX', memoryType: 'DDR4', socket: 'LGA 1200'}, rating: 4.3, image: 'https://p1.akcdn.net/full/788769366.asus-tuf-gaming-b560m-plus.jpg'},
      {type: 'motherboard', hardware: {id: idCount++, name: 'ASUS TUF GAMING B560M-PLUS WIFI', price: 52290, wattage: 0, maxMemory: 128, sizeFormat: 'Micro-ATX', memoryType: 'DDR4', socket: 'LGA 1200'}, rating: 4.3, image: 'https://p1.akcdn.net/full/788764440.asus-tuf-gaming-b560m-plus-wifi.jpg'},
      {type: 'case', hardware: {id: idCount++, name: 'Cooler Master MasterCase H500P', price: 59645, wattage: 0, motherboard_size: 'E-ATX'}, rating: 4.3, image: 'https://p1.akcdn.net/full/472327095.cooler-master-mastercase-h500p.jpg'},
      {type: 'case', hardware: {id: idCount++, name: 'Cooler Master MasterBox MB520 RGB', price: 27080, wattage: 0, motherboard_size: 'ATX'}, rating: 4.3, image: 'https://p1.akcdn.net/full/527929401.cooler-master-masterbox-mb520-rgb-mcb-b520-kgnn-rgb.jpg'},
      {type: 'case', hardware: {id: idCount++, name: 'ASUS ROG Strix Helios (GX601)', price: 112130, wattage: 0, motherboard_size: 'E-ATX'}, rating: 4.3, image: 'https://p1.akcdn.net/full/606562920.asus-rog-strix-helios-gx601.jpg'},
      {type: 'case', hardware: {id: idCount++, name: 'be quiet! Pure Base 500DX', price: 40792, wattage: 0, motherboard_size: 'ATX'}, rating: 4.3, image: 'https://p1.akcdn.net/full/680782575.be-quiet-pure-base-500dx-bgw37-bgw38.jpg'},
      {type: 'case', hardware: {id: idCount++, name: 'Razer Tomahawk Mini-ITX RGB', price: 84290, wattage: 0, motherboard_size: 'Mini-ITX'}, rating: 4.3, image: 'https://p1.akcdn.net/full/472327095.cooler-master-mastercase-h500p.jpg'},
      {type: 'power-supply', hardware: {id: idCount++, name: 'EVGA SuperNOVA 650 GQ 650W Gold', price: 29995, wattage: 650, modularity: 'Half-modular'}, rating: 4.3, image: 'https://p1.akcdn.net/full/372905093.evga-supernova-650-gq-650w-gold-210-gq-0650.jpg'},
      {type: 'power-supply', hardware: {id: idCount++, name: 'EVGA 650 BQ 650W Bronze', price: 25990, wattage: 650, modularity: 'Half-modular'}, rating: 4.3, image: 'https://p1.akcdn.net/full/416700079.evga-650-bq-650w-bronze-110-bq-0650.jpg'},
      {type: 'power-supply', hardware: {id: idCount++, name: 'Corsair HX1200 1200W Platinum', price: 29995, wattage: 1200, modularity: 'Full-modular'}, rating: 4.3, image: 'https://p1.akcdn.net/full/434924569.corsair-hx1200-1200w-platinum-cp-9020140.jpg'},
      {type: 'power-supply', hardware: {id: idCount++, name: 'Cooler Master Elite V3 600W', price: 29995, wattage: 600, modularity: 'Non-modular'}, rating: 4.3, image: 'https://p1.akcdn.net/full/485560649.cooler-master-elite-v3-600w-mpw-6001-acabn1.jpg'},
      {type: 'power-supply', hardware: {id: idCount++, name: 'SilentiumPC Supremo FM2 750W Gold', price: 29995, wattage: 750, modularity: 'Full-modular'}, rating: 4.3, image: 'https://p1.akcdn.net/full/485560649.cooler-master-elite-v3-600w-mpw-6001-acabn1.jpg'},
    ];
    products.forEach(value => {
      this.afs.collection('products').add(value).then(() => console.log(`${value.hardware.name} added.`));
    });
  }
}
