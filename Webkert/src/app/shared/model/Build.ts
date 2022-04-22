import {CPU} from './CPU';
import {GPU} from './GPU';
import {PSU} from './PSU';
import {RAM} from './RAM';
import {Case} from './Case';
import {Cooler} from './Cooler';
import {Motherboard} from './Motherboard';
import {Product} from './Product';
import {Hardware} from './Hardware';

export interface Build {
  id: number;
  name: string;
  products: Product<Hardware>[],
  total_wattage: number;
  total_price: number;
  modify_time?: Date;
}


// export interface Build {
//   id: number;
//   name: string;
//   products: {
//     cpu?: Product<CPU>;
//     gpu?: Product<GPU>;
//     psu?: Product<PSU>;
//     ram?: Product<RAM>;
//     case?: Product<Case>;
//     cooler?: Product<Cooler>;
//     motherboard?: Product<Motherboard>;
//   },
//   total_wattage: number;
//   total_price: number;
//   modify_time?: Date;
// }
