import {Hardware} from './Hardware';

export interface PSU extends Hardware {
  modularity: Modularity;
}

type Modularity = 'Non-modular' | 'Half-modular' | 'Full-modular'
