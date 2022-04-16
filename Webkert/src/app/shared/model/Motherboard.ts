import {Hardware} from './Hardware';

export interface Motherboard extends Hardware {
  maxMemory: number;
  sizeFormat: MotherboardSize;
}

export type MotherboardSize = 'Mini-ITX' | 'Micro-ATX' | 'ATX' | 'E-ATX';
