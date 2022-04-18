import {Hardware} from './Hardware';
import {RAMType} from './RAM';
import {CPUSocket} from './CPU';

export interface Motherboard extends Hardware {
  maxMemory: number;
  sizeFormat: MotherboardSize;
  memoryType: RAMType;
  socket: CPUSocket;
}

export type MotherboardSize = 'Mini-ITX' | 'Micro-ATX' | 'ATX' | 'E-ATX';
