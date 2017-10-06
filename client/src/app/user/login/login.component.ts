import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fetching: boolean;
  error: string;
  constructor(
      private userService: UserService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.loginForm = new FormGroup ({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  onLogin(data) {
    this.error = null;
    this.fetching = true;
    this.userService.login({
      email: data.email,
      password: data.password,
    }).subscribe(
        (res) => {
          this.fetching = false;
          this.router.navigate(['/todos']);
        },
        (err) => {
          this.error = err;
          this.fetching = false;
        }
    );
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
