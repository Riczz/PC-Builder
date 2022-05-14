import {Hardware} from './Hardware';

export interface GPU extends Hardware {
  memory: number;
  frequency: string;
}
