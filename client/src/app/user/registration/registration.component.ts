import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterData } from '../../shared/interfaces/i-register-data';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  fetching: boolean;
  success: boolean;
  error: string;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  constructor(private userService: UserService) { }

  ngOnInit() {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.registerForm = new FormGroup ({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      password2: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  onRegister(data: IRegisterData) {
    if ( data.password !== data.password2 ) {
      return this.error = 'Passwords does not match';
    }
    this.fetching = true;
    this.userService.createUser( { email: data.email, password: data.password } )
        .subscribe(
            (res) => {
              this.fetching = false;
              this.success = true;
              this.error = null;
            },
            (err) => {
              this.fetching = false;
              this.error = err;
            }
        );
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

}
