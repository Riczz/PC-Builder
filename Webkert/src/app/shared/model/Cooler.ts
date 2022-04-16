import {Hardware} from './Hardware';

export interface Cooler extends Hardware {
  passive: boolean;
  dimensions?: number[];
}
