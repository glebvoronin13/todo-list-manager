import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  fetching: boolean;
  success: boolean;
  error: string;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
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
  onRegister(data) {
    this.fetching = true;
    console.log(data);
    this.userService.createUser( { email: data.login, password: data.password } )
        .subscribe(
            (res) => {
              this.fetching = false;
              this.success = true;
            },
            (err) => {
              this.fetching = false;
            }
        );
  }

}
