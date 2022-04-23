import {BuildTableItem} from '../../components/build-table/build-table-datasource';

export interface Build {
  id?: string;
  user?: string;
  name: string;
  products: BuildTableItem[];
  modify_time: number;
}
