import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(
      private userService: UserService,
      private router: Router,
  ) {}

  onLogout() {
    this.userService.logout().subscribe(
        () => {
          this.router.navigate(['/login']);
        }
    );
  }

  ngOnInit() {
    this.userService.user$.subscribe(
        (user) => {
          this.user = user;
        }
    );
  }

}
