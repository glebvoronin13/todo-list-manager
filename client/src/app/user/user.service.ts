import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from '../shared/models/user';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private _userProfile: User;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient) {
  }

  get userProfile() {
    return this._userProfile;
  }

  set userProfile(user) {
    this._userProfile = user;
    this.userSource.next(user);
  }

  login({ email, password }) {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(API.session, { email, password }, { withCredentials: true })
          .subscribe(
              (data) => {
                this.userProfile = new User(data);
                observer.next(this.userProfile);
                observer.complete();
              },
              (err) => {
                try {
                  observer.error(JSON.parse(err.error).message);
                } catch (e) {
                  observer.error('Unknown server error');
                }
                observer.complete();
              }
          );
    });
  }

  logout() {
    return Observable.create((observer: Observer<any>) => {
      this.http.delete(API.session, { withCredentials: true })
          .subscribe(
              () => {
                this.userProfile = null;
                observer.next(this.userProfile);
                observer.complete();
              },
              (err) => {
                observer.next(err);
                observer.complete();
              }
          );
    });
  }

  createUser({ email, password }) {
    return Observable.create((observer: Observer<any>) => {
      this.http.post(API.register, {
        email,
        password,
      }, { withCredentials: true })
          .subscribe(
              (data) => {
                this.userProfile = new User(data);
                observer.next(this.userProfile);
                observer.complete();
              },
              (err) => {
                try {
                  observer.error(JSON.parse(err.error).message);
                } catch (e) {
                  observer.error('Unknown server error');
                }
                observer.complete();
              }
          );
    });
  }

  checkSession() {
    return Observable.create((observer: Observer<any>) => {
      if ( this.userProfile ) {
        observer.next(this.userProfile);
        observer.complete();
      } else if (this.userProfile === null ) {
        observer.error(this.userProfile);
        observer.complete();
      } else {
        this.http.get(API.session, { withCredentials: true })
            .subscribe(
                (data) => {
                  this.userProfile = new User(data);
                  observer.next(this.userProfile);
                  observer.complete();
                },
                (err) => {
                  this.userProfile = null;
                  observer.error(err);
                  observer.complete();
                }
            );
      }
    });
  }

}
