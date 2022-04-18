import {Hardware} from './Hardware';

export interface Product<T extends Hardware> {
  hardware: T;
  type : ProductType;
  image?: string;
  rating?: number;
}

export type ProductType = 'cpu' | 'cpu-cooler' | 'video-card' | 'motherboard' | 'case' | 'memory' | 'power-supply';

