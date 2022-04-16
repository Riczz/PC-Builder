import {Hardware} from './Hardware';

export interface Product<T extends Hardware> {
  hardware: T;
  image?: HTMLImageElement;
  rating?: number;
}

// const products: Product<CPU>[] = [
//   {hardware: {id: 1, name: 'asd', price: 12, wattage: 13, architecture: 'Cascade Lake', socket: 'AM3'}, rating: 1.0}
// ];

//
// const asd: Build[] = [
//   {name: 'asd', id: 1, total_price: 32213, modify_time: new Date(), total_wattage: 13, products: {
//     case: {rating: 123, hardware: {  }}
//     }}
// ]
