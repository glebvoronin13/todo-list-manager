import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Todo } from '../../shared/models/todo';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList: Todo[];
  filter: string;
  showForm: boolean;
  todoForm: FormGroup;
  constructor(
      private todoService: TodoService,
      private snackBar: MdSnackBar,
  ) { }

  ngOnInit() {
    this.todoList = null;
    this.showForm = true;
    this.todoForm = new FormGroup ({
      todo: new FormControl(''),
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
        () => {
          this.showSnackBar('Item', 'Added');
          this.showForm = false;
          setTimeout(() => {
            this.todoForm.reset();
            this.showForm = true;
          });
          this.fetchTodoList();
        },
        (err) => {
          this.showSnackBar('Item', 'Add Failed');
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
          this.showSnackBar('Items', 'Fetch Failed');
        }
    );
  }

  onChangeTodo(action) {
    this.fetchTodoList();
    switch (action) {
      case 'REMOVE':
        return this.showSnackBar('Item', 'Removed');
      case 'REMOVE_ERROR':
        return this.showSnackBar('Item', 'Remove Failed');
      case 'DONE':
        return this.showSnackBar('Item', 'Marked as Done');
      case 'NOT_DONE':
        return this.showSnackBar('Item', 'Marked as Not Done');
      case 'DONE_ERROR':
        return this.showSnackBar('Item', 'Mark as Done Failed');
      case 'NOT_DONE_ERROR':
        return this.showSnackBar('Item', 'Mark as Not Done Failed');
      case 'EDIT':
        return this.showSnackBar('Item', 'Saved');
      case 'EDIT_ERROR':
        return this.showSnackBar('Item', 'Save Failed');
      case 'EDIT_CANCEL':
        return this.showSnackBar('Item', 'Save Canceled');
      default:
        return null;
    }
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
