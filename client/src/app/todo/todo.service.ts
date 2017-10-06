import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { API } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../shared/models/todo';
import { ITodo } from '../shared/interfaces/i-todo';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) { }

  getTodos() {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(API.todos, { withCredentials: true })
          .subscribe(
              (res: Todo[]) => {
                const todos: Todo[] = [];
                for (const item of res) {
                  todos.push(new Todo(item));
                }
                observer.next(todos);
                observer.complete();
              },
              (err) => {
                observer.error(err);
                observer.complete();
              }
          );
    });
  }
  addTodo(text) {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(API.todos, { text }, { withCredentials: true })
          .subscribe(
              (data) => {
                observer.next(new Todo(data));
                observer.complete();
              },
              (err) => {
                observer.error(err);
                observer.complete();
              }
          );
    });
  }
  removeTodo(id) {
    return Observable.create((observer: Observer<any>) => {
      this.http.delete(`${API.todos}/${id}`, { withCredentials: true })
          .subscribe(
              (data) => {
                observer.next(data);
                observer.complete();
              },
              (err) => {
                observer.error(err);
                observer.complete();
              }
          );
    });
  }
  editTodo(id, text) {
    return this.updateTodo({ id, text });
  }
  toggleTodo(id, checked) {
    return this.updateTodo({ id, checked });
  }
  private updateTodo({ id, checked, text }: any) {
    const body: ITodo = {};
    if ( checked === false ) {
      body.completed = false;
    } else if ( checked === true ) {
      body.completed = true;
    }
    if ( text && text.length ) {
      body.text = text;
    }
    return Observable.create((observer: Observer<any>) => {
      this.http.put(`${API.todos}/${id}`, body, { withCredentials: true })
          .subscribe(
              (data) => {
                observer.next(new Todo(data));
                observer.complete();
              },
              (err) => {
                observer.error(err);
                observer.complete();
              }
          );
    });
  }

}
