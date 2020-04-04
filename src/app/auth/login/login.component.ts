import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  isError = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.isError = false;
    console.log(this.user);
    this.authService.login(this.user).subscribe(value => {
      console.log(value);
      localStorage.setItem('token', value.headers.get('Authorization'));
      this.router.navigate(['home']);
    }, error1 => {
      this.isError = true;
    });
  }

}
