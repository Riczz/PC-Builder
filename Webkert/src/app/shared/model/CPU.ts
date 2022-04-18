import {Hardware} from './Hardware';
import {RAMType} from './RAM';

export interface CPU extends Hardware {
  frequency: number;
  cores: number;
  threads: number;
  architecture: CPUArchitecture;
  memoryType: RAMType;
  socket: CPUSocket;
}

type CPUArchitecture = 'Haswell' | 'Skylake' | 'Amber Lake' | 'Kaby Lake' | 'Coffee Lake' | 'Cascade Lake' | 'Comet Lake' | 'Zen 2' | 'Zen 3' | 'Zen 4'
export type CPUSocket = 'LGA 1150' | 'LGA 1151' | 'LGA 1200' | 'LGA 2011' | 'LGA 2066' | 'LGA 1700' | 'AM2' | 'AM3' | 'AM4' | 'FM1' | 'FM2' | 'TR4';
