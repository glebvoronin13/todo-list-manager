import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userService: UserService;
  constructor( private router: Router,
               private injector: Injector
               ) {
    setTimeout(() => {
      this.userService = injector.get(UserService);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // success, do nothing
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if ( !this.userService.userProfile ) {
          return null;
        }
        this.userService.userProfile = null;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

}
