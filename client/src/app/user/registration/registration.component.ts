import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  fetching: boolean;
  success: boolean;
  error: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
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
