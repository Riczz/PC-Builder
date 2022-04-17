import {Hardware} from './Hardware';

export interface RAM extends Hardware {
  capacity: number;
  frequency: number;
  type: RAMType;
  latency: RAMLatency;
  kit: RAMKit;
}

export type RAMType = 'DDR3' | 'DDR4'
type RAMLatency = 'CL10' | 'CL11' | 'CL12' | 'CL13' | 'CL14' | 'CL15' | 'CL16'
type RAMKit = 'Single channel' | 'Dual channel' | 'Triple channel' | 'Quad channel'
