import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routeFormat'
})
export class RouteFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.toLowerCase().replace(' ','-').toLowerCase().trim();
  }

}
