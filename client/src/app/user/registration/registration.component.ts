import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  fetching: boolean;
  success: boolean;
  error: string;
  constructor() { }

  ngOnInit() {
  }
  onRegister(data) {
    this.fetching = true;
    console.log(data);
    setTimeout(() => {
      this.success = true;
      this.fetching = false;
    }, 3000);
  }

}
