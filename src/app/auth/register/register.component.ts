import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Role} from '../../models/enums/Role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  passValid;
  isError = false;
  isSuccess = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.isError = false;
    this.user.role = Role.ROLE_USER;
    this.authService.register(this.user).subscribe(value => {
      console.log(value);
      this.navigateToLoginWithTimeout();
    }, error1 => {
      this.isError = true;
    });
  }

  navigateToLoginWithTimeout() {
    this.isSuccess = true;
    setTimeout(() => {
      this.router.navigate(['auth', 'login']);
    }, 2000);
  }

}
