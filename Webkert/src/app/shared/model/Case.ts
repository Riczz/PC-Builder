import {Hardware} from './Hardware';
import {MotherboardSize} from './Motherboard';

export interface Case extends Hardware {
  dimensions?: number[];
  motherboard_size: MotherboardSize;
}
