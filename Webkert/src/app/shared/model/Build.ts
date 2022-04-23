import {Product} from './Product';
import {Hardware} from './Hardware';

export interface Build {
  id?: string;
  user?: string;
  name: string;
  products: Product<Hardware>[];
  modify_time: number;
}
