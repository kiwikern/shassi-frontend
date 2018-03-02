import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'store'
})
export class StorePipe implements PipeTransform {

  private stores: Map<string, string> = new Map([
    ['hm', 'H&M']
  ]);

  transform(value: string, args?: any): string {
    return this.stores.get(value);
  }

}
