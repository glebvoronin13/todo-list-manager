import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  fetching: boolean;
  error: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX),
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  onLogin(data) {
    this.fetching = true;
    this.userService.login({
      email: data.login,
      password: data.password,
    }).subscribe(
        (res) => {
          this.fetching = false;
        },
        (err) => {
          this.fetching = false;
        }
    );
  }

}
