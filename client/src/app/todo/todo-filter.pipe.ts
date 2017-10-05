import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.filter((item) => {
      switch ( args ) {
        case 'DONE':
          return item.completed === true;
        case 'NOT_DONE':
          return item.completed === false;
        default:
          return true;
      }
    });
  }

}
