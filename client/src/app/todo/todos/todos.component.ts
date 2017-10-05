import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: any[];
  filter: string;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.filter = 'ALL';
    this.todos = [
      {
        id: 79387198371,
        text: 'Todo 1',
        completed: true,
      },
      {
        id: 79387198371,
        text: 'Todo 2',
        completed: false,
      },
      {
        id: 79387198371,
        text: 'Todo 3',
        completed: true,
      },
      {
        id: 79387198371,
        text: 'Todo 4',
        completed: false,
      },
      {
        id: 79387198371,
        text: 'Todo 5',
        completed: false,
      },
      {
        id: 79387198371,
        text: 'Todo 6',
        completed: true,
      },
      {
        id: 79387198371,
        text: 'Todo 7',
        completed: false,
      },
    ];
    this.todoService.getTodos().subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
    );
  }
  onSelectFilter(index) {
    switch (index) {
      case 0:
        this.filter = 'ALL';
        break;
      case 1:
        this.filter = 'DONE';
        break;
      case 2:
        this.filter = 'NOT_DONE';
        break;
      default:
        break;
    }
  }

}
