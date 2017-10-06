import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../shared/models/todo';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {
  transform(value: Todo[], args?: string): Todo[] {
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
