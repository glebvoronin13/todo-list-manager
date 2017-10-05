import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  login({ email, password }) {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(API.login, { email, password }, { withCredentials: true })
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

  logout() {
    this.http.delete(API.login, { withCredentials: true })
        .subscribe(
            (data) => {
              console.log(data);
            },
            (err) => {
              console.log(err);
            }
        );
  }

  createUser({ email, password }) {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(API.register, {
        email,
        password,
        password2: password
      }, { withCredentials: true })
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
