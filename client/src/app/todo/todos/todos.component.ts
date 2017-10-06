import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../shared/models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: Todo[];
  filter: string;
  todoForm: FormGroup;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoForm = new FormGroup ({
      todo: new FormControl('', [
        Validators.required,
      ]),
    });
    this.filter = 'ALL';
    this.fetchTodoList();
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
  onAddTodo(value) {
    const text = value.todo;
    this.todoService.addTodo(text).subscribe(
        (res) => {
          console.log(res);
          this.todoForm.reset();
          this.fetchTodoList();
        },
        (err) => {
          console.log(err);
        }
    );
  }
  fetchTodoList() {
    this.todoService.getTodos().subscribe(
        (res) => {
          this.todoList = res;
        },
        (err) => {
          this.todoList = [];
          console.log(err);
        }
    );
  }

}
