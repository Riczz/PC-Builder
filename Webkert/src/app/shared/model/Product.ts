import {Hardware} from './Hardware';

export interface Product<T extends Hardware> {
  hardware: T;
  type : ProductType;
  image?: URL;
  rating?: number;
}

export type ProductType = 'cpu' | 'cpu-cooler' | 'video-card' | 'motherboard' | 'case' | 'power-supply';

