import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
      private router: Router,
      private userService: UserService,
  ) {}

  canActivate() {
    return Observable.create((observer: Observer<boolean>) => {
      this.userService.checkSession().subscribe(
          () => {
            this.router.navigate(['/']);
            observer.next(false);
            observer.complete();
          },
          () => {
            observer.next(true);
            observer.complete();
          }
      );
    });
  }
}
