import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { API } from '../app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) { }

  getTodos() {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(API.todos, { withCredentials: true })
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

}
